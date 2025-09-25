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
      <div className="flex flex-col items-center justify-center gap-5 bg-radial md:w-2/3 lg:w-1/3">
        <label
          className="flex items-center gap-x-4 self-start text-4xl"
          htmlFor={entry.name}
        >
          {getIcon(entry.name)} {entry.name}
        </label>
        <form onSubmit={() => setShowEditModal(false)}>
          <input
            id={entry.name}
            type="number"
            ref={inputRef}
            onChange={handleAbsoluteChange}
            name={entry.name}
            value={Math.round(absoluteValue) || ""}
            className="focus:bg-[var(--foreground)/20 w-full rounded-full border border-slate-300 bg-[var(--foreground)]/10 px-8 py-1 text-left text-xl text-[var(--text)] outline-none placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] focus:placeholder:text-[var(--text)] md:text-5xl"
          />
        </form>
        <>
          <form onSubmit={() => setShowEditModal(false)}>
            <div className="flex w-full items-center justify-around">
              <input
                value={currentPercentage().substring(0, 4)}
                type="text"
                className="w-22 rounded-full bg-linear-to-br from-[var(--dark-accent)] to-[var(--accent)] p-1 px-4 shadow-lg text-start text-lg text-[var(--secondary)]"
                onChange={handlePercentageChange}
              />
              <div className="relative right-7">%</div>
              <button className="flex gap-x-2 items-center cursor-pointer rounded-full bg-[var(--success)] shadow-lg text-[var(--background)] p-1 px-4 text-start text-lg">
                Übernehmen
                <Check />
              </button>
            </div>
          </form>
        </>
      </div>
    </>
  );
}
