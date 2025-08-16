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
    <div className="z-40 tilgungsWechselModal rounded-xl mx-10 sm:mx-0 border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--primary)]/50 to-[var(--primary)]/40 shadow-2xl md:w-[400px]">
      <div className="tilgungsWechselModal">
        <label
          className="tilgungsWechselModal flex rounded-t-lg bg-[var(--primary)]/40 text-base px-10 py-10"
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
            className="tilgungsWechselModal w-36 border-b border-[var(--dark-accent)] bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-[var(--dark-accent)]/60 focus:outline-none md:text-2xl"
            id="newTilgung"
            name="newTilgung"
            type="text"
            defaultValue={String(tilgungswechsel)}
          />
          <div className="relative top-1 -left-6 text-lg">
            €
          </div>
        </form>
      </div>
    </div>
  );
}
