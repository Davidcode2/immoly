export default function ScenarioTextDisplay({ paidAfter, paidInYear, sumZinsen }: { paidAfter: number, paidInYear: number, sumZinsen: number }) {
  return (
    <div className="md:p-4 py-4 md:px-2 flex gap-y-2 flex-col">
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
