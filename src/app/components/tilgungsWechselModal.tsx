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
    <div className="tilgungsWechselModal z-40 mx-10 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--primary)]/50 to-[var(--primary)]/40 shadow-2xl sm:mx-0 md:w-[400px]">
      <div className="tilgungsWechselModal">
        <label
          className="tilgungsWechselModal flex rounded-t-lg bg-[var(--primary)]/40 px-10 py-10 text-base"
          htmlFor="newTilgung"
        >
          Wählen Sie eine neue monatliche Rate nach{" "}
          {year <= 1 ? "einem Jahr" : year + " Jahren"}
        </label>
        <form
          onSubmit={(e) => handleSubmit(e, year)}
          className="flex flex-col justify-around"
        >
          <div className="flex justify-center pt-18 pb-8">
            <input
              className="tilgungsWechselModal w-36 border-b border-[var(--dark-accent)] bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-[var(--dark-accent)]/60 focus:outline-none md:text-2xl"
              id="newTilgung"
              name="newTilgung"
              type="text"
              defaultValue={String(tilgungswechsel)}
            />
            <div className="relative top-1 -left-6 text-lg">€</div>
          </div>
          <button className="mx-auto my-10 px-10 cursor-pointer rounded-lg bg-[var(--light-accent)] p-2 text-white shadow-md transition-colors hover:bg-[var(--accent)]/90">
            Übernehmen
          </button>
        </form>
      </div>
    </div>
  );
}
