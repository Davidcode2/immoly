'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCalculation } from "./lib/getCalculations";
import Tilgungstabelle from "./tilgungsTabelle";
import calcTilgung from "./lib/calculateArmotizaztionTable";
import FinanzierungsForm from "./finanzierungsForm";
import Scenario from "./scenario";
import PlotlyChart from './chart';
import DevelopmentChart from "./developmentChart";

export default function ResultDisplay() {
  const [data, setData] = useState<any | null>(null);
  const [input, setInput] = useState<any | null>(null);
  const [formValues, setFormValues] = useState<any | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<any | null>(18);

  const searchParams = useSearchParams();
  const calculationId = searchParams.get('calculationId');

  useEffect(() => {
    async function loadData() {
      const tilgungungsTabelle = calcTilgung(input);
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


  return (
    <div className="grid grid-cols-[200px_1fr] gap-16">
      <FinanzierungsForm values={formValues} setInput={setInput} />
      <div className="grid grid-cols-[180px_1fr_1fr] border border-slate-600 rounded-lg">
        <Scenario calculationId={selectedScenario} data={data} />
        <div className="col-start-2 rounded-lg text-sm overflow-auto max-h-[600px]">

          {data && <Tilgungstabelle table={data as any} />}
        </div>
        <div className="col-start-3">
          <PlotlyChart data={data} rent={input?.rent} />
          <DevelopmentChart data={data} rent={input?.rent} interest={input?.cashRoi} />
        </div>
      </div>
    </div>
  )

}
