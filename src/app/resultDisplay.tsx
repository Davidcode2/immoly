'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCalculation } from "./lib/getCalculations";
import Tilgungstabelle from "./tilgungsTabelle";
import calcTilgung from "./lib/calculateArmotizaztionTable";
import FinanzierungsForm from "./finanzierungsForm";

export default function ResultDisplay() {
  const [data, setData] = useState<any | null>(null);
  const [input, setInput] = useState<any | null>(null);
  const [formValues, setFormValues] = useState<any | null>(null);

  const searchParams = useSearchParams();
  const calculationId = searchParams.get('calculationId');

  useEffect(() => {
    async function loadData() {
      const tilgungungsTabelle = calcTilgung(input);
      console.log(tilgungungsTabelle);
      setData(tilgungungsTabelle);
    }
    loadData();
  }, [input]);

  useEffect(() => {
    async function loadData() {
      if (calculationId) {
        try {
          const result = await getCalculation(calculationId);
          console.log(result);
          setFormValues(result);
          if (!result) {
            return;
          }
          const tilgungungsTabelle = calcTilgung(result[0]);
          console.log(tilgungungsTabelle);
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
      <div className="border border-slate-600 rounded-lg">
        <div className="rounded-lg row-start-2 overflow-auto max-h-[600px]">
          {data && <Tilgungstabelle table={data as any} />}
        </div>
      </div>
    </div>
  )

}
