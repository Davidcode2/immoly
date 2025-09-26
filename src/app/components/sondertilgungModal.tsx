import { useEffect, useRef } from "react";

type PropTypes = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, year: number) => void;
  year: number;
  sondertilgung: number;
};

export default function SondertilgungModal({
  handleSubmit,
  year,
  sondertilgung: sondertilgung,
}: PropTypes) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.select();
    inputRef.current!.focus();
  },[]);

  return (
    <div className="sondertilgungInput z-40 mx-10 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--primary)]/50 to-[var(--primary)]/40 shadow-2xl sm:mx-0 md:w-[400px] dark:from-[var(--background)]/80 dark:to-[var(--background)]/50 dark:shadow-[0_4px_200px_var(--dark-accent)]/10">
      <div className="sondertilgungInput">
        <label
          className="sondertilgungInput flex rounded-t-lg bg-[var(--primary)]/40 px-10 py-10 text-base dark:bg-[var(--background)]/80 rounded-t-xl dark:border-b"
          htmlFor="newTilgung"
        >
          Erstellen Sie eine Sondertilgung nach{" "}
          {year <= 1 ? "einem Jahr" : year + " Jahren"}
        </label>
        <form
          onSubmit={(e) => handleSubmit(e, year)}
          className="flex flex-col justify-around"
        >
          <div className="flex justify-center pt-18 pb-8">
            <input
              ref={inputRef}
              className="sondertilgungInput w-36 border-b border-[var(--dark-accent)] bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-[var(--dark-accent)]/60 focus:outline-none md:text-2xl"
              id="sondertilgung"
              name="sondertilgungAmount"
              type="text"
              defaultValue={String(sondertilgung)}
            />
            <div className="relative top-1 -left-6 text-lg">€</div>
          </div>
          <button className="mx-auto my-10 cursor-pointer rounded-lg bg-[var(--light-accent)] p-2 px-10 text-white shadow-md transition-colors hover:bg-[var(--accent)]/90 dark:bg-[var(--dark-accent)]">
            Übernehmen
          </button>
        </form>
      </div>
    </div>
  );
}
