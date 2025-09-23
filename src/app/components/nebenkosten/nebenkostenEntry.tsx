import EditNebenkostenInput from "./editNebenkostenInput";
import CenteredModal from "../centeredModal";
import { useState } from "react";

type PropTypes = {
  entry: { name: string; value: number };
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  setShowMap: (arg: boolean) => void;
  bundesland: string;
  activeIndex: number | null;
  percentage: number;
  index: number;
};
export default function NebenkostenEntry({
  entry,
  handleMouseEnter,
  handleMouseLeave,
  setShowMap,
  percentage,
  bundesland,
  index,
  activeIndex,
}: PropTypes) {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    switch (entry.name) {
      case "Notarkosten":
        entry.value = newValue;
        break;
      case "Grundbuchkosten":
        entry.value = newValue;
        break;
      case "Maklergebühr":
        entry.value = newValue;
        break;
      default:
        throw new Error("Unknown nebenkosten entry");
    }
  };

  return (
    <>
      {showEditModal && (
        <CenteredModal onClose={() => setShowEditModal(false)}>
          <EditNebenkostenInput entry={entry} handleChange={handleChange} />
        </CenteredModal>
      )}

      <div
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (entry.name !== "Grunderwerbsteuer") setShowEditModal(true);
        }}
        className={`group flex cursor-pointer items-center justify-between rounded-lg transition-all ${activeIndex === index
            ? "text-[var(--accent)] opacity-100"
            : "opacity-90"
          }`}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-4 w-4 rounded-sm transition-transform group-hover:scale-110"
            style={{
              backgroundColor: `var(--${index === 0 ? "dark-accent" : index === 1 ? "neutral-accent" : index === 2 ? "accent" : "light-accent"})`,
            }}
          />
          <div>
            <div className="text-base">{entry.name}</div>
            {entry.name === "Grunderwerbsteuer" && (
              <button
                className="w-fit rounded-xl border border-[var(--dark-accent)] p-1 px-2 text-xs hover:bg-[var(--dark-accent)] hover:text-[var(--secondary)]"
                onClick={() => setShowMap(true)}
              >
                {bundesland}
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-xl md:text-lg">
            €{entry.value.toLocaleString("de")}
          </div>
          <div className="w-fit rounded-xl bg-[var(--dark-accent)] p-1 px-2 text-xs text-[var(--secondary)]">
            {percentage} %
          </div>
        </div>
      </div>
    </>
  );
}
