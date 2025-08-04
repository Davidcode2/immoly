export default function ScenarioTextDisplay({
  paidAfter,
  paidInYear,
  sumZinsen,
}: {
  paidAfter: number;
  paidInYear: number;
  sumZinsen: number;
}) {
  return (
    <div className="flex flex-col text-center md:text-start items-center md:items-start gap-x-4 gap-y-2">
      {paidAfter === -1 ? (
        <div className="font-bold text-red-500">Das wird nichts</div>
      ) : (
        <div>
          Abgezahlt nach
          <br />
          <span className="font-bold text-green-500">{paidAfter}</span> Jahren
          Im Jahr {paidInYear}
        </div>
      )}
      <div>
        Summe Zinsen {paidAfter === -1 && "nach 120 Jahren"}
        <div className="font-bold text-amber-500">
          {Math.round(sumZinsen).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
