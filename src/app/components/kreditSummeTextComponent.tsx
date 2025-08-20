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
    <div className="z-20 max-h-56 rounded-lg bg-[var(--light-accent)]/10 shadow backdrop-blur-2xl">
      <div className="bg-[var(--background)] p-5 pb-3 md:p-8 md:pb-8">
        <p className="text-xs">Kreditsumme</p>
        <div className="flex items-center justify-between">
          <div
            className={`${kreditSumme >= 10000000 ? "text-xl md:text-2xl" : kreditSumme >= 1000000 ? "text-2xl md:text-3xl" : kreditSumme >= 100000 ? "text-(length:--text-2_5xl) md:text-4xl" : "text-3xl md:text-4xl"} h-12 flex items-center text-[var(--accent)]`}
          >
            <div>{Math.round(kreditSumme).toLocaleString("de")}</div>
          </div>
          <div className="h-10 w-10 rotate-180 self-center relative left-1">
            <PieChartGesamtBetrag
              kreditSumme={kreditSumme}
              downPayment={downPayment}
              kaufSumme={principal}
            />
          </div>
        </div>
      </div>
      <div className="grid h-fit grid-cols-[1fr_1fr] items-baseline gap-x-2 rounded-b-lg p-5 pt-2 md:p-8 md:pt-4">
        <span className="text-(length:--text-2xs) text-[var(--dark-accent)]/90">
          Kaufpreis
        </span>
        <span className="text-end text-xs">
          {principal.toLocaleString("de")}
        </span>
        <span className="group relative flex items-center gap-x-2 text-start text-(length:--text-2xs) text-[var(--dark-accent)]/90">
          Eigenkapital
          {nebenkosten > downPayment && (
            <>
              <Image
                className="absolute left-18 md:static"
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
        <span className="text-end text-[var(--strong-accent)] text-xs">
          -&nbsp;{downPayment.toLocaleString("de")}
        </span>
        <span className="self-center text-(length:--text-2xs) text-[var(--dark-accent)]/90">
          Nebenkosten
        </span>
        <div className="text-end text-xs text-[var(--dark-accent)]/80">
          +&nbsp;{nebenkosten.toLocaleString("de")}
        </div>
      </div>
    </div>
  );
}
