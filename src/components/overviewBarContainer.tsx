export default function OverviewBarContainer() {

  const zinsbindung = 10;
  const neuerZinssatz = 5.0;

  return (
    <div className="grid grid-cols-4 py-2 px-4 bg-[var(--ultra-accent)]/30 rounded-lg mb-4 shadow">
      <div className="">
        <div>Zinsbindung</div>
        <div className="text-sm">10 Jahre</div>
      </div>
      <div className="">
        <div>Neuer Zinssatz</div>
        <div className="text-sm">5,0 %</div>
      </div>
      <div className="">
        <div>Tilgungswechsel</div>
        <div className="text-sm">1</div>
      </div>
      <div className="">
        <div>Sondertilgungen</div>
        <div className="text-sm">2</div>
      </div>
    </div>
  );
}
