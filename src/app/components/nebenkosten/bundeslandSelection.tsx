import GermanyMap from "../germanyMap";
import { bundeslaender } from "app/services/nebenkostenGrundsteuer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PropTypes = {
  bundesland: string;
  setBundesland: (arg1: string) => void;
  setShowMap: (arg1: boolean) => void;
};
export default function BundeslandSelection({
  bundesland,
  setBundesland,
  setShowMap,
}: PropTypes) {
  return (
    <div
      className={`fixed z-40 h-fit w-full rounded-xl bg-radial-[at_50%_50%] from-[var(--background)] to-[var(--secondary)] md:static md:rounded-none md:rounded-l-xl dark:border-r dark:to-[var(--primary)] md:dark:to-[var(--background)]/20`}
    >
      <div className="mx-10 mt-4 text-sm text-[var(--foreground)] md:mb-4">
        <Select value={bundesland} onValueChange={setBundesland}>
          <SelectTrigger className="w-full rounded-full bg-[var(--foreground)] text-[var(--background)] dark:text-[var(--foreground)] dark:bg-[var(--background)] p-2 px-6 shadow-lg">
            <SelectValue placeholder="Wählen Sie Ihr Bundesland" />
          </SelectTrigger>
          <SelectContent>
            {bundeslaender.map((_bundesland: string) => (
              <SelectItem key={_bundesland} value={_bundesland}>
                {_bundesland}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
