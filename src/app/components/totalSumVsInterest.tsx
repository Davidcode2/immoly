export default function TotalSumVsInterest({
  sumZinsen,
  totalSum,
  paidAfter,
}: {
  sumZinsen: number;
  totalSum: number;
  paidAfter: number;
}) {
  const show = window.innerWidth >= 768;
  console.log("show in individual component : ", show) ;
  return (
    <div className="md:h-fit">
      <div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-x-3">
          {paidAfter !== -1 && (
            <div className="">
              <div className="text-xs">Summe Gesamt</div>
              <div
                className={`${totalSum >= 1000000 ? "text-2xl" : "text-3xl"} font-bold text-[var(--light-accent)] md:text-base`}
              >
                {Math.round(totalSum).toLocaleString()}
              </div>
            </div>
          )}
          <div>
            <div className="text-xs">
              Summe Zinsen {paidAfter === -1 && "nach 120 Jahren"}
            </div>
            <div className="mb-4 font-bold text-[var(--primary)] md:mb-0">
              {Math.round(sumZinsen).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
