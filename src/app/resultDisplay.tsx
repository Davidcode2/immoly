"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import calcTilgung from "app/lib/calculateArmotizaztionTable";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import CashRoiModel from "app/lib/models/cashRoiModel";
import NoData from "app/components/noData";
import TilgungstabelleContainer from "app/components/tilgungstabelleContainer";
import FinanzierungsFormContainer from "app/components/baseDataForm/finanzierungsFormContainer";
import ChartsContainer from "app/components/charts/chartsContainer";
import MainStatsSection from "./components/mainStatsSection";
import { Sondertilgung } from "./lib/models/sondertilgung";
import { Tilgungswechsel } from "./lib/models/tilgungswechsel";
import MobileFormContainer from "./components/mobileFormContainer";
import MobileTilgungsTabelleContainer from "./components/mobileTilgungsTabelleContainer";
import {
  useBundeslandStore,
  useGrundbuchkostenPercentageStore,
  useMaklergebuehrPercentageStore,
  useNotarkostenPercentageStore,
} from "app/store";
import SloganHero from "./components/hero/sloganHero";
import { sondertilgungenAccessor } from "./services/sondertilgungAccessor";
import { tilgungswechselAccessor } from "./services/tilgungswechselAccessor";
import { calculationAccessor } from "./services/calculationsAccessor";
import { CalculationDbo } from "./lib/models/calculationDbo";
import SonderCacheHelper from "./services/cacheHelper";
import { DEFAULT_CALCULATION } from "./constants";
import { getGrundsteuer } from "./services/nebenkostenGrundsteuer";
import { debounce } from "./utils/debounce";

export default function ResultDisplay() {
  const [table, setTable] = useState<ArmotizationEntry[] | null>(null);
  const [input, setInput] = useState<CashRoiModel | null>(null);
  const [sondertilgungenCache, setSondertilgungenCache] = useState<
    Sondertilgung[]
  >([]);
  const [tilgungswechselCache, setTilgungswechselCache] = useState<
    Tilgungswechsel[]
  >([]);

  const searchParams = useSearchParams();
  const calculationId = searchParams.get("calculationId");
  const updateBundesland = useBundeslandStore((state) => state.updateValue);
  const bundeslandState = useBundeslandStore((state) => state.value);
  const grundbuchkosten = useGrundbuchkostenPercentageStore(
    (state) => state.value,
  );
  const notarkosten = useNotarkostenPercentageStore((state) => state.value);
  const principal = useRef(0);
  const workerRef = useRef<Worker>(null);

  const maklergebuehrPercentage = Number(
    useMaklergebuehrPercentageStore((state) => state.value).replace(",", "."),
  );

  const notarkostenPercentage = Number(
    useNotarkostenPercentageStore((state) => state.value).replace(",", "."),
  );
  const grundbuchkostenPercentage = Number(
    useGrundbuchkostenPercentageStore((state) => state.value).replace(",", "."),
  );

  const skipNextInputEffect = useRef(false);

  const changeHandler = async () => {
    if (!input) {
      return;
    }
    input.sondertilgungen = await sonderCacheHelper.getSondertilgungFromCache(
      calculationId!,
      sondertilgungenCache,
      true,
    );
    input.tilgungswechsel = await sonderCacheHelper.getTilgungswechselFromCache(
      calculationId!,
      tilgungswechselCache,
      true,
    );
    const tilgungungsTabelle = calcTilgung(
      input,
      calcSummeNebenkosten(input.principal),
    );
    setTable(tilgungungsTabelle);
  };

  const sonderCacheHelper = new SonderCacheHelper(
    setSondertilgungenCache,
    setTilgungswechselCache,
  );

  const calcSummeNebenkosten = (principal: number, bundesland?: string) => {
    bundesland = bundesland ? bundesland : bundeslandState;
    const absoluteMaklergebuehrFromPercentage = Math.round(
      (maklergebuehrPercentage / 100) * principal,
    );
    const absoluteNotarkostenFromPercentage = Math.round(
      (notarkostenPercentage / 100) * principal,
    );
    const absoluteGrundbuchkostenFromPercentage = Math.round(
      (grundbuchkostenPercentage / 100) * principal,
    );

    const grundsteuer = (getGrundsteuer(bundesland) * principal) / 100;
    const nebenkosten =
      absoluteMaklergebuehrFromPercentage +
      absoluteGrundbuchkostenFromPercentage +
      absoluteNotarkostenFromPercentage +
      Math.round(grundsteuer);
    return Math.round(nebenkosten);
  };

  useEffect(() => {
    setInput(DEFAULT_CALCULATION);
  }, []);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./workers/tilgungCalculation.worker.ts", import.meta.url),
    );
    workerRef.current.onmessage = (e) => {
      setTable(e.data);
    };
    return () => workerRef.current?.terminate();
  }, []);

  const postToWorker = useMemo(
    () =>
      debounce((input, nebenkosten) => {
        workerRef.current?.postMessage({ input, nebenkosten });
      }, 5),
    [],
  );

  useEffect(() => {
    async function loadData() {
      if (!input) return;
      input.sondertilgungen = await sonderCacheHelper.getSondertilgungFromCache(
        calculationId!,
        sondertilgungenCache,
      );
      input.tilgungswechsel =
        await sonderCacheHelper.getTilgungswechselFromCache(
          calculationId!,
          tilgungswechselCache,
        );

      const nebenkosten = calcSummeNebenkosten(input.principal);
      principal.current = input.principal;

      postToWorker(input, nebenkosten);
    }

    if (skipNextInputEffect.current) {
      skipNextInputEffect.current = false;
      return; // skip recalculation caused by URL change
    }
    loadData();
  }, [input]);

  useEffect(() => {
    if (!input) return;
    if (skipNextInputEffect.current) {
      skipNextInputEffect.current = false;
      return;
    }

    const worker = new Worker(
      new URL("./workers/tilgungCalculation.worker.ts", import.meta.url),
    );

    worker.onmessage = (e) => {
      setTable(e.data);
      worker.terminate();
    };

    worker.postMessage({
      input,
      nebenkosten: calcSummeNebenkosten(principal.current),
    });

    return () => worker.terminate();
  }, [maklergebuehrPercentage, bundeslandState, notarkosten, grundbuchkosten]);

  const getFromBrowserStorage = (id: string) => {
    const calculation = calculationAccessor(id);
    if (!calculation) {
      return null;
    }
    const sondertilgungen = sondertilgungenAccessor(id);
    const tilgungswechsel = tilgungswechselAccessor(id);
    calculation.sondertilgungen = sondertilgungen;
    calculation.tilgungswechsel = tilgungswechsel;
    return calculation;
  };

  useEffect(() => {
    async function loadData() {
      if (calculationId) {
        try {
          const result = getFromBrowserStorage(calculationId);
          if (!result) {
            console.warn("No result found for calculationId:", calculationId);
            return;
          }
          principal.current = result.principal;
          // TODO use nebenkosten from storage
          const nebenkosten = calcSummeNebenkosten(
            result.principal,
            result.bundesland,
          );

          // reset cache
          const sondertilgungen =
            await sonderCacheHelper.getSondertilgungFromCache(
              calculationId!,
              sondertilgungenCache,
              true,
            );
          const tilgungswechsel =
            await sonderCacheHelper.getTilgungswechselFromCache(
              calculationId!,
              tilgungswechselCache,
              true,
            );
          result.sondertilgungen = sondertilgungen;
          result.tilgungswechsel = tilgungswechsel;

          /* skip the inputEffect to prevent duplicating the calculation */
          skipNextInputEffect.current = true;
          setInput(result);

          const tilgungungsTabelle = calcTilgung(result, nebenkosten);
          setTable(tilgungungsTabelle);

          /* update bundesland last to prevent jump in maklergebuehr value
           * which would be caused by an update to the table. Downstream components would then update
           * the nebenkosten with the old principal */
          //updateMaklergebuehr((result as CalculationDbo).maklerguehrPercentage);
          if (bundeslandState !== result.bundesland) {
            updateBundesland((result as CalculationDbo).bundesland);
            skipNextInputEffect.current = true;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    loadData();
  }, [calculationId]);

  return (
    <div className="px-3 pt-2 sm:px-10 md:pb-10">
      <div
        className={`grid gap-y-6 md:gap-x-6 md:gap-y-16 lg:grid-cols-[1fr_5fr] ${table && "items-start"}`}
      >
        <div className="hidden md:block">
          <FinanzierungsFormContainer formValues={input} setInput={setInput} />
        </div>
        <div className="rounded-lg backdrop-blur-2xl md:mt-12 md:hidden md:p-8">
          <SloganHero />
        </div>
        <div className="grid gap-y-6">
          {!table ? (
            <NoData />
          ) : (
            <>
              <MainStatsSection userInput={input} table={table} />
              <div className="grid gap-6 2xl:grid-cols-[3fr_2fr]">
                <div className="hidden md:block">
                  <TilgungstabelleContainer
                    table={table}
                    calculationId={calculationId}
                    input={input}
                    sendChangeNotification={changeHandler}
                  />
                </div>
                <ChartsContainer
                  setInput={setInput}
                  input={input}
                  table={table}
                />
                <MobileTilgungsTabelleContainer
                  input={input}
                  table={table}
                  calculationId={calculationId}
                  changeHandler={changeHandler}
                />
              </div>
            </>
          )}
        </div>
        <div className="md:hidden mx-auto">
          <MobileFormContainer input={input} setInput={setInput} />
        </div>
      </div>
    </div>
  );
}
