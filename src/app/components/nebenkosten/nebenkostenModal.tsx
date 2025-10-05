import { useEffect, useState } from "react";
import PieChartNebenkosten from "./pieChartNebenkosten";
import { screenWidthMobile } from "app/utils/screenWidth";
import NebenkostenEntry from "./nebenkostenEntry";
import { AbsoluteNebenkostenModel } from "./nebenkostenFrontendModel";
import BundeslandSelection from "./bundeslandSelection";
import CloseButton from "../closeButton";

type PropTypes = {
  pieChartData: { name: string; value: number }[];
  sumNebenkosten: number;
  setBundesland: (bundesland: string) => void;
  bundesland: string;
  activeIndex: number | null;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  principal: number;
  onClose: () => void;
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
  onClose,
}: PropTypes) {
  const [showMap, setShowMap] = useState<boolean>(false);

  useEffect(() => {
    setBundesland(bundesland);
  }, [bundesland]);

  return (
    <div className="z-40 mx-4 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--background)]/50 to-[var(--primary)]/20 shadow-2xl backdrop-blur-3xl md:mx-auto md:max-w-3xl md:backdrop-blur-xl">
      <CloseButton onClick={onClose} />
      <div className="grid md:grid-cols-2">
        {(!screenWidthMobile() || showMap) && (
          <BundeslandSelection
            bundesland={bundesland}
            setBundesland={setBundesland}
            setShowMap={setShowMap}
          />
        )}
        <div>
          <div className="relative h-45">
            <div className="absolute bottom-6 h-70 w-full md:static md:h-45 md:w-45 md:p-6">
              <PieChartNebenkosten
                data={pieChartData}
                activeIndex={activeIndex}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                customInnerWidth={window.innerWidth < 768 ? "80%" : ""}
              />
            </div>
            <div className="relative top-20">
              <div className="flex w-full flex-col text-center justify-center md:hidden">
                Summe
                <p className="text-2xl dark:text-[var(--ultralight-accent)]">
                  € {sumNebenkosten.toLocaleString("de-DE")}
                </p>
              </div>
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

            <div className="max-md:hidden mt-6 border-t border-slate-500/20 pt-4">
              <div className="flex items-center justify-between gap-x-8">
                <h2 className="text-lg">Summe Nebenkosten</h2>
                <p className="w-32 text-end text-2xl dark:text-[var(--ultralight-accent)]">
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
