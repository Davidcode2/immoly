import BarChartInterestVsTilgung from "./barChartInterestVsTilgung";

export default function TotalSumVsInterest({
  sumZinsen,
  totalSum,
  paidAfter,
  kreditSumme,
}: {
  sumZinsen: number;
  totalSum: number;
  paidAfter: number;
  kreditSumme: number;
}) {
  return (
    <div className="h-42 grow flex flex-col gap-4 md:flex-row md:gap-x-2">
      {paidAfter !== -1 && (
        <div className="">
          <div className="text-xs">Summe Gesamt</div>
          <div className="text-4xl font-bold text-[var(--light-accent)] md:text-base">
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
      <BarChartInterestVsTilgung
        sumZinsen={sumZinsen}
        kreditSumme={kreditSumme}
        show={true}
      />
    </div>
  );
}
