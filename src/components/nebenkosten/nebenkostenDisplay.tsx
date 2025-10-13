import CashRoiModel from "@/lib/models/cashRoiModel";
import { useRef, useState } from "react";
import CenteredModal from "../centeredModal";
import PieChartNebenkosten from "./pieChartNebenkosten";
import NebenkostenModal from "./nebenkostenModal";
import {
  useBundeslandStore,
  useGrundbuchkostenPercentageStore,
  useMaklergebuehrPercentageStore,
  useNotarkostenPercentageStore,
} from "@/store";
import EditIconComponent from "./editIconComponent";
import { getGrundsteuer } from "@/services/nebenkostenGrundsteuer";
import NebenkostenGrid from "./nebenkostenGrid";
import { useCalcNebenkostenSum } from "@/hooks/useCalcNebenkostenSum";

type PropTypes = {
  calculationData: CashRoiModel | null;
};

export default function NebenkostenDisplay({ calculationData }: PropTypes) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const bundesland = useBundeslandStore((state) => state.value);
  const sumNebenkosten = useRef<number>(0);

  if (!calculationData) {
    throw new Error("No calculation data available");
  }

  const handleMouseEnter = (index: number) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  const updateBundesland = useBundeslandStore((state) => state.updateValue);
  const grunderwerbsteuer =
    (getGrundsteuer(bundesland) * calculationData.principal) / 100;
  const maklergebuehrPercentage = Number(
    useMaklergebuehrPercentageStore((state) => state.value).replace(",", "."),
  );

  const notarkostenPercentage = Number(
    useNotarkostenPercentageStore((state) => state.value).replace(",", "."),
  );
  const grundbuchkostenPercentage = Number(
    useGrundbuchkostenPercentageStore((state) => state.value).replace(",", "."),
  );

  const absoluteMaklergebuehrFromPercentage = Math.round(
    (maklergebuehrPercentage / 100) * calculationData.principal,
  );
  const absoluteNotarkostenFromPercentage = Math.round(
    (notarkostenPercentage / 100) * calculationData.principal,
  );
  const absoluteGrundbuchkostenFromPercentage = Math.round(
    (grundbuchkostenPercentage / 100) * calculationData.principal,
  );

  const openModalOnMobile = () => {
    if (!showModal) {
      setShowModal(true);
    }
  };

  const sumPercentage =
    maklergebuehrPercentage +
    grundbuchkostenPercentage +
    notarkostenPercentage +
    getGrundsteuer(bundesland);

  sumNebenkosten.current = useCalcNebenkostenSum(calculationData.principal);

  const pieChartData = [
    { name: "Notarkosten", value: absoluteNotarkostenFromPercentage },
    {
      name: "Grundbuchkosten",
      value: absoluteGrundbuchkostenFromPercentage,
    },
    { name: "Grunderwerbsteuer", value: grunderwerbsteuer },
    {
      name: "Maklergebühr",
      value: absoluteMaklergebuehrFromPercentage,
    },
  ];

  return (
    <div className="max-h-56 rounded-lg px-6 pt-6 text-xs shadow backdrop-blur-2xl md:col-span-2 md:pt-8 md:text-base dark:shadow-[0_4px_50px_var(--dark-accent)]/20">
      <div className="mb-0 text-xs md:mb-0">Nebenkosten</div>
      <div className="mb-5 md:relative">
        <div className="text-3xl md:absolute">
          <div className="gap-x-4 md:flex">
            <div className="">
              {sumNebenkosten.current.toLocaleString("de")}
            </div>
            <div className="w-fit self-end rounded-xl bg-[var(--ultralight-accent)] p-1 px-2 text-xs text-[var(--foreground)] dark:bg-[var(--dark-accent)]">
              {(Math.round(sumPercentage * 100) / 100).toLocaleString("de")}
              &nbsp;%
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-between md:flex-row md:justify-start md:gap-6"
        onClick={openModalOnMobile}
      >
        {showModal && (
          <CenteredModal
            onClose={() => setShowModal(false)}
            historyState={{ modalId: "ancillary-costs" }}
          >
            <NebenkostenModal
              pieChartData={pieChartData}
              setBundesland={updateBundesland}
              bundesland={bundesland}
              sumNebenkosten={sumNebenkosten.current}
              activeIndex={activeIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              principal={calculationData.principal}
              onClose={() => setShowModal(false)}
            />
          </CenteredModal>
        )}
        <EditIconComponent setShowModal={setShowModal} />
        <div className="absolute -bottom-[5px] h-40 w-40 md:static md:hidden md:h-48 md:w-48">
          <PieChartNebenkosten
            data={pieChartData}
            activeIndex={activeIndex}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        </div>
        <NebenkostenGrid
          openModal={setShowModal}
          data={pieChartData}
          activeIndex={activeIndex}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
        <div className="relative bottom-4 z-20 hidden h-40 w-40 md:block md:h-38 md:w-48">
          <PieChartNebenkosten
            data={pieChartData}
            activeIndex={activeIndex}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </div>
  );
}
