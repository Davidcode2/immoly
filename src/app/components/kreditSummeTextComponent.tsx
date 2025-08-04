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
  const kreditSumme = principal + nebenkosten - downPayment;

  return (
    <div className="z-20 grid grid-cols-2 items-baseline gap-x-2 rounded-lg p-3 backdrop-blur-2xl md:p-8 md:shadow">
      <div className="absolute left-4 top-8">
        <LineChartGesamtBetrag kreditSumme={kreditSumme} downPayment={downPayment} kaufSumme={principal} />
      </div>
      <span className="text-end text-lg">{principal.toLocaleString("de")}</span>
      <span className="">Kaufpreis</span>
      <span className="text-end">+ {nebenkosten.toLocaleString("de")}</span>
      <span className="text-xs">Nebenkosten</span>
      <span className="text-end">- {downPayment.toLocaleString("de")}</span>
      <span className="group relative flex items-center gap-x-2 text-xs">
        Eigenkapital
        {nebenkosten > downPayment && (
          <>
            <Image
              src="/images/icons/icons8-warnung-emoji-48.png"
              alt="yellow warning icon with exclamation point"
              width={24}
              height={24}
            />
            <span className="invisible absolute left-28 w-60 rounded-lg bg-white p-4 text-base text-violet-400 shadow-lg group-hover:visible dark:bg-black">
              Eigenkapital deckt Nebenkosten nicht.
              <br />
              Könnte schwierig werden.
            </span>
          </>
        )}
      </span>
      <div className="text-end text-xl font-bold text-pink-500">
        {kreditSumme.toLocaleString("de")}
      </div>
      <span className="">Kreditsumme</span>
    </div>
  );
}
