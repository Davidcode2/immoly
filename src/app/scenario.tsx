import { useEffect } from "react";
import { getCalculation } from "./lib/calculationAccessor";
import ScenarioTextDisplay from "./scenarioTextDisplay";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import BarChartInterestVsTilgung from "./components/barChartInterestVsTilgung";

export default function Scenario({
  calculationId,
  data,
}: {
  calculationId: string | null;
  data: ArmotizationEntry[] | null;
}) {
  useEffect(() => {
    async function loadData() {
      if (calculationId) {
        try {
          const result = await getCalculation(calculationId);
          if (!result) {
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    loadData();
  }, [calculationId]);

  const kreditSumme = data![0].remainingPrincipal + data![0].principal;
  const sumZinsen = data
    ? data.reduce(
        (acc: number, row: ArmotizationEntry) => acc + row.interest,
        0,
      )
    : 0;
  const totalSum = kreditSumme + sumZinsen;

  const paidAfter = data ? (data.length >= 120 ? -1 : data.length) : 0;
  const paidInYear = new Date().getFullYear() + paidAfter;

  return (
    <div className="grid grid-rows-[1fr_20px] overflow-y-clip items-center justify-center justify-items-center gap-4 rounded-lg p-3 text-center backdrop-blur-2xl md:my-0 md:h-48 md:max-h-none md:items-start md:p-8 md:text-start md:shadow">
      <ScenarioTextDisplay
        sumZinsen={sumZinsen}
        totalSum={totalSum}
        paidAfter={paidAfter}
        paidInYear={paidInYear}
      />
      <BarChartInterestVsTilgung
        sumZinsen={sumZinsen}
        kreditSumme={kreditSumme}
      />
    </div>
  );
}
