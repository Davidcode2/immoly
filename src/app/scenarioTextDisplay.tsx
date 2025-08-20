import TotalSumVsInterest from "./components/totalSumVsInterest";

export default function ScenarioTextDisplay({
  paidAfter,
  paidInYear,
  sumZinsen,
  totalSum,
}: {
  paidAfter: number;
  paidInYear: number;
  sumZinsen: number;
  totalSum: number;
}) {
  return (
    <div className="mb-2 flex flex-col gap-x-4 gap-y-3 md:items-start md:text-start">
      {paidAfter === -1 ? (
        <div className="text-[var(--accent)]">Das wird nichts</div>
      ) : (
        <div className="md:flex flex-col md:gap-1">
          <div className="text-xs">
            Jahre bis Volltilgung
            in {paidInYear}
          </div>
          <span className="text-8xl md:text-7xl text-[var(--primary)]">
            {paidAfter}
          </span>
        </div>
      )}
      <div className="hidden md:block">
        <TotalSumVsInterest
          paidAfter={paidAfter}
          sumZinsen={sumZinsen}
          totalSum={totalSum}
        />
      </div>
    </div>
  );
}
