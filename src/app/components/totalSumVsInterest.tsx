import BarChartInterestVsTilgung from "./barChartInterestVsTilgung";

export default function TotalSumVsInterest({
  sumZinsen,
  totalSum,
  paidAfter,
  kreditSumme
}: {
  sumZinsen: number;
  totalSum: number;
  paidAfter: number;
  kreditSumme: number
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-x-2">
      {paidAfter !== -1 && (
        <div className="">
          <div className="text-xs">Summe Gesamt</div>
          <div className="font-bold text-4xl md:text-base text-[var(--light-accent)]">
            {Math.round(totalSum).toLocaleString()}
          </div>
        </div>
      )}
      <div className="">
        <div className="text-xs">
          Summe Zinsen {paidAfter === -1 && "nach 120 Jahren"}
        </div>
        <div className="font-bold text-[var(--primary)]">
          {Math.round(sumZinsen).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
