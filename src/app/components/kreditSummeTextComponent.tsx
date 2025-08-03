import NebenkostenCalculator from "app/services/nebenkostenCalculationService";

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
    <div className="grid grid-cols-2 items-baseline gap-x-2 rounded-lg px-6 pt-6 shadow backdrop-blur-2xl">
      <span className="text-end text-lg">{principal.toLocaleString("de")}</span>
      <span className="">Kaufpreis</span>
      <span className="text-end">+ {nebenkosten.toLocaleString("de")}</span>
      <span className="text-xs">Nebenkosten</span>
      <span className="text-end">- {downPayment.toLocaleString("de")}</span>
      <span className="text-xs">Eigenkapital</span>
      {nebenkosten > downPayment && (
        <span className="col-span-2 text-center -mt-2 text-xs text-red-500">
          Eigenkapital deckt Nebenkosten nicht.<br/>Könnte schwierig werden.
        </span>
      )}
      <div className="text-end text-xl font-bold text-pink-500">
        {kreditSumme.toLocaleString("de")}
      </div>
      <span className="">Kreditsumme</span>
    </div>
  );
}
