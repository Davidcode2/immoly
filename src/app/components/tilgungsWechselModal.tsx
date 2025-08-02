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
    <div className="tilgungsWechselModal rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-purple-600/50 to-purple-400/40 shadow-2xl md:w-[400px]">
      <div className="tilgungsWechselModal">
        <label
          className="tilgungsWechselModal flex rounded-t-lg bg-purple-400/40 text-base md:px-10 md:py-10"
          htmlFor="newTilgung"
        >
          Wählen Sie eine neue monatliche Rate nach{" "}
          {year <= 1 ? "einem Jahr" : year + " Jahren"}
        </label>
        <form
          onSubmit={(e) => handleSubmit(e, year)}
          className="flex justify-center py-18"
        >
          <input
            className="tilgungsWechselModal w-36 border-b border-purple-400 bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-slate-200 focus:outline-none md:text-2xl"
            id="newTilgung"
            name="newTilgung"
            type="text"
            defaultValue={String(tilgungswechsel)}
          />
          <div className="relative top-1 -left-6 text-lg text-purple-400">
            €
          </div>
        </form>
      </div>
    </div>
  );
}
