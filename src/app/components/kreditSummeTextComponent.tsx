import NebenkostenCalculator from "app/services/nebenkostenCalculationService";

type PropTypes = {
  principal: number;
  downPayment: number;
};
export default function KreditSummeTextComponent({ principal, downPayment}: PropTypes) {

  const nebenkosten = new NebenkostenCalculator(principal).calcSumme()
  const kreditSumme = ((principal + nebenkosten) - downPayment)

  return (
    <div>
      <div>
        +{" "}
        { nebenkosten.toLocaleString("de")}
      </div>
      <span className="relative -top-2 text-xs">Nebenkosten</span>
      <div className="text-xl font-bold text-pink-500">
        {kreditSumme.toLocaleString("de")}
      </div>
      <span className="relative -top-2 text-xs">Kreditsumme</span>
    </div>
  );
}
