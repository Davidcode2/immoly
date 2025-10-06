import ScenarioTextDisplay from "../../scenarioTextDisplay";
import AttentionIcon from "/public/images/icons/attention_flaticon.png";
import BarChartInterestVsTilgung from "../../components/barChartInterestVsTilgung";
import Image from "next/image";
import { useState } from "react";
import CenteredModal from "../centeredModal";
import TotalSumVsInterestModal from "./totalSumVsInterestModal";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import EditIconComponent from "../nebenkosten/editIconComponent";

type PropTypes = {
  sumZinsen: number;
  totalSum: number;
  paidAfter: number;
  paidInYear: number;
  kreditSumme: number;
  table: ArmotizationEntry[];
};
export default function TimeUntilTilgung({
  sumZinsen,
  totalSum,
  paidAfter,
  paidInYear,
  kreditSumme,
  table,
}: PropTypes) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const show = window.innerWidth >= 768;
  return (
    <>
      {showModal && (
        <CenteredModal
          onClose={() => setShowModal(false)}
          historyState={{ modalId: "sum-vs-interest" }}
        >
          <TotalSumVsInterestModal
            sumZinsen={sumZinsen}
            totalSum={totalSum}
            paidAfter={paidAfter}
            paidInYear={paidInYear}
            kreditSumme={kreditSumme}
            show={show}
            setShow={setShowModal}
            table={table}
          />
        </CenteredModal>
      )}
      <div
        className="sm:h-none flex overflow-clip rounded-lg p-5 shadow backdrop-blur-2xl md:mx-0 md:my-0 md:max-h-56 md:max-w-none md:p-8 md:text-start dark:shadow-[0_4px_50px_var(--dark-accent)]/20"
        onClick={() => setShowModal(true)}
      >
        <div>
          <EditIconComponent setShowModal={setShowModal} />
          <Image
            className={`${paidAfter === -1 ? "block" : "hidden"} absolute top-6 left-12 opacity-20 md:top-8 md:left-28 dark:invert w-40 h-40`}
            src={AttentionIcon}
            alt="Achtung"
          />
          <ScenarioTextDisplay
            sumZinsen={sumZinsen}
            totalSum={totalSum}
            paidAfter={paidAfter}
            paidInYear={paidInYear}
          />
          <div className="hidden md:block">
            {paidAfter !== -1 && (
              <BarChartInterestVsTilgung
                sumZinsen={sumZinsen}
                kreditSumme={kreditSumme}
                show={show}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
