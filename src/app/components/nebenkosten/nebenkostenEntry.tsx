import EditNebenkostenInput from "./editNebenkostenInput";
import CenteredModal from "../centeredModal";
import { useState } from "react";
import {
  useGrundbuchkostenPercentageStore,
  useMaklergebuehrPercentageStore,
  useNebenkostenActiveStore,
  useNotarkostenPercentageStore,
} from "app/store";
import { AbsoluteNebenkostenModel } from "./nebenkostenFrontendModel";
import { getGrundsteuer } from "app/services/nebenkostenGrundsteuer";

type PropTypes = {
  entry: AbsoluteNebenkostenModel;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  setShowMap: (arg: boolean) => void;
  bundesland: string;
  activeIndex: number | null;
  index: number;
  principal: number;
};
export default function NebenkostenEntry({
  entry,
  handleMouseEnter,
  handleMouseLeave,
  setShowMap,
  bundesland,
  index,
  activeIndex,
  principal,
}: PropTypes) {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const nebenkostenActive = useNebenkostenActiveStore().value;

  const maklergebuehrPercentage = useMaklergebuehrPercentageStore(
    (state) => state.value,
  );
  const notarkostenPercentage = useNotarkostenPercentageStore(
    (state) => state.value,
  );
  const grundbuchkostenPercentage = useGrundbuchkostenPercentageStore(
    (state) => state.value,
  );

  const currentPercentage = () => {
    switch (entry.name) {
      case "Notarkosten":
        return (
          Math.round(Number(notarkostenPercentage.replace(",", ".")) * 100) /
          100
        )
          .toString()
          .replace(".", ",");
      case "Grundbuchkosten":
        return (
          Math.round(
            Number(grundbuchkostenPercentage.replace(",", ".")) * 100,
          ) / 100
        )
          .toString()
          .replace(".", ",");
      case "Maklergebühr":
        return (
          Math.round(Number(maklergebuehrPercentage.replace(",", ".")) * 100) /
          100
        )
          .toString()
          .replace(".", ",");
      case "Grunderwerbsteuer":
        return getGrundsteuer(bundesland);
      default:
        return "";
    }
  };

  return (
    <>
      {showEditModal && (
        <CenteredModal onClose={() => setShowEditModal(false)}
          historyState={{ modalId: "edit-ancillary-costs" }}
        >
          <EditNebenkostenInput
            entry={entry}
            setShowEditModal={setShowEditModal}
            principal={principal}
          />
        </CenteredModal>
      )}

      <div
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (entry.name === "Grunderwerbsteuer") {
            setShowMap(true);
          } else {
            setShowEditModal(true);
          }
        }}
        className={`group flex max-md:gap-x-10 cursor-pointer items-center justify-between rounded-lg transition-all ${activeIndex === index
            ? "text-[var(--primary)] opacity-100"
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
            <div className={`${!nebenkostenActive && "line-through text-[var(--grey-accent)]" } text-base`}>{entry.name}</div>
            {entry.name === "Grunderwerbsteuer" && (
              <button
                className="w-fit rounded-xl border border-[var(--dark-accent)] p-1 px-2 text-xs hover:bg-[var(--dark-accent)] hover:text-[var(--secondary)]"
              >
                {bundesland}
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className={`${!nebenkostenActive && "line-through text-[var(--grey-accent)]" } text-xl md:text-lg`}>
            €{entry.value.toLocaleString("de")}
          </div>
          <div className="w-fit rounded-xl bg-[var(--dark-accent)] p-1 px-2 text-xs text-[var(--secondary)]">
            {currentPercentage()} %
          </div>
        </div>
      </div>
    </>
  );
}
