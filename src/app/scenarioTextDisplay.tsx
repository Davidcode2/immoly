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
    <div className="border border-purple-500/20 flex flex-col gap-y-2 rounded-lg bg-gradient-to-tl from-sky-900/10 to-purple-800/10 p-8 shadow shadow-purple-900 backdrop-blur-2xl">
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
