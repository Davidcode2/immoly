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
    <div className="flex flex-col items-center gap-x-4 gap-y-2 text-center md:items-start md:text-start">
      {paidAfter === -1 ? (
        <div className="font-bold text-red-500">Das wird nichts</div>
      ) : (
        <div>
          Abgezahlt nach
          <br />
          <span className="font-bold text-green-500">{paidAfter}</span> Jahren
          in {paidInYear}
        </div>
      )}
      <div className="flex gap-x-2">
        {paidAfter !== -1 && (
          <div className="leading-none">
            <span className="text-sm">Summe Gesamt</span>
            <div className="mt-1 font-bold text-lime-500">
              {Math.round(totalSum).toLocaleString()}
            </div>
          </div>
        )}
        <div className="leading-none">
          <span className="text-sm">
            Summe Zinsen {paidAfter === -1 && "nach 120 Jahren"}
          </span>
          <div className="font-bold mt-1 text-amber-500">
            {Math.round(sumZinsen).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
