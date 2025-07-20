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
    <div className="grid md:grid-cols-[200px_1fr] md:gap-16">
      <FinanzierungsForm values={formValues} setInput={setInput} />
      <div className="grid">
        {!data && (
          <div className="hidden border border-slate-600 h-full md:flex md:justify-center md:items-center text-2xl col-span-full rounded-lg">
            <div className="px-4">
              Gib deine Daten ein oder wähle ein Szenario...
            </div>
          </div>
        )}
        {data && (
          <>
            <Scenario calculationId={selectedScenario} data={data} />
            <div className="gap-4 grid xl:grid-cols-[3fr_2fr]">
              <div className="xl:col-start-1 rounded-lg text-sm overflow-auto max-h-[620px] border border-slate-600">
                {data && (
                  <Tilgungstabelle
                    table={data as ArmotizationEntry[]}
                    formInput={input}
                    setData={setData}
                    calculationId={calculationId}
                  />
                )}
              </div>
              <div className="xl:col-start-2">
                {input && (
                  <div className="grid gap-4">
                    <div className="grid justify-around border border-slate-600 rounded-lg">
                      <PlotlyChart data={data} rent={input.rent} />
                    </div>
                    <div className="grid justify-around border border-slate-600 rounded-lg">
                      <DevelopmentChart
                        data={data}
                        rent={input.rent}
                        interest={input.cash_roi || 0}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
