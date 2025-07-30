export default function TilgungsWechselModal() {
  return (
    <div className="tilgungsWechselModal w-[400px] h-[300px] p-10 gap-4 flex flex-col rounded-xl shadow bg-purple-500">
      <label className="text-xl" htmlFor="newTilgung">Neue Rate</label>
      <input className="rounded-lg" id="newTilgung" type="text" />
    </div>
  );
}
