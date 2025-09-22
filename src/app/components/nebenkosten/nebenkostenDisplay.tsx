import CashRoiModel from "app/lib/models/cashRoiModel";
import { NebenkostenCalculatorForNebenkostenComponent } from "app/services/nebenkostenCalculationService";
import { useEffect, useRef, useState } from "react";
import CenteredModal from "../centeredModal";
import PieChartNebenkosten from "./pieChartNebenkosten";
import NebenkostenModal from "./nebenkostenModal";
import { screenWidthMobile } from "app/utils/screenWidth";
import {
  useBundeslandStore,
  useMaklergebuehrStore,
  useNebenkostenStore,
} from "app/store";
import EditIconComponent from "./editIconComponent";
import { DEFAULT_BUNDESLAND } from "app/constants";

type PropTypes = {
  calculationData: CashRoiModel | null;
};

export default function NebenkostenDisplay({ calculationData }: PropTypes) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const bundesland = useBundeslandStore((state) => state.value);
  const [maklergebuehr, setMaklergebuehr] = useState<number>(3.57);
  const [nebenkosten, setNebenkosten] = useState<
    { name: string; value: number }[]
  >([]);
  const sumNebenkosten = useRef<number>(0);

  if (!calculationData) {
    throw new Error("No calculation data available");
  }
  const nebenkostenCalculator = new NebenkostenCalculatorForNebenkostenComponent(
    calculationData?.principal,
  );

  const handleMouseEnter = (index: number) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  const updateNebenkosten = useNebenkostenStore((state) => state.updateValue);
  const updateMaklergebuehr = useMaklergebuehrStore(
    (state) => state.updateValue,
  );
  const updateBundesland = useBundeslandStore((state) => state.updateValue);

  useEffect(() => {
    nebenkostenCalculator.bundesland = bundesland;
    nebenkostenCalculator.maklergebuehrPercentage = maklergebuehr;
    const nebenkostenResult = calcGraphData();
    sumNebenkosten.current = nebenkostenCalculator.calcSumme();
    updateMaklergebuehr(maklergebuehr);
    updateBundesland(bundesland || DEFAULT_BUNDESLAND);
    setNebenkosten(nebenkostenResult);
    updateNebenkosten(sumNebenkosten.current);
  }, [bundesland, maklergebuehr, calculationData]);

  const calcGraphData = () => {
    const graphData = [
      { name: "Notarkosten", value: nebenkostenCalculator.calcNotarkosten() },
      {
        name: "Grundbuchkosten",
        value: nebenkostenCalculator.calcGrundbuchkosten(),
      },
      {
        name: "Grunderwerbsteuer",
        value: nebenkostenCalculator.calcGrunderwerbsteuer(bundesland),
      },
      {
        name: "Maklergebühr",
        value: nebenkostenCalculator.calcMaklergebuehr(),
      },
    ];
    return graphData;
  };

  const openModalOnMobile = () => {
    if (screenWidthMobile() && !showModal) {
      setShowModal(true);
    }
  };

  return (
    <div className="max-h-56 rounded-lg px-6 pt-6 text-xs shadow backdrop-blur-2xl md:col-span-2 md:pt-8 md:text-base">
      <div className="mb-0 text-xs md:mb-0">Nebenkosten</div>
      <div className="mb-5 md:relative">
        <div className="text-3xl md:absolute">
          {sumNebenkosten.current.toLocaleString("de")}
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-between md:flex-row md:justify-start md:gap-6"
        onClick={openModalOnMobile}
      >
        {showModal && (
          <CenteredModal onClose={() => setShowModal(false)}>
            <NebenkostenModal
              setMaklergebuehr={setMaklergebuehr}
              maklergebuehr={maklergebuehr}
              setBundesland={updateBundesland}
              bundesland={bundesland}
              nebenkosten={nebenkosten}
              sumNebenkosten={sumNebenkosten.current}
              activeIndex={activeIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          </CenteredModal>
        )}
        <EditIconComponent setShowModal={setShowModal} />
        <div className="absolute -bottom-[5px] h-40 w-40 md:static md:hidden md:h-48 md:w-48">
          <PieChartNebenkosten
            data={nebenkosten}
            activeIndex={activeIndex}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        </div>
        <div className="order-first hidden h-20 w-full flex-col gap-12 overflow-y-scroll pb-4 md:grid md:h-fit md:grid-cols-2 md:gap-2 md:p-0">
          {nebenkosten.map((entry, index) => (
            <div
              key={entry.name}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`flex cursor-pointer flex-col transition-opacity ${activeIndex === index
                  ? "text-[var(--accent)] opacity-100"
                  : "opacity-90"
                }`}
            >
              <div className="flex items-center">
                <span
                  className="mr-2 inline-block h-3 min-w-3 rounded-sm"
                  style={{
                    backgroundColor: `var(--${index === 0 ? "dark-accent" : index === 1 ? "neutral-accent" : index === 2 ? "accent" : "light-accent"})`,
                  }}
                />
                <div className="inline-block overflow-hidden text-lg overflow-ellipsis md:text-xs">
                  {entry.name}:
                </div>
              </div>
              <div className="text-2xl md:text-lg">
                €{entry.value.toLocaleString("de")}
              </div>
            </div>
          ))}
        </div>
        <div className="relative bottom-4 z-20 hidden h-40 w-40 md:block md:h-38 md:w-48">
          <PieChartNebenkosten
            data={nebenkosten}
            activeIndex={activeIndex}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </div>
  );
}
