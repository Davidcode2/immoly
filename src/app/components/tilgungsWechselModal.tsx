export default function TilgungsWechselModal() {
  return (
    <div className="tilgungsWechselModal flex h-[300px] w-[400px] flex-col gap-4 rounded-xl bg-purple-500 p-10 shadow">
      <label className="text-xl" htmlFor="newTilgung">
        Neue Rate
      </label>
      <input
        className="tilgungsWechselModal w-36 rounded-lg border-b border-stone-700 bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-slate-200 focus:outline-none md:text-base"
        id="newTilgung"
        type="text"
      />
    </div>
  );
}
