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
    <div className="my-8 flex flex-col text-center md:text-start items-center md:items-start gap-x-4 gap-y-2 rounded-lg p-3 backdrop-blur-2xl md:my-0 md:h-48 md:max-h-none md:p-8 md:shadow">
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
