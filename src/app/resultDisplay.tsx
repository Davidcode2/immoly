"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  useGrundbuchkostenStore,
  useMaklergebuehrStore,
  useNotarkostenStore,
} from "app/store";
import NebenkostenCalculator from "./services/nebenkostenCalculationService";
import SloganHero from "./components/hero/sloganHero";
import { sondertilgungenAccessor } from "./services/sondertilgungAccessor";
import { tilgungswechselAccessor } from "./services/tilgungswechselAccessor";
import { calculationAccessor } from "./services/calculationsAccessor";
import { CalculationDbo } from "./lib/models/calculationDbo";
import SonderCacheHelper from "./services/cacheHelper";
import { DEFAULT_CALCULATION } from "./constants";
import { getGrundsteuer } from "./services/nebenkostenGrundsteuer";

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
  //const updateNebenkosten = useNebenkostenStore((state) => state.updateValue);
  const updateMaklergebuehr = useMaklergebuehrStore(
    (state) => state.updateValue,
  );
  const updateBundesland = useBundeslandStore((state) => state.updateValue);
  //const nebenkosten = useNebenkostenStore((state) => state.value);
  const bundesland = useBundeslandStore((state) => state.value);
  const maklergebuehr = useMaklergebuehrStore((state) => state.value);
  const grundbuchkosten = useGrundbuchkostenStore((state) => state.value);
  const notarkosten = useNotarkostenStore((state) => state.value);

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
    const tilgungungsTabelle = calcTilgung(input, calcSummeNebenkosten(input.principal));
    setTable(tilgungungsTabelle);
  };

  const sonderCacheHelper = new SonderCacheHelper(
    setSondertilgungenCache,
    setTilgungswechselCache,
  );

  const calcSummeNebenkosten = (principal: number) => {
    const grundsteuer = (getGrundsteuer(bundesland) * principal) / 100;
    const nebenkosten =
      useMaklergebuehrStore.getState().value +
      useGrundbuchkostenStore.getState().value +
      useNotarkostenStore.getState().value +
      Math.round(grundsteuer);
    return Math.round(nebenkosten);
  }

  useEffect(() => {
    setInput(DEFAULT_CALCULATION);
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      async function loadData() {
        if (!input) return;
        input.sondertilgungen =
          await sonderCacheHelper.getSondertilgungFromCache(
            calculationId!,
            sondertilgungenCache,
          );
        input.tilgungswechsel =
          await sonderCacheHelper.getTilgungswechselFromCache(
            calculationId!,
            tilgungswechselCache,
          );
        const tilgungsTabelle = calcTilgung(input, calcSummeNebenkosten(input.principal));
        setTable(tilgungsTabelle);
      }

      if (skipNextInputEffect.current) {
        skipNextInputEffect.current = false;
        return; // skip recalculation caused by URL change
      }
      loadData();
    }, 100);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [input, maklergebuehr, bundesland, notarkosten, grundbuchkosten]);

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
          updateMaklergebuehr((result as CalculationDbo).maklerguehrPercentage);
          updateBundesland((result as CalculationDbo).bundesland);
          const nebenkosten = new NebenkostenCalculator(
            result.principal,
            (result as CalculationDbo).maklerguehrPercentage ?? maklergebuehr,
            (result as CalculationDbo).bundesland ?? bundesland,
          ).calcSumme();

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

          skipNextInputEffect.current = true;
          setInput(result);

          const tilgungungsTabelle = calcTilgung(result, nebenkosten);
          setTable(tilgungungsTabelle);
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
        <MobileFormContainer input={input} setInput={setInput} />
      </div>
    </div>
  );
}
