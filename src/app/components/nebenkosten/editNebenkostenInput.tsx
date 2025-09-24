import { useEffect, useRef } from "react";
import { CompleteNebenkostenModel } from "./nebenkostenFrontendModel";
import {
  useGrundbuchkostenPercentageStore,
  useGrundbuchkostenStore,
  useMaklergebuehrPercentageStore,
  useMaklergebuehrStore,
  useNotarkostenPercentageStore,
  useNotarkostenStore,
} from "app/store";

type PropTypes = {
  entry: CompleteNebenkostenModel;
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

  /** absolute updaters **/
  const updateMaklergebuehrAbsoluteState = useMaklergebuehrStore(
    (state) => state.updateValue,
  );
  const updateNotarkostenAbsolute = useNotarkostenStore(
    (state) => state.updateValue,
  );
  const updateGrundbuchkostenAbsolute = useGrundbuchkostenStore(
    (state) => state.updateValue,
  );

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
        updateGrundbuchkostenAbsolute(
          Math.round(
            (Number(e.target.value.replace(",", ".")) / 100) * principal,
          ),
        );
        break;
      case "Maklergebühr":
        updateMaklergebuehrPercentageState(e.target.value);
        updateMaklergebuehrAbsoluteState(
          Math.round(
            (Number(e.target.value.replace(",", ".")) / 100) * principal,
          ),
        );
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
        return 0;
    }
  };

  const handleAbsoluteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    switch (entry.name) {
      case "Notarkosten":
        updateNotarkostenAbsolute(newValue);
        break;
      case "Grundbuchkosten":
        updateGrundbuchkostenAbsolute(newValue);
        break;
      case "Maklergebühr":
        updateMaklergebuehrAbsoluteState(newValue);
        updateMaklergebuehrPercentageState(
          ((newValue / principal) * 100).toFixed(2),
        );
        break;
      default:
        throw new Error("Unknown nebenkosten entry");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 bg-radial md:w-1/4">
        <label className="self-start text-4xl" htmlFor={entry.name}>
          {entry.name}
        </label>
        <form onSubmit={() => setShowEditModal(false)}>
          <input
            id={entry.name}
            type="number"
            ref={inputRef}
            onChange={handleAbsoluteChange}
            name={entry.name}
            value={Math.round(entry.value) || ""}
            className="focus:bg-[var(--foreground)/20 w-full rounded-full border border-slate-300 bg-[var(--foreground)]/10 px-8 py-1 text-left text-xl text-[var(--text)] outline-none placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] focus:placeholder:text-[var(--text)] md:text-5xl"
          />
        </form>
        <>
          <div className="flex items-center justify-center">
            <input
              value={currentPercentage()}
              type="text"
              className="w-22 rounded-full bg-linear-to-br from-[var(--dark-accent)] to-[var(--accent)] p-1 px-4 text-start text-lg text-[var(--secondary)]"
              onChange={handlePercentageChange}
            />
            <div className="relative right-7">%</div>
          </div>
        </>
      </div>
    </>
  );
}
