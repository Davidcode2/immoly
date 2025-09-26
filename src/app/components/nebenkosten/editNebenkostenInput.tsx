import { useEffect, useRef } from "react";
import { AbsoluteNebenkostenModel } from "./nebenkostenFrontendModel";
import {
  useGrundbuchkostenPercentageStore,
  useMaklergebuehrPercentageStore,
  useNotarkostenPercentageStore,
} from "app/store";
import { BookKey, Check, DoorOpen, ScrollText } from "lucide-react";

type PropTypes = {
  entry: AbsoluteNebenkostenModel;
  setShowEditModal: (arg1: boolean) => void;
  principal: number;
};

export default function EditNebenkostenInput({
  entry,
  setShowEditModal,
  principal,
}: PropTypes) {
  const inputRef = useRef<HTMLInputElement>(null);

  /** relative updaters **/
  const updateNotarkostenPercentageState = useNotarkostenPercentageStore(
    (state) => state.updateValue,
  );
  const updateMaklergebuehrPercentageState = useMaklergebuehrPercentageStore(
    (state) => state.updateValue,
  );
  const updateGrundbuchkostenPercentageState =
    useGrundbuchkostenPercentageStore((state) => state.updateValue);

  /** relative stores **/
  const maklergebuehrPercentage = useMaklergebuehrPercentageStore(
    (state) => state.value,
  );
  const notarkostenPercentage = useNotarkostenPercentageStore(
    (state) => state.value,
  );
  const grundbuchkostenPercentage = useGrundbuchkostenPercentageStore(
    (state) => state.value,
  );

  useEffect(() => {
    inputRef.current!.select();
    inputRef.current!.focus();
  }, []);

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (entry.name) {
      case "Notarkosten":
        updateNotarkostenPercentageState(e.target.value);
        break;
      case "Grundbuchkosten":
        updateGrundbuchkostenPercentageState(e.target.value);
        break;
      case "Maklergebühr":
        updateMaklergebuehrPercentageState(e.target.value);
        break;
      default:
        throw new Error("Unknown nebenkosten entry");
    }
  };

  const currentPercentage = () => {
    switch (entry.name) {
      case "Notarkosten":
        return notarkostenPercentage.replace(".", ",");
      case "Grundbuchkosten":
        return grundbuchkostenPercentage.replace(".", ",");
      case "Maklergebühr":
        return maklergebuehrPercentage.replace(".", ",");
      default:
        return "";
    }
  };

  const handleAbsoluteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAbs = Number(e.target.value);
    const newPercent = ((newAbs / principal) * 100)
      .toFixed(10)
      .replace(".", ",");

    switch (entry.name) {
      case "Notarkosten":
        updateNotarkostenPercentageState(newPercent);
        break;
      case "Grundbuchkosten":
        updateGrundbuchkostenPercentageState(newPercent);
        break;
      case "Maklergebühr":
        updateMaklergebuehrPercentageState(newPercent);
        break;
      default:
        throw new Error("Unknown nebenkosten entry");
    }
  };

  const absoluteValue = Math.round(
    (Number(currentPercentage().replace(",", ".")) / 100) * principal,
  );

  const getIcon = (name: string) => {
    switch (name) {
      case "Notarkosten":
        return <ScrollText size={32} />;
      case "Grundbuchkosten":
        return <BookKey size={32} />;
      case "Maklergebühr":
        return <DoorOpen size={32} />;
    }
  };

  return (
    <>
      <div className="z-40 mx-10 flex flex-col gap-y-6 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--primary)]/50 to-[var(--primary)]/40 shadow-2xl sm:mx-0 md:w-[400px] dark:from-[var(--background)]/80 dark:to-[var(--background)]/50 dark:shadow-[0_4px_200px_var(--dark-accent)]/10">
        <label
          className="flex w-full items-center gap-x-4 self-start rounded-t-xl bg-[var(--primary)]/40 p-10 text-2xl dark:border-b dark:bg-[var(--background)]/80"
          htmlFor={entry.name}
        >
          {getIcon(entry.name)} {entry.name}
        </label>
        <form onSubmit={() => setShowEditModal(false)} className="px-10">
          <div className="flex items-center">
            <input
              id={entry.name}
              type="text"
              inputMode="numeric"
              maxLength={6}
              max={999999}
              min={0}
              ref={inputRef}
              onChange={handleAbsoluteChange}
              name={entry.name}
              value={Math.round(absoluteValue) || ""}
              className="w-36 border-b border-[var(--dark-accent)] bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-[var(--dark-accent)]/60 focus:outline-none md:text-2xl"
            />
            <div className="relative right-7">€</div>
          </div>
        </form>
        <>
          <form onSubmit={() => setShowEditModal(false)} className="px-10">
            <div className="flex items-center">
              <input
                value={currentPercentage().substring(0,5)}
                type="text"
                inputMode="numeric"
                maxLength={5}
                max={99.99}
                min={0}
                className="w-36 border-b border-[var(--dark-accent)] bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-[var(--dark-accent)]/60 focus:outline-none md:text-2xl"
                onChange={handlePercentageChange}
              />
              <div className="relative right-7">%</div>
            </div>
          </form>
          <div className="p-6">
            <button
              onClick={() => setShowEditModal(false)}
              className="mx-auto flex cursor-pointer items-center gap-x-2 rounded-full bg-[var(--success)] p-1 px-4 text-start text-lg text-[var(--background)] shadow-lg md:mx-0 md:ml-auto"
            >
              Übernehmen
              <Check />
            </button>
          </div>
        </>
      </div>
    </>
  );
}
