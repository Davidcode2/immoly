import { useEffect, useState } from "react";
import { getCalculation } from "./lib/getCalculations";
import calcTilgung from "./lib/calculateArmotizaztionTable";
import ScenarioTextDisplay from "./scenarioTextDisplay";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";

export default function Scenario({
  calculationId,
  data,
}: {
  calculationId: string | null;
  data: ArmotizationEntry[] | null;
}) {
  const [_data, setData] = useState<ArmotizationEntry[] | null>(null);

  if (!data) {
    data = _data;
  }

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
  }, [calculationId]);

  const sumZinsen = data
    ? data.reduce(
        (acc: number, row: ArmotizationEntry) => acc + row.interest,
        0,
      )
    : 0;
  const paidAfter = data ? (data.length >= 120 ? -1 : data.length) : 0;
  const paidInYear = new Date().getFullYear() + paidAfter;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-lg md:mx-0 md:mt-0 md:mb-4">
        <ScenarioTextDisplay
          sumZinsen={sumZinsen}
          paidAfter={paidAfter}
          paidInYear={paidInYear}
        />
      </div>
      <div className="bg-blur my-16 flex flex-col items-center justify-center rounded-lg border border-purple-500/70 p-8 backdrop-blur-xl md:hidden">
        Why did the scarecrow win an award? 🏆 Because he was outstanding in his
        field! 🧑‍🌾😂
        <div>
          <div className="font-cursive pt-2 text-xs italic">Gemini</div>
          <div className="font-cursive text-xs"> - thinks this is funny</div>
        </div>
      </div>
    </div>
  );
}
