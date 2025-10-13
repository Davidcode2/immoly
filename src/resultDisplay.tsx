"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import calcTilgung from "@/lib/calculateArmotizaztionTable";
import ArmotizationEntry from "@/lib/models/ArmotizationEntry";
import CashRoiModel from "@/lib/models/cashRoiModel";
import NoData from "@/components/noData";
import TilgungstabelleContainer from "@/components/tilgungstabelle/tilgungstabelleContainer";
import FinanzierungsFormContainer from "@/components/baseDataForm/finanzierungsFormContainer";
import ChartsContainer from "@/components/charts/chartsContainer";
import MainStatsSection from "@/components/mainStatsSection";
import { Sondertilgung } from "@/lib/models/sondertilgung";
import { Tilgungswechsel } from "@/lib/models/tilgungswechsel";
import MobileFormContainer from "@/components/baseDataForm/mobileFormContainer";
import MobileTilgungsTabelleContainer from "@/components/tilgungstabelle/mobileTilgungsTabelleContainer";
import {
  useBundeslandStore,
  useGrundbuchkostenPercentageStore,
  useMaklergebuehrPercentageStore,
  useNebenkostenActiveStore,
  useNotarkostenPercentageStore,
} from "@/store";
import SloganHero from "@/components/hero/sloganHero";
import { sondertilgungenAccessor } from "@/services/sondertilgungAccessor";
import { tilgungswechselAccessor } from "@/services/tilgungswechselAccessor";
import { calculationAccessor } from "@/services/calculationsAccessor";
import { CalculationDbo } from "@/lib/models/calculationDbo";
import SonderCacheHelper from "@/services/cacheHelper";
import { DEFAULT_CALCULATION } from "@/constants";
import { getGrundsteuer } from "@/services/nebenkostenGrundsteuer";
import FinanzierungsFormContainerMedium from "@/components/baseDataForm/finanzierungsFormContainerMedium";
import { useCalcNebenkostenSum } from "@/hooks/useCalcNebenkostenSum";
import FinanzierungsForm from "@/components/baseDataForm/finanzierungsForm";
import useDarkThemeClassToggler from "./hooks/useDarkThemeClassToggler";
import useTilgungsCalculationWorker from "./hooks/useTilgungCalculationWorker";
import { useRecalculateTableOnNebenkostenChange } from "./hooks/useRecalculateTableOnNebenkostenChange";
import useReactToInputChange from "./hooks/useReactToInputChange";

export default function ResultDisplay() {
  const [table, setTable] = useState<ArmotizationEntry[] | null>(null);
  const [input, setInput] = useState<CashRoiModel | null>(null);
  const [sondertilgungenCache, setSondertilgungenCache] = useState<
    Sondertilgung[]
  >([]);
  const [tilgungswechselCache, setTilgungswechselCache] = useState<
    Tilgungswechsel[]
  >([]);
  const nebenkostenActive = useNebenkostenActiveStore().value;

  const searchParams = useSearchParams();
  const calculationId = searchParams.get("calculationId");
  const updateBundesland = useBundeslandStore((state) => state.updateValue);
  const bundeslandState = useBundeslandStore((state) => state.value);
  const grundbuchkosten = useGrundbuchkostenPercentageStore(
    (state) => state.value,
  );
  const notarkosten = useNotarkostenPercentageStore((state) => state.value);
  const principal = useRef(0);
  const [showForm, setShowForm] = useState(false);

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

  useDarkThemeClassToggler();

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
    if (!nebenkostenActive) {
      return 0;
    }
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

  useCalcNebenkostenSum(principal.current);

  const postToWorker = useTilgungsCalculationWorker(setTable);

  useReactToInputChange(
    input,
    calculationId,
    nebenkostenActive,
    calcSummeNebenkosten,
    principal,
    skipNextInputEffect,
    postToWorker,
    sonderCacheHelper,
    sondertilgungenCache,
    tilgungswechselCache,
  );

  useRecalculateTableOnNebenkostenChange({
    input,
    dependencies: [
      maklergebuehrPercentage,
      bundeslandState,
      notarkosten,
      grundbuchkosten,
    ],
    calcSummeNebenkosten,
    principalRef: principal,
    skipNextInputEffect,
    setTable,
  });

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
      <div className="fixed top-9 left-10 z-30">
        <FinanzierungsFormContainerMedium
          formValues={input}
          setInput={setInput}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </div>
      <div
        className={`grid gap-y-6 md:gap-x-6 md:gap-y-16 2xl:grid-cols-[1fr_5fr] ${table && "items-start"}`}
      >
        <div className="hidden 2xl:block">
          <FinanzierungsFormContainer formValues={input} setInput={setInput} />
        </div>
        <div className="rounded-lg backdrop-blur-2xl md:mt-12 md:hidden md:p-8">
          <SloganHero />
        </div>
        <div className="md:hidden">
          <FinanzierungsForm
            values={input}
            setInput={setInput}
            showButton={false}
          />
        </div>
        <div className="grid gap-y-6">
          {!table ? (
            <NoData />
          ) : (
            <>
              <MainStatsSection userInput={input} table={table} />
              <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
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
        <div className="mx-auto md:hidden">
          <MobileFormContainer input={input} setInput={setInput} />
        </div>
      </div>
    </div>
  );
}
