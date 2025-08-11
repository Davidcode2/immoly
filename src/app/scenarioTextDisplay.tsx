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
        <div className="font-bold text-[var(--alert)]">Das wird nichts</div>
      ) : (
        <div className="">
          <span className="text-5xl font-bold text-[var(--primary)] md:text-base">
            {paidAfter}
          </span>
          <div className="text-xs">
            Jahre bis Volltilgung
            <br />
            in {paidInYear}
          </div>
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
