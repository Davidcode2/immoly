"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCalculation } from "./lib/getCalculations";
import calcTilgung from "./lib/calculateArmotizaztionTable";
import Scenario from "./scenario";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import CalculationResult from "./lib/models/CalculationResult";
import CashRoiModel from "./lib/models/cashRoiModel";
import IconsHeader from "./components/iconsHeader";
import NoData from "./components/noData";
import TilgungstabelleContainer from "./components/tilgungstabelleContainer";
import { getSondertilgungen } from "./lib/storeSondertilgungInDb";
import { recalcForAllSondertilgungen } from "./lib/sondertilgungHandler";
import FinanzierungsFormContainer from "./components/finanzierungsFormContainer";
import ChartsContainer from "./components/chartsContainer";

export default function ResultDisplay() {
  const [table, setTable] = useState<ArmotizationEntry[] | null>(null);
  const [input, setInput] = useState<CashRoiModel | null>(null);
  const [formValues, setFormValues] = useState<CalculationResult[] | null>(
    null,
  );
  const [selectedScenario, setSelectedScenario] = useState<string | null>("18");

  const searchParams = useSearchParams();
  const calculationId = searchParams.get("calculationId");

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
    loadData();
  }, [input]);

  useEffect(() => {
    setSelectedScenario(
      calculationId ? (Number(calculationId) - 1).toString() : "19",
    );
    async function loadData() {
      console.log("Loading data for calculationId:", calculationId);
      if (calculationId) {
        try {
          const result = await getCalculation(calculationId);
          if (!result) {
            return;
          }
          setFormValues(result);
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
    <div
      className={`grid px-3 gap-y-8 pt-3 md:grid-cols-[1fr_5fr] md:gap-x-4 md:gap-y-16 ${table && "items-start"}`}
    >
      <FinanzierungsFormContainer formValues={formValues} setInput={setInput} />
      <div className="grid">
        {!table && <NoData />}
        {table && (
          <>
            <div className="grid md:grid-cols-2">
              <Scenario calculationId={selectedScenario} data={table} />
              <div className="ml-auto hidden md:block">
                <IconsHeader />
              </div>
            </div>
            <div className="grid gap-y-20 md:gap-4 xl:grid-cols-[3fr_2fr]">
              <TilgungstabelleContainer
                table={table}
                calculationId={calculationId}
                input={input}
                setTable={setTable}
              />
              <ChartsContainer input={input} table={table}/>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
