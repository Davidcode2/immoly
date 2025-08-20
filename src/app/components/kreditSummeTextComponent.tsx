import NebenkostenCalculator from "app/services/nebenkostenCalculationService";
import Image from "next/image";
import PieChartGesamtBetrag from "./lineChartGesamtbetrag";
import { useNebenkostenStore } from "app/store";

type PropTypes = {
  principal: number;
  downPayment: number;
};
export default function KreditSummeTextComponent({
  principal,
  downPayment,
}: PropTypes) {
  let nebenkosten = new NebenkostenCalculator(principal).calcSumme();
  nebenkosten = useNebenkostenStore((state) => state.value);
  const kreditSummeRaw = principal + nebenkosten - downPayment;
  const kreditSumme = kreditSummeRaw < 0 ? 0 : kreditSummeRaw;

  return (
    <div className="z-20 rounded-lg shadow backdrop-blur-2xl">
      <div className="p-5 md:p-8">
        <div className="flex justify-between">
          <p className="pb-2 text-xs">Kreditsumme</p>
          <div className="absolute right-4 top-2 h-10 w-10 rotate-180 self-center">
            <PieChartGesamtBetrag
              kreditSumme={kreditSumme}
              downPayment={downPayment}
              kaufSumme={principal}
            />
          </div>
        </div>
        <div
          className={`${kreditSumme >= 100000 ? "text-2xl" : "text-3xl"} text-end font-bold text-[var(--accent)] md:text-xl`}
        >
          € {kreditSumme.toLocaleString("de")}
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr] items-baseline gap-x-2 rounded-b-lg bg-[var(--light-accent)]/20 p-5 pt-2 md:p-8">
        <span className="text-(length:--text-2xs) text-[var(--dark-accent)]/90">Kaufpreis</span>
        <span className="text-end text-xs">
          {principal.toLocaleString("de")}
        </span>
        <span className="text-[var(--dark-accent)]/90 group relative flex items-center gap-x-2 text-start text-(length:--text-2xs) md:col-start-2 md:justify-start">
          Eigenkapital
          {nebenkosten > downPayment && (
            <>
              <Image
                src="/images/icons/icons8-warnung-emoji-48.png"
                alt="yellow warning icon with exclamation point"
                width={24}
                height={24}
              />
              <span className="invisible absolute left-28 w-60 rounded-lg bg-white p-4 text-xs text-[var(--accent)] shadow-lg group-hover:visible dark:bg-black">
                Eigenkapital deckt Nebenkosten nicht.
                <br />
                Könnte schwierig werden.
              </span>
            </>
          )}
        </span>
        <span className="text-end text-xs">
          -&nbsp;{downPayment.toLocaleString("de")}
        </span>
        <span className="text-[var(--dark-accent)]/90 self-center text-end text-(length:--text-2xs) md:text-start">
          Nebenkosten
        </span>
        <div className="text-end text-xs">
          +&nbsp;{nebenkosten.toLocaleString("de")}
        </div>
      </div>
    </div>
  );
}
