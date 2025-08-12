import NebenkostenCalculator from "app/services/nebenkostenCalculationService";
import Image from "next/image";
import LineChartGesamtBetrag from "./lineChartGesamtbetrag";

type PropTypes = {
  principal: number;
  downPayment: number;
};
export default function KreditSummeTextComponent({
  principal,
  downPayment,
}: PropTypes) {
  const nebenkosten = new NebenkostenCalculator(principal).calcSumme();
  const kreditSummeRaw = principal + nebenkosten - downPayment;
  const kreditSumme = kreditSummeRaw < 0 ? 0 : kreditSummeRaw;

  return (
    <div className="z-20 grid grid-cols-[2px_1fr] items-baseline gap-x-2 rounded-lg p-5 shadow backdrop-blur-2xl md:grid-cols-[20px_1fr_1fr] md:p-8">
      <div className="row-span-4 h-full w-4">
        <LineChartGesamtBetrag
          kreditSumme={kreditSumme}
          downPayment={downPayment}
          kaufSumme={principal}
        />
      </div>
      <span className="hidden text-end text-lg md:block">
        {principal.toLocaleString("de")}
      </span>
      <span className="hidden md:block">Kaufpreis</span>
      <span className="text-end">
        +&nbsp;{nebenkosten.toLocaleString("de")}
      </span>
      <span className="text-end text-xs md:text-start">Nebenkosten</span>
      <span className="text-end">
        -&nbsp;{downPayment.toLocaleString("de")}
      </span>
      <span className="group relative col-start-2 flex items-center justify-end gap-x-2 text-end text-xs md:col-start-3 md:justify-start md:text-start">
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
      <div className={`${kreditSumme >= 100000 ? "text-2xl" : "text-3xl"} col-start-2 text-end font-bold text-[var(--accent)] md:text-xl`}>
        {kreditSumme.toLocaleString("de")}
      </div>
      <span className="col-start-2 text-end text-xs md:col-start-3 md:text-start md:text-base">
        Kreditsumme
      </span>
    </div>
  );
}
