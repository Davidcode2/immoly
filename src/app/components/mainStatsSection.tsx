import TimeUntilTilgung from "app/timeUntilTilgung";
import NebenkostenDisplay from "./nebenkosten/nebenkostenDisplay";
import KreditSummeTextComponent from "./kreditSummeTextComponent";
import CashRoiModel from "app/lib/models/cashRoiModel";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import TotalSumVsInterest from "./totalSumVsInterest";
import { useEffect } from "react";
import { getCalculation } from "app/lib/calculationAccessor";
import BarChartInterestVsTilgung from "./barChartInterestVsTilgung";

type PropTypes = {
  userInput: CashRoiModel | null;
  table: ArmotizationEntry[];
  calculationId: string | null;
};

export default function MainStatsSection({
  userInput,
  calculationId,
  table,
}: PropTypes) {
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

  const kreditSummeRaw =
    table && table.length
      ? table[0].remainingPrincipal + table[0].principal
      : 0;
  const kreditSumme = kreditSummeRaw < 0 ? 0 : kreditSummeRaw;
  const sumZinsen = table
    ? table.reduce(
        (acc: number, row: ArmotizationEntry) => acc + row.interest,
        0,
      )
    : 0;
  const totalSum = kreditSumme + sumZinsen;

  const paidAfter = table ? (table.length >= 120 ? -1 : table.length) : 0;
  const paidInYear = new Date().getFullYear() + paidAfter;

  return (
    <div className="top-10 z-20 mt-0 grid grid-cols-2 justify-stretch gap-4 md:m-0 md:grid-cols-2 md:gap-6 2xl:sticky 2xl:h-56 2xl:grid-cols-4">
      <KreditSummeTextComponent
        principal={Number(userInput?.principal)}
        downPayment={Number(userInput?.down_payment)}
      />
      <TimeUntilTilgung
        sumZinsen={sumZinsen}
        totalSum={totalSum}
        paidAfter={paidAfter}
        paidInYear={paidInYear}
        kreditSumme={kreditSumme}
      />
      <div className="md:hidden h-46 max-h-48 shadow rounded-lg p-5">
        <TotalSumVsInterest
          sumZinsen={sumZinsen}
          totalSum={totalSum}
          paidAfter={paidAfter}
        />
        <div className="h-20">
          <BarChartInterestVsTilgung
            sumZinsen={sumZinsen}
            kreditSumme={kreditSumme}
          />
        </div>
      </div>
      <NebenkostenDisplay calculationData={userInput} />
    </div>
  );
}
