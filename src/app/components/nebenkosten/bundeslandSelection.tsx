import GermanyMap from "../germanyMap";
import { bundeslaender } from "app/services/nebenkostenGrundsteuer";

type PropTypes = {
  bundesland: string;
  setBundesland: (arg1: string) => void;
  setShowMap: (arg1: boolean) => void;
}
export default function BundeslandSelection({bundesland, setBundesland, setShowMap}: PropTypes) {
  return (
    <div
      className={`fixed z-40 h-fit w-full rounded-xl bg-radial-[at_50%_50%] from-[var(--background)] to-[var(--secondary)] md:static md:rounded-none md:rounded-l-xl dark:to-[var(--background)]/20 dark:border-r`}
    >
      <div className="mx-10 mt-4 rounded-full bg-[var(--foreground)] p-2 text-sm text-[var(--background)] shadow-lg md:mb-4">
        <select
          value={bundesland}
          className="w-full px-2"
          onChange={(e) => setBundesland(e.target.value)}
        >
          Wählen Sie Ihr Bundesland
          {bundeslaender.map((_bundesland: string) => (
            <option
              key={_bundesland}
              value={_bundesland}
              defaultValue={bundesland}
            >
              {_bundesland}
            </option>
          ))}
        </select>
      </div>
      <div className="md:px-4 md:pb-4">
        <GermanyMap
          bundesland={bundesland}
          setBundesland={setBundesland}
          onClose={() => setShowMap(false)}
        />
      </div>
    </div>
  );
}
