import BarChartInterestVsTilgung from "./barChartInterestVsTilgung";

export default function TotalSumVsInterest({
  sumZinsen,
  totalSum,
  paidAfter,
}: {
  sumZinsen: number;
  totalSum: number;
  paidAfter: number;
}) {
  return (
    <div className="h-42 md:h-fit">
      <div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-x-3">
          {paidAfter !== -1 && (
            <div className="">
              <div className="text-xs">Summe Gesamt</div>
              <div className="text-3xl font-bold text-[var(--light-accent)] md:text-base">
                {Math.round(totalSum).toLocaleString()}
              </div>
            </div>
          )}
          <div>
            <div className="text-xs">
              Summe Zinsen {paidAfter === -1 && "nach 120 Jahren"}
            </div>
            <div className="font-bold text-[var(--primary)]">
              {Math.round(sumZinsen).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="h-20 w-1/2 md:w-full md:mt-4">
          <BarChartInterestVsTilgung
            sumZinsen={sumZinsen}
            kreditSumme={totalSum}
            show={true}
          />
        </div>
      </div>
    </div>
  );
}
