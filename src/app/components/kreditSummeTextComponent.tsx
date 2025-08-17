import NebenkostenCalculator from "app/services/nebenkostenCalculationService";
import Image from "next/image";
import PieChartGesamtBetrag from "./lineChartGesamtbetrag";
import { useStore } from "app/store";

type PropTypes = {
  principal: number;
  downPayment: number;
};
export default function KreditSummeTextComponent({
  principal,
  downPayment,
}: PropTypes) {
  let nebenkosten = new NebenkostenCalculator(principal).calcSumme();
  nebenkosten = useStore((state) => state.nebenkosten)
  const kreditSummeRaw = principal + nebenkosten - downPayment;
  const kreditSumme = kreditSummeRaw < 0 ? 0 : kreditSummeRaw;

  return (
    <div className="z-20 rounded-lg p-5 shadow backdrop-blur-2xl md:p-8">
      <div className="grid md:grid-cols-[1fr_1fr] items-baseline md:gap-2">
        <span className="hidden text-end text-lg md:block">
          {principal.toLocaleString("de")}
        </span>
        <span className="hidden md:block">Kaufpreis</span>
        <span className="flex justify-end gap-x-2 md:max-h-6 text-center grow-0">
          <div className="h-10 w-10 self-center -rotate-22">
            <PieChartGesamtBetrag
              kreditSumme={kreditSumme}
              downPayment={downPayment}
              kaufSumme={principal}
            />
          </div>
          <div>
            <div className="self-center">+&nbsp;{nebenkosten.toLocaleString("de")}</div>
            <span className="text-end text-xs md:hidden self-center md:text-start">Nebenkosten</span>
          </div>
        </span>
        <span className="text-end text-xs hidden md:block self-center md:text-start">Nebenkosten</span>
        <span className="text-end">
          -&nbsp;{downPayment.toLocaleString("de")}
        </span>
        <span className="group relative flex items-center justify-end gap-x-2 text-end text-xs md:col-start-2 md:justify-start md:text-start">
          Eigenkapital
          {nebenkosten > downPayment && (
            <>
              <Image
                src="/images/icons/icons8-warnung-emoji-48.png"
                alt="yellow warning icon with exclamation point"
                width={24}
                height={24}
              />
              <span className="invisible absolute left-28 w-60 rounded-lg bg-white p-4 text-base text-[var(--accent)] shadow-lg group-hover:visible dark:bg-black">
                Eigenkapital deckt Nebenkosten nicht.
                <br />
                Könnte schwierig werden.
              </span>
            </>
          )}
        </span>
        <div
          className={`${kreditSumme >= 100000 ? "text-2xl" : "text-3xl"} text-end font-bold text-[var(--accent)] md:text-xl`}
        >
          {kreditSumme.toLocaleString("de")}
        </div>
        <span className="text-end text-xs md:col-start-2 md:text-start md:text-base">
          Kreditsumme
        </span>
      </div>
    </div>
  );
}
