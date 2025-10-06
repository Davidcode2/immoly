import Image from "next/image";
import PieChartGesamtBetrag from "./lineChartGesamtbetrag";
import { useCalcNebenkostenSum } from "app/hooks/useCalcNebenkostenSum";
import EditIconComponent from "./nebenkosten/editIconComponent";
import { useState } from "react";
import CenteredModal from "./centeredModal";
import KreditSummeModal from "./kreditSummeTextModal";

type PropTypes = {
  principal: number;
  downPayment: number;
};
export default function KreditSummeTextComponent({
  principal,
  downPayment,
}: PropTypes) {
  const nebenkosten = useCalcNebenkostenSum(principal);
  const [showModal, setShowModal] = useState<boolean>(false);

  const kreditSummeRaw = principal + nebenkosten - downPayment;
  const kreditSumme = kreditSummeRaw < 0 ? 0 : kreditSummeRaw;

  const kreditSummeString = Math.round(kreditSumme).toLocaleString("de");

  return (
    <>
      {showModal && (
        <CenteredModal
          onClose={() => setShowModal(false)}
          historyState={{ modalId: "credit-sum" }}
        >
          <KreditSummeModal
            principal={principal}
            nebenkosten={nebenkosten}
            downPayment={downPayment}
            kreditSummeString={kreditSummeString}
            onClose={() => setShowModal(false)}
          />
        </CenteredModal>
      )}
      <div
        className="z-20 max-h-56 rounded-lg bg-[var(--light-accent)]/10 shadow backdrop-blur-2xl dark:shadow-[0_4px_50px_var(--dark-accent)]/20"
        onClick={() => setShowModal(true)}
      >
        <EditIconComponent setShowModal={setShowModal} />
        <div className="rounded-t-lg bg-[var(--background)] p-5 pb-3 md:p-8 md:pb-8">
          <p className="text-xs">Kreditsumme</p>
          <div className="flex items-center justify-between">
            <div
              className={`${kreditSumme >= 10000000 ? "text-xl md:text-2xl" : kreditSumme >= 1000000 ? "text-2xl md:text-3xl" : kreditSumme >= 100000 ? "text-(length:--text-2_5xl) md:text-4xl" : "text-3xl md:text-4xl"} flex h-12 items-center text-[var(--accent)]`}
            >
              <div>{kreditSummeString}</div>
            </div>
            <div className="relative left-1 h-10 w-10 rotate-180 self-center">
              <PieChartGesamtBetrag
                kreditSumme={kreditSumme}
                downPayment={downPayment}
                kaufSumme={principal}
              />
            </div>
          </div>
        </div>
        <div className="grid h-fit grid-cols-[1fr_1fr] items-baseline gap-x-2 rounded-b-lg p-5 pt-2 md:p-8 md:pt-4">
          <span className="text-(length:--text-2xs) text-[var(--dark-accent)]/90 dark:text-[var(--ultralight-accent)]/90">
            Kaufpreis
          </span>
          <span className="text-end text-xs">
            {principal.toLocaleString("de")}
          </span>
          <span className="self-center text-(length:--text-2xs) text-[var(--dark-accent)]/90 dark:text-[var(--ultralight-accent)]/90">
            Nebenkosten
          </span>
          <div className="text-end text-xs text-[var(--dark-accent)]/90 dark:text-[var(--accent)]/90">
            +&nbsp;{nebenkosten.toLocaleString("de")}
          </div>
          <span className="group relative flex items-center gap-x-2 text-start text-(length:--text-2xs) text-[var(--dark-accent)]/90 dark:text-[var(--ultralight-accent)]/90">
            Eigenkapital
            {nebenkosten > downPayment && (
              <>
                <Image
                  className="absolute left-18 md:static"
                  src="/images/icons/icons8-warnung-emoji-48.png"
                  alt="yellow warning icon with exclamation point"
                  width={16}
                  height={16}
                />
                <span className="invisible absolute left-28 w-60 rounded-lg bg-white p-4 text-xs text-[var(--accent)] shadow-lg group-hover:visible dark:bg-black">
                  Eigenkapital deckt Nebenkosten nicht.
                  <br />
                  Könnte schwierig werden.
                </span>
              </>
            )}
          </span>
          <span
            className={`${downPayment > 10000000 ? "w-18" : downPayment > 1000000 ? "w-16" : "w-14"} justify-self-end text-end text-xs text-[var(--strong-accent)] sm:w-auto`}
          >
            -&nbsp;{downPayment.toLocaleString("de")}
          </span>
        </div>
      </div>
    </>
  );
}
