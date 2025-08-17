import { getGrundsteuer } from "app/services/nebenkostenGrundsteuer";

type PropTypes = {
  entry: { name: string; value: number };
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  setShowMap: (arg: boolean) => void;
  bundesland: string;
  maklergebuehr: number;
  setMaklergebuehr: (arg: number) => void;
  activeIndex: number | null;
  index: number;
};
export default function NebenkostenEntry({
  entry,
  handleMouseEnter,
  handleMouseLeave,
  setShowMap,
  bundesland,
  maklergebuehr,
  setMaklergebuehr,
  index,
  activeIndex,
}: PropTypes) {

  return (
    <div
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
      className={`group flex cursor-pointer items-center justify-between rounded-lg transition-all hover:bg-white/5 ${
        activeIndex === index
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
        {entry.name === "Grunderwerbsteuer" && (
          <div className="w-fit rounded-xl bg-[var(--dark-accent)] p-1 px-2 text-xs text-[var(--secondary)]">
            {getGrundsteuer(bundesland)} %
          </div>
        )}
        {entry.name === "Maklergebühr" && (
          <div className="w-fit rounded-xl bg-[var(--dark-accent)] p-1 px-2 text-xs text-[var(--secondary)]">
          { entry.name === "Maklergebühr" && (
            <select value={maklergebuehr} name="maklergebuehr" onChange={(e) => setMaklergebuehr(Number(e.target.value))}>
              <option value={3.57}>3,57 %</option>
              <option value={2.98}>2,98 %</option>
              <option value={3.12}>3,12 %</option>
            </select>
          )}
          </div>
        )}
      </div>
    </div>
  );
}
