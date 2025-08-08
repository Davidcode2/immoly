"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCalculation } from "app/lib/calculationAccessor";
import calcTilgung from "app/lib/calculateArmotizaztionTable";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import CashRoiModel from "app/lib/models/cashRoiModel";
import NoData from "app/components/noData";
import TilgungstabelleContainer from "app/components/tilgungstabelleContainer";
import { getSondertilgungen } from "app/lib/sondertilgungDatabaseService";
import FinanzierungsFormContainer from "app/components/baseDataForm/finanzierungsFormContainer";
import ChartsContainer from "app/components/charts/chartsContainer";
import Hero from "./components/hero";
import FinanzierungsForm from "./components/baseDataForm/finanzierungsForm";
import { getTilgungsWechsel } from "./lib/tilgungswechselDatabaseService";
import MainStatsSection from "./components/mainStatsSection";

export default function ResultDisplay() {
  const [table, setTable] = useState<ArmotizationEntry[] | null>(null);
  const [input, setInput] = useState<CashRoiModel | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>("18");

  const searchParams = useSearchParams();
  const calculationId = searchParams.get("calculationId");

  const changeHandler = async () => {
    console.log("input: ", input);
    if (!input) {
      return;
    }
    input.sondertilgungen = await getSondertilgungen(calculationId!);
    input.tilgungswechsel = await getTilgungsWechsel(calculationId!);
    const tilgungungsTabelle = calcTilgung(input);
    setTable(tilgungungsTabelle);
  };

  useEffect(() => {
    setInput({
      monthly_rate: 1800,
      principal: 480000,
      down_payment: 70000,
      interest_rate: 3.8,
    } as CashRoiModel);
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      async function loadData() {
        if (!input) return;

        // store this in state
        input.sondertilgungen = await getSondertilgungen(calculationId!);
        input.tilgungswechsel = await getTilgungsWechsel(calculationId!);
        const tilgungsTabelle = calcTilgung(input);
        setTable(tilgungsTabelle);
      }

      loadData();
    }, 10);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [input]);

  useEffect(() => {
    setSelectedScenario((Number(calculationId) - 1).toString());
    async function loadData() {
      console.log("Loading data for calculationId:", calculationId);
      if (calculationId) {
        try {
          const result = await getCalculation(calculationId);
          if (!result) {
            return;
          }
          console.log(result);
          setInput(result[0]);
          const tilgungungsTabelle = calcTilgung(result[0]);
          setTable(tilgungungsTabelle);
        } catch (e) {
          console.error(e);
        }
      }
    }

    loadData();
  }, [calculationId]);

  return (
    <div className="px-3 pt-3">
      <div
        className={`grid gap-y-6 md:grid-cols-[1fr_5fr] md:gap-x-6 md:gap-y-16 ${table && "items-start"}`}
      >
        <div className="hidden md:block">
          <FinanzierungsFormContainer formValues={input} setInput={setInput} />
        </div>
        <div className="mt-12 rounded-lg p-4 backdrop-blur-2xl md:hidden md:p-8">
          <Hero />
        </div>
        <div className="grid gap-y-6">
          {!table ? (
            <NoData />
          ) : (
            <>
              <MainStatsSection
                userInput={input}
                selectedScenario={selectedScenario}
                table={table}
              />
              <div className="grid gap-6 xl:grid-cols-[3fr_2fr]">
                <div className="hidden md:block">
                  <TilgungstabelleContainer
                    table={table}
                    calculationId={calculationId}
                    input={input}
                    setTable={setTable}
                    sendChangeNotification={changeHandler}
                  />
                </div>
                <ChartsContainer input={input} table={table} />
                <div className="mx-4 my-14 md:hidden">
                  <TilgungstabelleContainer
                    table={table}
                    calculationId={calculationId}
                    input={input}
                    setTable={setTable}
                    sendChangeNotification={changeHandler}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="sticky -bottom-2 z-40 overflow-y-auto rounded-2xl border border-[var(--light-accent)]/20 bg-[var(--background)]/70 py-8 shadow backdrop-blur-lg md:hidden">
          <div className="max-h-[400px]">
            <FinanzierungsForm values={input} setInput={setInput} />
          </div>
        </div>
      </div>
    </div>
  );
}
