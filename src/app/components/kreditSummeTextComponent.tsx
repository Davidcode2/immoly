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
    <div className="z-20 grid grid-cols-[40px_1fr] md:grid-cols-[20px_1fr_1fr] items-baseline gap-x-2 rounded-lg p-5 backdrop-blur-2xl md:p-8 shadow">
      <div className="w-4 h-full row-span-4">
        <LineChartGesamtBetrag kreditSumme={kreditSumme} downPayment={downPayment} kaufSumme={principal} />
      </div>
      <span className="hidden md:block text-end text-lg">{principal.toLocaleString("de")}</span>
      <span className="hidden md:block">Kaufpreis</span>
      <span className="text-end">+&nbsp;{nebenkosten.toLocaleString("de")}</span>
      <span className="text-xs text-end md:text-start">Nebenkosten</span>
      <span className="text-end">-&nbsp;{downPayment.toLocaleString("de")}</span>
      <span className="col-start-2 md:col-start-3 group relative items-center flex justify-end md:justify-start gap-x-2 text-xs text-end md:text-start">
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
      <div className="col-start-2 text-end text-3xl md:text-xl text-[var(--primary)">
        {kreditSumme.toLocaleString("de")}
      </div>
      <span className="col-start-2 md:col-start-3 text-end text-xs md:text-base md:text-start">Kreditsumme</span>
    </div>
  );
}
