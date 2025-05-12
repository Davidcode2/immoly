import { useEffect, useState } from "react";
import { getCalculation } from "./lib/getCalculations";
import calcTilgung from "./lib/calculateArmotizaztionTable";

export default function Scenario({ calculationId }: { calculationId: string }) {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    async function loadData() {
      if (calculationId) {
        try {
          const result = await getCalculation(calculationId);
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
  }, []);

  const sumZinsen = data ? data.reduce((acc: number, row: any) => acc + row.interest, 0) : 0;
  const paidAfter = data ? (data.length >= 120 ? -1 : data.length) : 0;
  const paidInYear = new Date().getFullYear() + paidAfter;

  return (
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
  );
}
