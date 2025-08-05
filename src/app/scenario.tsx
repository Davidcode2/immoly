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
    <div className="flex mx-auto h-48 max-w-56 md:mx-0 rounded-lg p-3 backdrop-blur-2xl md:my-0 md:max-w-none sm:h-none md:w-fit md:p-8 md:text-start md:shadow">
      <div>
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
    </div>
  );
}
