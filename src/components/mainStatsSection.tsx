import TimeUntilTilgung from "@/components/totalSumVsInterest/timeUntilTilgung";
import NebenkostenDisplay from "./nebenkosten/nebenkostenDisplay";
import KreditSummeTextComponent from "./creditSum/kreditSummeTextComponent";
import CashRoiModel from "@/lib/models/cashRoiModel";
import ArmotizationEntry from "@/lib/models/ArmotizationEntry";
import TotalSumVsInterest from "@/components/totalSumVsInterest/totalSumVsInterest";
import BarChartInterestVsTilgung from "@/components/totalSumVsInterest/barChartInterestVsTilgung";

type PropTypes = {
  userInput: CashRoiModel | null;
  table: ArmotizationEntry[];
};

export default function MainStatsSection({ userInput, table }: PropTypes) {
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
    <div className="z-20 mt-0 grid grid-cols-2 justify-stretch gap-4 md:m-0 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:h-56">
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
        table={table}
      />
      <div className="h-46 max-h-48 rounded-lg p-5 shadow md:hidden dark:shadow-[0_4px_50px_var(--dark-accent)]/20">
        <TotalSumVsInterest
          sumZinsen={sumZinsen}
          totalSum={totalSum}
          paidAfter={paidAfter}
        />
        <BarChartInterestVsTilgung
          sumZinsen={sumZinsen}
          kreditSumme={kreditSumme}
        />
      </div>
      <NebenkostenDisplay calculationData={userInput} />
    </div>
  );
}
