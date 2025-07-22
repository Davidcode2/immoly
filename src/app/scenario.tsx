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
      <div className="md:mx-0 my-16 md:mb-4 md:mt-0 border border-purple-500 backdrop-blur-2xl rounded-lg md:max-w-60 bg-blur">
        <ScenarioTextDisplay
          sumZinsen={sumZinsen}
          paidAfter={paidAfter}
          paidInYear={paidInYear}
        />
      </div>
      <div className="md:hidden my-16 border border-purple-500/70 backdrop-blur-xl rounded-lg bg-blur flex justify-center items-center p-8 flex-col">
        Why did the scarecrow win an award? 🏆 Because he was outstanding in his
        field! 🧑‍🌾😂
        <div>
          <div className="font-cursive text-xs pt-2 italic">Gemini</div>
          <div className="font-cursive text-xs"> - thinks this is funny</div>
        </div>
      </div>
    </div>
  );
}
