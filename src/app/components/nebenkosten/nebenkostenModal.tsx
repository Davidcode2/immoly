import { useEffect, useState } from "react";
import GermanyMap from "../germanyMap";
import PieChartNebenkosten from "./pieChartNebenkosten";
import { screenWidthMobile } from "app/utils/screenWidth";
import NebenkostenEntry from "./nebenkostenEntry";
import { bundeslaender } from "app/services/nebenkostenGrundsteuer";
import { AbsoluteNebenkostenModel } from "./nebenkostenFrontendModel";

type PropTypes = {
  pieChartData: { name: string; value: number }[];
  sumNebenkosten: number;
  setBundesland: (bundesland: string) => void;
  bundesland: string;
  activeIndex: number | null;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  principal: number;
};
export default function NebenkostenModal({
  pieChartData,
  setBundesland,
  bundesland,
  sumNebenkosten,
  activeIndex,
  handleMouseEnter,
  handleMouseLeave,
  principal,
}: PropTypes) {
  const [showMap, setShowMap] = useState<boolean>(false);

  useEffect(() => {
    setBundesland(bundesland);
  }, [bundesland]);

  return (
    <div className="z-40 mx-4 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--background)]/50 to-[var(--primary)]/20 shadow-2xl backdrop-blur-3xl md:backdrop-blur-xl md:mx-auto md:max-w-3xl">
      <div className="grid md:grid-cols-2">
        {(!screenWidthMobile() || showMap) && (
          <div
            className={`fixed z-40 h-fit w-full rounded-xl bg-radial-[at_50%_50%] from-[var(--background)] to-[var(--secondary)] md:static md:rounded-none md:rounded-l-xl`}
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
        )}
        <div>
          <div className="relative h-45">
            <div className="absolute h-70 bottom-6 w-full md:p-6 md:static md:h-45 md:w-45">
              <PieChartNebenkosten
                data={pieChartData}
                activeIndex={activeIndex}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            </div>
          </div>

          <div className="space-y-4 px-6 pb-6">
            {pieChartData.map(
              (entry: AbsoluteNebenkostenModel, index: number) => (
                <NebenkostenEntry
                  key={entry.name}
                  entry={entry}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  setShowMap={setShowMap}
                  bundesland={bundesland}
                  index={index}
                  activeIndex={activeIndex}
                  principal={principal}
                />
              ),
            )}

            <div className="mt-6 border-t border-slate-500/20 pt-4">
              <div className="flex items-center justify-between gap-x-8">
                <h2 className="text-lg">Summe Nebenkosten</h2>
                <p className="w-32 text-end text-2xl text-[var(--accent)]">
                  €{sumNebenkosten.toLocaleString("de-DE")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
