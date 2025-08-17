import { useEffect, useState } from "react";
import GermanyMap from "../germanyMap";
import PieChartNebenkosten from "./pieChartNebenkosten";
import { getGrundsteuer } from "app/services/nebenkostenGrundsteuer";
import { screenWidthMobile } from "app/utils/screenWidth";

type PropTypes = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  nebenkosten: any;
  sumNebenkosten: number;
  setBundesland: (bundesland: string) => void;
  bundesland: string;
  activeIndex: number | null;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
};
export default function NebenkostenModal({
  nebenkosten,
  setBundesland,
  bundesland,
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
        { (!screenWidthMobile() || showMap) && (
          <div
            className={`fixed md:static z-40 w-full h-full rounded-xl md:rounded-none md:rounded-l-xl bg-radial-[at_50%_50%] from-[var(--background)] to-[var(--secondary)]`}
          >
            <GermanyMap
              setBundesland={setBundesland}
              onClose={() => setShowMap(false)}
            />
          </div>
        )}
        <div>
          <div className="relative bottom-10 md:static p-6 w-full h-50 md:w-40 md:h-40">
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
                <div
                  key={entry.name}
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
                          className="text-xs border border-[var(--dark-accent)] hover:bg-[var(--dark-accent)] hover:text-[var(--secondary)] px-2 w-fit rounded-xl p-1"
                          onClick={() => setShowMap(true)}
                        >
                          {bundesland}
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-xl md:text-lg">
                      €{entry.value.toLocaleString("de")}
                    </div>
                    {entry.name === "Grunderwerbsteuer" && (
                      <div className="text-xs bg-[var(--dark-accent)] px-2 w-fit text-[var(--secondary)] rounded-xl p-1">{getGrundsteuer(bundesland)} %</div>
                    )}
                  </div>
                </div>
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
