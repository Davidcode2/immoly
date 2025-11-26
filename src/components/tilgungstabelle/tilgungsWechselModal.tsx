import { useEffect, useRef, useState } from "react";
import InputWithThousandsSeparator from "../inputWithThousandsSeparator";

type PropTypes = {
  handleSubmit: (
    type: "zins" | "tilgung",
    newZins: string,
    year: number,
  ) => void;
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
  const zinsRef = useRef<number>(zinswechsel);

  const formattedZinswechsel = zinswechsel.toFixed(2).replace(".", ",");
  const [inputValue, setInputValue] = useState(formattedZinswechsel);

  useEffect(() => {
    setInputValue(formattedZinswechsel);
  }, [formattedZinswechsel]);

  const localHandleTilgungSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newTilgung = form.elements.namedItem(
      "newTilgung",
    ) as HTMLInputElement;
    const unformattedTilgung = newTilgung.value.replace(/\./g, "");
    handleSubmit("tilgung", unformattedTilgung, year);
  };

  const localHandleZinsSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newZins = form.elements.namedItem("newZins") as HTMLInputElement;
    const unformattedZins = newZins.value;
    handleSubmit("zins", unformattedZins, year);
  };

  const handleZinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const regex = /^(\d{1,2}(,\d{0,2})?)?$/;

    if ((regex.test(newValue) && newValue.length <= 5) || newValue === "") {
      setInputValue(newValue);
    }
  };

  return (
    <div className="tilgungsWechselModal z-40 max-sm:max-w-[340px] mx-auto md:w-[400px] rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--primary)]/50 to-[var(--primary)]/40 shadow-2xl sm:mx-0 dark:from-[var(--background)]/80 dark:to-[var(--background)]/50 dark:shadow-[0_4px_200px_var(--dark-accent)]/10">
      <div className="tilgungsWechselModal">
        <div className="flex justify-center dark:border-b">
          <label
            className={`tilgungsWechselModal ${selectedTab === "tilgung" ? "bg-[var(--primary)]/5 dark:bg-[var(--background)]" : "bg-[var(--primary)]/40 dark:bg-[var(--grey-accent)]/10"} w-full rounded-tl-xl p-4 text-base hover:bg-[var(--primary)]/20 md:p-10`}
            htmlFor="newTilgung"
            onClick={() => setSelectedTab("tilgung")}
          >
            Tilgungswechsel
          </label>
          <label
            className={`tilgungsWechselModal ${selectedTab === "zins" ? "dark:bg-[var(--background)]" : "bg-[var(--primary)]/40 dark:bg-[var(--grey-accent)]/10"} w-full rounded-tr-xl p-4 text-base hover:bg-[var(--primary)]/20 md:p-10`}
            htmlFor="newZins"
            onClick={() => setSelectedTab("zins")}
          >
            Neuer Zinssatz
          </label>
        </div>
        <div>
          {selectedTab === "tilgung" ? (
            <>
              <div className="flex flex-col px-4 pt-10 text-center md:px-18 md:pt-18">
                <form
                  onSubmit={localHandleTilgungSubmit}
                  className="flex flex-col justify-around gap-y-6"
                >
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
                  <button className="z-50 mx-auto my-10 cursor-pointer rounded-full bg-[var(--light-accent)] p-2 px-10 text-white shadow-md transition-colors hover:bg-[var(--accent)]/90 dark:bg-[var(--dark-accent)]">
                    Übernehmen
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col px-4 pt-10 text-center md:px-18 md:pt-18">
              <form
                onSubmit={localHandleZinsSubmit}
                className="flex flex-col justify-around gap-y-6"
              >
                <div className="">
                  Wähle einen neuen Zinssatz nach{" "}
                  {year <= 1 ? "einem Jahr" : year + " Jahren"}
                </div>
                <div className="flex items-center justify-center">
                  <input
                    value={inputValue}
                    type="text"
                    onChange={handleZinsChange}
                    id="newZins"
                    inputMode="decimal"
                    name="newZins"
                    placeholder={String(zinsRef.current.toFixed(2)).replace(
                      ".",
                      ",",
                    )}
                    maxLength={5}
                    max={99.99}
                    min={0}
                    className="w-36 border-b border-[var(--dark-accent)] bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-[var(--dark-accent)]/60 focus:outline-none md:text-2xl"
                  />
                  <div className="relative right-6">%</div>
                </div>
                <button className="z-50 mx-auto my-10 cursor-pointer rounded-full bg-[var(--light-accent)] p-2 px-10 text-white shadow-md transition-colors hover:bg-[var(--accent)]/90 dark:bg-[var(--dark-accent)]">
                  Übernehmen
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
