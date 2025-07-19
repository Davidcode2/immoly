export default function ScenarioTextDisplay({ paidAfter, paidInYear, sumZinsen }: { paidAfter: number, paidInYear: number, sumZinsen: number }) {
  return (
    <div className="flex bg-gradient-to-tl from-sky-900/40 to-purple-800/20 p-8 gap-y-2 flex-col rounded-lg shadow shadow-purple-900">
      {paidAfter === -1 ? <div className="text-red-500 font-bold">Das wird nichts</div> :
        <div>Abgezahlt nach<br />
          <span className="text-green-500 font-bold">{paidAfter}</span> Jahren
          Im Jahr {paidInYear}
        </div>
      }
      <div>Summe Zinsen {paidAfter === -1 && "nach 120 Jahren"}
        <div className="text-amber-500 font-bold">{(Math.round(sumZinsen)).toLocaleString()}</div>
      </div>
    </div>
  );
}
