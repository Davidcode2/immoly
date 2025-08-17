import { useEffect, useState } from "react";
import GermanyMap from "../germanyMap";
import PieChartNebenkosten from "./pieChartNebenkosten";
import { screenWidthMobile } from "app/utils/screenWidth";
import NebenkostenEntry from "./nebenkostenEntry";

type PropTypes = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  nebenkosten: any;
  sumNebenkosten: number;
  setBundesland: (bundesland: string) => void;
  bundesland: string;
  setMaklergebuehr: (percentage: number) => void;
  maklergebuehr: number;
  activeIndex: number | null;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
};
export default function NebenkostenModal({
  nebenkosten,
  setBundesland,
  bundesland,
  maklergebuehr,
  setMaklergebuehr,
  sumNebenkosten,
  activeIndex,
  handleMouseEnter,
  handleMouseLeave,
}: PropTypes) {
  const [showMap, setShowMap] = useState<boolean>(false);

  useEffect(() => {
    setBundesland(bundesland);
  }, [bundesland]);

  return (
    <div className="z-40 mx-4 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--background)]/50 to-[var(--primary)]/20 shadow-2xl backdrop-blur-xl md:mx-auto md:max-w-2xl">
      <div className="grid md:grid-cols-2">
        {(!screenWidthMobile() || showMap) && (
          <div
            className={`fixed z-40 h-full w-full rounded-xl bg-radial-[at_50%_50%] from-[var(--background)] to-[var(--secondary)] md:static md:rounded-none md:rounded-l-xl`}
          >
            <GermanyMap
              setBundesland={setBundesland}
              onClose={() => setShowMap(false)}
            />
          </div>
        )}
        <div>
          <div className="relative bottom-10 h-50 w-full p-6 md:static md:h-40 md:w-40">
            <PieChartNebenkosten
              data={nebenkosten}
              activeIndex={activeIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          </div>

          <div className="space-y-4 px-6 pb-6">
            {nebenkosten.map(
              (entry: { name: string; value: number }, index: number) => (
                <NebenkostenEntry
                  key={entry.name}
                  entry={entry}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  setShowMap={setShowMap}
                  bundesland={bundesland}
                  maklergebuehr={maklergebuehr}
                  setMaklergebuehr={setMaklergebuehr}
                  index={index}
                  activeIndex={activeIndex}
                />
              ),
            )}

            <div className="mt-6 border-t border-slate-500/20 pt-4">
              <div className="flex items-center justify-between gap-x-8">
                <h2 className="text-lg">Summe Nebenkosten</h2>
                <p className="text-2xl text-[var(--accent)]">
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
