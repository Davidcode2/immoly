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
  const [selectedScenario, setSelectedScenario] = useState<any | null>(18);

  const searchParams = useSearchParams();
  const calculationId = searchParams.get("calculationId");

  useEffect(() => {
    async function loadData() {
      if (!input) {
        return;
      }
      const mapped: CalculationResult = {
        id: 0,
        principal: input.principal,
        down_payment: input.down_payment,
        interest_rate: input.interest_rate,
        cash_roi: input.cash_roi,
        rent: input.rent,
        monthly_rate: input.monthly_rate,
        annual_percentage_rate: 0,
        created_at: new Date().toISOString(),
        loan_term_in_months: 0,
      };

      const tilgungungsTabelle = calcTilgung(mapped);
      setData(tilgungungsTabelle);
    }
    loadData();
  }, [input]);

  useEffect(() => {
    setSelectedScenario(calculationId ? Number(calculationId) - 1 : 19);
    async function loadData() {
      if (calculationId) {
        try {
          const result = await getCalculation(calculationId);
          setFormValues(result);
          if (!result) {
            return;
          }
          const tilgungungsTabelle = calcTilgung(result[0]);
          setData(tilgungungsTabelle);
        } catch (e) {
          console.error(e);
        }
      }
    }

    loadData();
  }, [calculationId]);

  if (!data || !formValues) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  if (!input) {
    setInput(formValues[0]);
  }

  return (
    <div className="grid grid-cols-[200px_1fr] gap-16">
      <FinanzierungsForm values={formValues} setInput={setInput} />
      <div className="grid grid-cols-[180px_1fr_1fr] border border-slate-600 rounded-lg">
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
      </div>
    </div>
  );
}
