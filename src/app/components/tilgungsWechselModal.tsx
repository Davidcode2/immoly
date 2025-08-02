type PropTypes = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, year: number) => void;
  year: number;
  tilgungswechsel: number;
};
export default function TilgungsWechselModal({
  handleSubmit,
  year,
  tilgungswechsel,
}: PropTypes) {
  return (
    <div className="tilgungsWechselModal flex h-[300px] w-[400px] flex-col items-center gap-4 rounded-xl bg-gradient-to-tl from-purple-900/90 to-purple-950/90 p-10 shadow">
      <div className="my-auto flex flex-col gap-4">
        <label className="text-xl px-10 text-center" htmlFor="newTilgung">
          Wählen Sie eine neue monatliche Rate nach {year <= 1 ? "einem Jahr" : year + " Jahren"}
        </label>
        <form
          onSubmit={(e) => handleSubmit(e, year)}
          className="flex justify-center"
        >
          <input
            className="tilgungsWechselModal w-36 border-b border-stone-700 bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-slate-200 focus:outline-none md:text-2xl"
            id="newTilgung"
            name="newTilgung"
            type="text"
            defaultValue={String(tilgungswechsel)}
          />
          <div className="relative -left-6 top-2 text-lg text-stone-600">€</div>
        </form>
      </div>
    </div>
  );
}
