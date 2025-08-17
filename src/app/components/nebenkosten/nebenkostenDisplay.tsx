import CashRoiModel from "app/lib/models/cashRoiModel";
import NebenkostenCalculator from "app/services/nebenkostenCalculationService";
import { useState } from "react";
import CenteredModal from "../centeredModal";
import PieChartNebenkosten from "./pieChartNebenkosten";
import EditIcon from "/public/images/icons/icons8-edit-48.png";
import Image from "next/image";
import NebenkostenModal from "./nebenkostenModal";

type PropTypes = {
  calculationData: CashRoiModel | null;
};

export default function NebenkostenDisplay({ calculationData }: PropTypes) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const nebenkostenCalculator = new NebenkostenCalculator(
    calculationData!.principal,
  );

  const handleMouseEnter = (index: number) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  const sumNebenkosten = nebenkostenCalculator.calcSumme();

  const calcGraphData = () => {
    const graphData = [
      { name: "Notarkosten", value: nebenkostenCalculator.calcNotarkosten() },
      {
        name: "Grundbuchkosten",
        value: nebenkostenCalculator.calcGrundbuchkosten(),
      },
      {
        name: "Grunderwerbsteuer",
        value: nebenkostenCalculator.calcGrunderwerbsteuer("Baden-Württemberg"),
      },
      {
        name: "Maklergebühr",
        value: nebenkostenCalculator.calcMaklergebuehr(),
      },
    ];
    return graphData;
  };

  const data = calcGraphData();

  return (
    <div className="flex flex-col items-center justify-between rounded-lg px-6 pt-6 text-xs shadow backdrop-blur-2xl md:col-span-2 md:flex-row md:justify-start md:gap-6 md:py-4 md:text-base">
      {showModal && (
        <CenteredModal onClose={() => setShowModal(false)} >
          <NebenkostenModal
            nebenkosten={data}
            sumNebenkosten={sumNebenkosten}
            activeIndex={activeIndex}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        </CenteredModal>
      )}
      <div
        className="absolute top-5 right-4 opacity-50"
        onClick={() => setShowModal(true)}
      >
        <Image src={EditIcon} width={14} height={14} alt="Bearbeiten" />
      </div>
      <PieChartNebenkosten
        data={data}
        activeIndex={activeIndex}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <div className="order-first flex h-20 w-full flex-col gap-12 overflow-y-scroll pb-4 md:order-2 md:grid md:h-fit md:grid-cols-2 md:gap-2 md:p-0">
        <div className="md:hidden">
          <div className="inline-block text-base">Summe Nebenkosten:</div>
          <div className="text-2xl">{sumNebenkosten.toLocaleString("de")}</div>
        </div>
        {data.map((entry, index) => (
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
