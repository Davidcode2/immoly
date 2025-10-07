import InputWithThousandsSeparator from "./inputWithThousandsSeparator";

type PropTypes = {
  handleSubmit: (updatedSondertilgung:string, year: number) => void;
  year: number;
  sondertilgung: number;
};

export default function SondertilgungModal({
  handleSubmit,
  year,
  sondertilgung: sondertilgung,
}: PropTypes) {

  const localHandleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const sondertilgungAmount = (
      form.elements.namedItem("sondertilgungAmount") as HTMLInputElement
    );
    const unformatted = sondertilgungAmount.value.replace(/\./g, "");
    handleSubmit(unformatted, year);
  }

  return (
    <div className="sondertilgungInput z-40 mx-10 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--primary)]/50 to-[var(--primary)]/40 shadow-2xl sm:mx-0 md:w-[400px] dark:from-[var(--background)]/80 dark:to-[var(--background)]/50 dark:shadow-[0_4px_200px_var(--dark-accent)]/10">
      <div className="sondertilgungInput">
        <label
          className="sondertilgungInput flex bg-[var(--primary)]/40 p-6 md:p-10 text-base dark:bg-[var(--background)]/80 rounded-t-xl dark:border-b"
          htmlFor="newTilgung"
        >
          Erstelle eine Sondertilgung nach{" "}
          {year <= 1 ? "einem Jahr" : year + " Jahren"}
        </label>
        <form
          onSubmit={localHandleSubmit}
          className="flex flex-col justify-around"
        >
          <div className="flex justify-center md:pt-18 pt-10 pb-4">
          <InputWithThousandsSeparator inputName="sondertilgungAmount" value={sondertilgung} max={9999999} maxLength={9} className="sondertilgungInput w-36 border-b border-[var(--dark-accent)] bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-[var(--dark-accent)]/60 focus:outline-none md:text-2xl"/>
            <div className="relative top-1 -left-6 text-lg">€</div>
          </div>
          <button className="mx-auto my-10 cursor-pointer rounded-full bg-[var(--light-accent)] p-2 px-10 text-white shadow-md transition-colors hover:bg-[var(--accent)]/90 dark:bg-[var(--dark-accent)]">
            Übernehmen
          </button>
        </form>
      </div>
    </div>
  );
}
