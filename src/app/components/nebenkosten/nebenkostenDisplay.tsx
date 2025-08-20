import CashRoiModel from "app/lib/models/cashRoiModel";
import NebenkostenCalculator from "app/services/nebenkostenCalculationService";
import { useEffect, useRef, useState } from "react";
import CenteredModal from "../centeredModal";
import PieChartNebenkosten from "./pieChartNebenkosten";
import EditIcon from "/public/images/icons/icons8-edit-48.png";
import Image from "next/image";
import NebenkostenModal from "./nebenkostenModal";
import { screenWidthMobile } from "app/utils/screenWidth";
import { useBundeslandStore, useMaklergebuehrStore, useNebenkostenStore } from "app/store";

type PropTypes = {
  calculationData: CashRoiModel | null;
};

export default function NebenkostenDisplay({ calculationData }: PropTypes) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [bundesland, setBundesland] = useState<string>("Baden-Wuerttemberg");
  const [maklergebuehr, setMaklergebuehr] = useState<number>(3.57);
  const [nebenkosten, setNebenkosten] = useState<
    { name: string; value: number }[]
  >([]);
  const sumNebenkosten = useRef<number>(0);

  const nebenkostenCalculator = new NebenkostenCalculator(
    calculationData!.principal,
  );

  const handleMouseEnter = (index: number) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  const updateNebenkosten = useNebenkostenStore((state) => state.updateValue)
  const updateMaklergebuehr = useMaklergebuehrStore((state) => state.updateValue)
  const updateBundesland = useBundeslandStore((state) => state.updateValue)


  useEffect(() => {
    nebenkostenCalculator.bundesland = bundesland;
    nebenkostenCalculator.maklergebuehrPercentage = maklergebuehr;
    const nebenkostenResult = calcGraphData();
    sumNebenkosten.current = nebenkostenCalculator.calcSumme();
    updateMaklergebuehr(maklergebuehr);
    updateBundesland(bundesland);
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
    <div
      className="flex flex-col items-center justify-between rounded-lg px-6 pt-6 text-xs shadow backdrop-blur-2xl md:col-span-2 md:flex-row md:justify-start md:gap-6 md:py-4 md:text-base max-h-56"
      onClick={openModalOnMobile}
    >
      {showModal && (
        <CenteredModal onClose={() => setShowModal(false)}>
          <NebenkostenModal
            setMaklergebuehr={setMaklergebuehr}
            maklergebuehr={maklergebuehr}
            setBundesland={setBundesland}
            bundesland={bundesland}
            nebenkosten={nebenkosten}
            sumNebenkosten={sumNebenkosten.current}
            activeIndex={activeIndex}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        </CenteredModal>
      )}
      <div
        className="absolute top-5 right-4 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="group inline-block rounded-xl border border-[var(--dark-accent)] p-1 px-2 text-xs transition-colors hover:bg-[var(--dark-accent)] hover:text-[var(--secondary)]">
          Mehr
          <Image
            className="inline-block opacity-50 group-hover:opacity-60 group-hover:invert"
            src={EditIcon}
            width={14}
            height={14}
            alt="Bearbeiten"
          />
        </div>
      </div>
      <div className="absolute -bottom-[5px] h-40 w-40 md:static md:h-48 md:w-48">
        <PieChartNebenkosten
          data={nebenkosten}
          activeIndex={activeIndex}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </div>
      <div className="order-first flex h-20 w-full flex-col gap-12 overflow-y-scroll pb-4 md:order-2 md:grid md:h-fit md:grid-cols-2 md:gap-2 md:p-0">
        <div className="md:hidden">
          <div className="inline-block text-xs">Summe<br/>Nebenkosten:</div>
          <div className="text-2xl">
            {sumNebenkosten.current.toLocaleString("de")}
          </div>
        </div>
        {nebenkosten.map((entry, index) => (
          <div
            key={entry.name}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={`flex cursor-pointer flex-col transition-opacity ${
              activeIndex === index
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
              <div className="inline-block overflow-hidden text-lg overflow-ellipsis md:text-base">
                {entry.name}:
              </div>
            </div>
            <div className="text-2xl">€{entry.value.toLocaleString("de")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
