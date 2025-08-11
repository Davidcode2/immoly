import ScenarioTextDisplay from "./scenarioTextDisplay";
import BarChartInterestVsTilgung from "./components/barChartInterestVsTilgung";

type PropTypes = {
  sumZinsen: number;
  totalSum: number;
  paidAfter: number;
  paidInYear: number;
  kreditSumme: number;
};
export default function Scenario({
  sumZinsen,
  totalSum,
  paidAfter,
  paidInYear,
  kreditSumme,
}: PropTypes) {
  return (
    <div className="sm:h-none flex max-h-42 rounded-lg p-5 shadow backdrop-blur-2xl md:mx-0 md:my-0 md:max-h-56 md:max-w-none md:p-8 md:text-start">
      <div>
        <ScenarioTextDisplay
          sumZinsen={sumZinsen}
          totalSum={totalSum}
          paidAfter={paidAfter}
          paidInYear={paidInYear}
        />
        <BarChartInterestVsTilgung
          sumZinsen={sumZinsen}
          kreditSumme={kreditSumme}
          show={screen.width >= 768}
        />
      </div>
    </div>
  );
}
