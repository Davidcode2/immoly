"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCalculation } from "./lib/getCalculations";
import Tilgungstabelle from "./tilgungsTabelle";
import calcTilgung from "./lib/calculateArmotizaztionTable";
import FinanzierungsForm from "./finanzierungsForm";
import Scenario from "./scenario";
import PlotlyChart from "./chart";
import DevelopmentChart from "./developmentChart";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import CalculationResult from "./lib/models/CalculationResult";
import CashRoiModel from "./lib/models/cashRoiModel";

export default function ResultDisplay() {
  const [data, setData] = useState<ArmotizationEntry[] | null>(null);
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

      const tilgungungsTabelle = calcTilgung(input);
      setData(tilgungungsTabelle);
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
          setData(tilgungungsTabelle);
        } catch (e) {
          console.error(e);
        }
      }
    }

    loadData();
  }, [calculationId]);

  return (
    <div className="grid grid-cols-[200px_1fr] gap-16">
      <FinanzierungsForm values={formValues} setInput={setInput} />
      <div className="grid grid-cols-[180px_1fr_1fr] border border-slate-600 rounded-lg">
        {!data && <div className="text-center text-2xl col-span-full my-auto">Gebe deine Daten ein oder wähle ein Szenario...</div>}
        {data && (
          <>
            <Scenario calculationId={selectedScenario} data={data} />
            <div className="col-start-2 rounded-lg text-sm overflow-auto max-h-[600px]">
              {data && <Tilgungstabelle table={data as ArmotizationEntry[]} />}
            </div>
            <div className="col-start-3">
              {input && (
                <>
                  <PlotlyChart data={data} rent={input.rent} />
                  <DevelopmentChart
                    data={data}
                    rent={input.rent}
                    interest={input.cash_roi}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
