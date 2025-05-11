'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCalculation } from "./lib/getCalculations";
import CalculationResult from "./lib/models/CalculationResult";
import Tilgungstabelle from "./tilgungsTabelle";
import calcTilgung from "./lib/calculateArmotizaztionTable";

export default function ResultDisplay() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const calculationId = searchParams.get('calculationId');

  useEffect(() => {
    async function loadData() {
      if (calculationId) {
        setLoading(true);
        try {
          const result = await getCalculation(calculationId);
          if (!result) {
            return;
          }
          const tilgungungsTabelle = calcTilgung(result[0]);
          console.log(tilgungungsTabelle);
          setData(tilgungungsTabelle);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    }

    loadData();
  }, [calculationId]);

  return (
    <div className="grid grid-rows-[20px_600px_20px] items-center justify-items-center border border-slate-600 rounded-lg">
      <div className="row-start-2 overflow-auto max-h-[600px]">
        {data && <Tilgungstabelle table={data as any} />}
      </div>
    </div>
  )

}
