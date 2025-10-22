import { useState } from "react";
import InputWithThousandsSeparator from "../inputWithThousandsSeparator";

type PropTypes = {
  handleSubmit: (newTilgung: string, newZins: string, year: number) => void;
  year: number;
  tilgungswechsel: number;
  zinswechsel: number;
};
export default function TilgungsWechselModal({
  handleSubmit,
  year,
  tilgungswechsel,
  zinswechsel,
}: PropTypes) {
  const [selectedTab, setSelectedTab] = useState<"tilgung" | "zins">("tilgung");

  const localHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newTilgung = form.elements.namedItem(
      "newTilgung",
    ) as HTMLInputElement;
    const newZins = form.elements.namedItem("newZins") as HTMLInputElement;
    const unformattedTilgung = newTilgung.value.replace(/\./g, "");
    const unformattedZins = newZins.value;
    console.log("unformattedZins before replace:", unformattedZins);
    handleSubmit(unformattedTilgung, unformattedZins, year);
  };

  const formattedZinswechsel = zinswechsel.toFixed(2).replace(".", ",");

  return (
    <div className="tilgungsWechselModal z-40 mx-10 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--primary)]/50 to-[var(--primary)]/40 shadow-2xl sm:mx-0 md:w-[400px] dark:from-[var(--background)]/80 dark:to-[var(--background)]/50 dark:shadow-[0_4px_200px_var(--dark-accent)]/10">
      <div className="tilgungsWechselModal">
        <div className="flex justify-center dark:border-b">
          <label
            className={`tilgungsWechselModal ${selectedTab === "tilgung" ? "bg-[var(--primary)]/10" : "bg-[var(--primary)]/40 dark:bg-[var(--background)]/80"} w-full rounded-tl-xl text-base hover:bg-[var(--primary)]/20 md:p-10`}
            htmlFor="newTilgung"
            onClick={() => setSelectedTab("tilgung")}
          >
            Tilgungswechsel
          </label>
          <label
            className={`tilgungsWechselModal ${selectedTab === "zins" ? "bg-[var(--primary)]/10" : "bg-[var(--primary)]/40 dark:bg-[var(--background)]/80"} w-full rounded-tr-xl text-base hover:bg-[var(--primary)]/20 md:p-10`}
            htmlFor="newZins"
            onClick={() => setSelectedTab("zins")}
          >
            Neuer Zinssatz
          </label>
        </div>
        <div>
          <form
            onSubmit={localHandleSubmit}
            className="flex flex-col justify-around"
          >
            {selectedTab === "tilgung" ? (
              <>
                <div className="flex flex-col gap-y-5 px-4 pt-10 text-center md:px-18 md:pt-18">
                  <div className="">
                    Wähle eine neue monatliche Rate nach{" "}
                    {year <= 1 ? "einem Jahr" : year + " Jahren"}
                  </div>
                  <div className="flex justify-center">
                    <InputWithThousandsSeparator
                      value={tilgungswechsel}
                      className="tilgungsWechselModal w-36 border-b border-[var(--dark-accent)] bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-[var(--dark-accent)]/60 focus:outline-none md:text-2xl"
                      inputName="newTilgung"
                      max={50000}
                      maxLength={6}
                    />

                    <div className="relative top-1 -left-6 text-lg">€</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-y-5 px-4 pt-10 text-center md:px-18 md:pt-18">
                <div className="">
                  Wähle einen neuen Zinssatz nach{" "}
                  {year <= 1 ? "einem Jahr" : year + " Jahren"}
                </div>
                <div className="flex items-center justify-center">
                  <input
                    defaultValue={formattedZinswechsel}
                    type="text"
                    id="newZins"
                    inputMode="decimal"
                    name="newZins"
                    maxLength={5}
                    max={99.99}
                    min={0}
                    className="w-36 border-b border-[var(--dark-accent)] bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-[var(--dark-accent)]/60 focus:outline-none md:text-2xl"
                  />
                  <div className="relative right-6">%</div>
                </div>
              </div>
            )}
            <button className="mx-auto my-10 cursor-pointer rounded-full bg-[var(--light-accent)] p-2 px-10 text-white shadow-md transition-colors hover:bg-[var(--accent)]/90 dark:bg-[var(--dark-accent)]">
              Übernehmen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
