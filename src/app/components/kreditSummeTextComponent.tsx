import NebenkostenCalculator from "app/services/nebenkostenCalculationService";
import Image from "next/image";

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
    <div className="grid grid-cols-2 items-baseline gap-x-2 rounded-lg px-6 pt-6 shadow backdrop-blur-2xl z-20">
      <span className="text-end text-lg">{principal.toLocaleString("de")}</span>
      <span className="">Kaufpreis</span>
      <span className="text-end">+ {nebenkosten.toLocaleString("de")}</span>
      <span className="text-xs">Nebenkosten</span>
      <span className="text-end">- {downPayment.toLocaleString("de")}</span>
      <span className="group flex items-center gap-x-2 text-xs relative">
        Eigenkapital
        {nebenkosten > downPayment && (
          <>
            <Image
              src="/images/icons/icons8-warnung-emoji-48.png"
              alt="yellow warning icon with exclamation point"
              width={24}
              height={24}
            />
            <span className="bg-white dark:bg-black left-28 w-60 p-4 rounded-lg shadow-lg absolute opacity-0 text-base text-violet-400 group-hover:opacity-100">
              Eigenkapital deckt Nebenkosten nicht.<br/>
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
