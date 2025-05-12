'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCalculation } from "./lib/getCalculations";
import Tilgungstabelle from "./tilgungsTabelle";
import calcTilgung from "./lib/calculateArmotizaztionTable";
import FinanzierungsForm from "./finanzierungsForm";
import Scenario from "./scenario";

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

  const sumZinsen = data ? data.reduce((acc: number, row: any) => acc + row.interest, 0) : 0;
  const paidAfter = data ? (data.length >= 120 ? -1 : data.length) : 0;
  const paidInYear = new Date().getFullYear() + paidAfter;

  return (
    <div className="grid grid-cols-[200px_1fr] gap-16">
      <FinanzierungsForm values={formValues} setInput={setInput} />
      <div className="grid grid-cols-[180px_1fr_1fr] border border-slate-600 rounded-lg">
        <div className="p-4 flex gap-y-2 flex-col">
          {paidAfter === -1 ? <div className="text-red-500 font-bold">Das wird nichts</div> :
            <div>Abgezahlt nach<br />
              <span className="text-green-500 font-bold">{paidAfter}</span> Jahren
              Im Jahr {paidInYear}
            </div>
          }
          <div>Summe Zinsen {paidAfter === -1 && "nach 120 Jahren"}
            <div className="text-amber-500 font-bold">{(Math.round(sumZinsen)).toLocaleString()}</div>
          </div>
        </div>
        <div className="col-start-2 rounded-lg text-sm overflow-auto max-h-[600px]">
          {data && <Tilgungstabelle table={data as any} />}
        </div>
        <div className="col-start-3 text-sm overflow-auto max-h-[600px]">
          <Scenario calculationId={selectedScenario} />
        </div>
      </div>
    </div>
  )

}
