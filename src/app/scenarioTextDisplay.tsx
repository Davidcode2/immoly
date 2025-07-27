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
    <div className="flex md:flex-col items-center md:items-start h-24 md:max-h-none md:w-fit md:max-w-58 md:h-48 gap-x-4 gap-y-2 rounded-lg border border-purple-500/20 bg-gradient-to-tl from-sky-900/10 to-purple-800/10 p-3 md:p-8 shadow shadow-purple-900 backdrop-blur-2xl">
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
