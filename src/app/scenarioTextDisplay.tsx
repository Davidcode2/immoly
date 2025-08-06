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
    <div className="flex mb-2 flex-col items-center gap-x-4 gap-y-3 text-center md:items-start md:text-start">
      {paidAfter === -1 ? (
        <div className="font-bold text-red-500">Das wird nichts</div>
      ) : (
        <div>
          Abgezahlt nach
          <br />
          <span className="font-bold text-[var(--primary)]">{paidAfter}</span> Jahren
          in {paidInYear}
        </div>
      )}
      <div className="flex gap-x-2">
        {paidAfter !== -1 && (
          <div className="">
            <div className="text-sm mb-2">Summe Gesamt</div>
            <div className="font-bold text-[var(--light-accent)]">
              {Math.round(totalSum).toLocaleString()}
            </div>
          </div>
        )}
        <div className="">
          <div className="text-sm mb-2">
            Summe Zinsen {paidAfter === -1 && "nach 120 Jahren"}
          </div>
          <div className="font-bold text-[var(--primary)]">
            {Math.round(sumZinsen).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
