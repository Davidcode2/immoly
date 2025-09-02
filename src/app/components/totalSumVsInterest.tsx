export default function TotalSumVsInterest({
  sumZinsen,
  totalSum,
  paidAfter,
}: {
  sumZinsen: number;
  totalSum: number;
  paidAfter: number;
}) {
  const canBePaidOfInTime = paidAfter !== -1;
  return (
    <div className="md:h-fit">
      <div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-x-3">
          {canBePaidOfInTime && (
            <div className="md:border-r md:pr-2 border-slate-200">
              <div className="text-xs">Summe Gesamt</div>
              <div
                className={`${totalSum >= 1000000 ? "text-2xl" : "text-3xl"} md:text-base`}
              >
                {Math.round(totalSum).toLocaleString("de")}
              </div>
            </div>
          )}
          <div>
            <div className="text-xs">
            { canBePaidOfInTime && "davon" } Zinsen { !canBePaidOfInTime && "nach 120 Jahren"}
            </div>
            <div className="mb-4 text-lg font-bold text-[var(--primary)] md:mb-0">
              {Math.round(sumZinsen).toLocaleString("de")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
