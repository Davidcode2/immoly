import { useEffect, useState } from "react";
import { getCalculation } from "./lib/getCalculations";
import calcTilgung from "./lib/calculateArmotizaztionTable";
import ScenarioTextDisplay from "./scenarioTextDisplay";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";

export default function Scenario({ calculationId, data }: { calculationId: string | null, data: ArmotizationEntry[] | null }) {
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

  const sumZinsen = data ? data.reduce((acc: number, row: ArmotizationEntry) => acc + row.interest, 0) : 0;
  const paidAfter = data ? (data.length >= 120 ? -1 : data.length) : 0;
  const paidInYear = new Date().getFullYear() + paidAfter;

  return (
    <ScenarioTextDisplay sumZinsen={sumZinsen} paidAfter={paidAfter} paidInYear={paidInYear} />
  );
}
