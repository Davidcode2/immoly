"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCalculation } from "app/lib/getCalculations";
import calcTilgung from "app/lib/calculateArmotizaztionTable";
import Scenario from "app/scenario";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import CalculationResult from "app/lib/models/CalculationResult";
import CashRoiModel from "app/lib/models/cashRoiModel";
import IconsHeader from "app/components/iconsHeader";
import NoData from "app/components/noData";
import TilgungstabelleContainer from "app/components/tilgungstabelleContainer";
import { getSondertilgungen } from "app/lib/storeSondertilgungInDb";
import { recalcForAllSondertilgungen } from "app/lib/sondertilgungHandler";
import FinanzierungsFormContainer from "app/components/finanzierungsFormContainer";
import ChartsContainer from "app/components/charts/chartsContainer";

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
    <div className="px-3 pt-3">
      <div
        className={`grid gap-y-4 md:grid-cols-[1fr_5fr] md:gap-x-4 md:gap-y-16 ${table && "items-start"}`}
      >
        <FinanzierungsFormContainer
          formValues={formValues}
          setInput={setInput}
        />
        <div>
          {!table ? (
            <NoData />
          ) : (
            <div className="grid gap-y-4">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
