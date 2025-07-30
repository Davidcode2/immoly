type PropTypes = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, year: number) => void;
  year: number;
};
export default function TilgungsWechselModal({
  handleSubmit,
  year,
}: PropTypes) {
  return (
    <div className="tilgungsWechselModal flex h-[300px] w-[400px] flex-col gap-4 rounded-xl bg-purple-500 p-10 shadow">
      <label className="text-xl" htmlFor="newTilgung">
        Neue Rate ab {year}
      </label>

      <form
        onSubmit={(e) => handleSubmit(e, year)}
        className="justify-fit flex sm:gap-4"
      >
        <input
          className="tilgungsWechselModal w-36 rounded-lg border-b border-stone-700 bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-slate-200 focus:outline-none md:text-base"
          id="newTilgung"
          name="newTilgung"
          type="text"
        />
      </form>
    </div>
  );
}
