import { useState } from "react";
import GermanyMap from "../germanyMap";
import PieChartNebenkosten from "./pieChartNebenkosten";

type PropTypes = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  nebenkosten: any;
  sumNebenkosten: number;
  activeIndex: number | null;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
};
export default function NebenkostenModal({
  nebenkosten,
  sumNebenkosten,
  activeIndex,
  handleMouseEnter,
  handleMouseLeave,
}: PropTypes) {
  const [showMap, setShowMap] = useState<boolean>(false);

  return (
    <div className="z-40 mx-4 md:mx-auto md:max-w-xl rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--background)]/50 to-[var(--primary)]/20 shadow-2xl">
    <button onClick={() => setShowMap(true)}>Bundesland auswählen</button>
      <div className="grid md:grid-cols-2">
      { showMap && 
        <div className={`w-20`}>
          <GermanyMap />
        </div>
      }
        <div>
          <div className="p-6">
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
                  className={`group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-all hover:bg-white/5 ${
                    activeIndex === index
                      ? "text-[var(--accent)] opacity-100"
                      : "opacity-90"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-4 w-4 rounded-sm transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `var(--${index === 0 ? "dark-accent" : index === 1 ? "neutral-accent" : index === 2 ? "accent" : "light-accent"})`,
                      }}
                    />
                    <div className="text-lg md:text-base">{entry.name}</div>
                  </div>
                  <div className="text-xl md:text-lg">
                    €{entry.value.toLocaleString("de")}
                  </div>
                </div>
              ),
            )}

            <div className="mt-6 border-t border-slate-500/20 pt-4">
              <div className="flex items-center justify-between gap-x-8">
                <h2 className="text-xl">Summe Nebenkosten</h2>
                <p className="text-2xl font-bold text-[var(--accent)]">
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
