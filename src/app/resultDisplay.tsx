"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCalculation } from "app/lib/getCalculations";
import calcTilgung from "app/lib/calculateArmotizaztionTable";
import Scenario from "app/scenario";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import CashRoiModel from "app/lib/models/cashRoiModel";
import IconsHeader from "app/components/iconsHeader";
import NoData from "app/components/noData";
import TilgungstabelleContainer from "app/components/tilgungstabelleContainer";
import { getSondertilgungen } from "app/lib/storeSondertilgungInDb";
import { recalcForAllSondertilgungen } from "app/lib/sondertilgungHandler";
import FinanzierungsFormContainer from "app/components/finanzierungsFormContainer";
import ChartsContainer from "app/components/charts/chartsContainer";
import Hero from "./components/hero";
import FinanzierungsForm from "./finanzierungsForm";

export default function ResultDisplay() {
  const [table, setTable] = useState<ArmotizationEntry[] | null>(null);
  const [input, setInput] = useState<CashRoiModel | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>("18");

  const searchParams = useSearchParams();
  const calculationId = searchParams.get("calculationId");

  useEffect(() => {
    setInput({
      monthly_rate: 1400,
      principal: 480000,
      down_payment: 70000,
      interest_rate: 3.8,
    } as CashRoiModel);
  }, []);

  useEffect(() => {
    async function loadData() {
      if (!input) {
        return;
      }

      const tilgungsTabelle = calcTilgung(input);
      const sondertilgungen = await getSondertilgungen(calculationId!);
      const tableWithSondertilgungen = await recalcForAllSondertilgungen(
        sondertilgungen,
        tilgungsTabelle,
        input,
      );
      setTable(tableWithSondertilgungen);
    }

    const debounceTimeout = setTimeout(async () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      loadData();
    }, 5);
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
        className={`grid gap-y-4 md:grid-cols-[1fr_5fr] md:gap-x-4 md:gap-y-16 ${table && "items-start"}`}
      >
        <div className="hidden md:block">
          <FinanzierungsFormContainer formValues={input} setInput={setInput} />
        </div>
        <div className="rounded-lg border border-purple-500/30 bg-gradient-to-tl from-purple-800/30 to-neutral-900/70 p-4 shadow backdrop-blur-2xl md:hidden md:p-8">
          <Hero />
        </div>
        <div className="grid h-full gap-y-4">
          {!table ? (
            <NoData />
          ) : (
            <>
              <div className="grid md:grid-cols-2">
                <Scenario calculationId={selectedScenario} data={table} />
                <div className="ml-auto hidden md:block">
                  <IconsHeader />
                </div>
              </div>
              <div className="grid gap-4 xl:grid-cols-[3fr_2fr]">
                <TilgungstabelleContainer
                  table={table}
                  calculationId={calculationId}
                  input={input}
                  setTable={setTable}
                />
                <ChartsContainer input={input} table={table} />
                <div className="md:hidden">
                  <FinanzierungsForm values={input} setInput={setInput} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
