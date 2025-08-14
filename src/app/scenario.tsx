import ScenarioTextDisplay from "./scenarioTextDisplay";
import AttentionIcon from "/public/images/icons/attention_flaticon.png";
import BarChartInterestVsTilgung from "./components/barChartInterestVsTilgung";
import Image from "next/image";

type PropTypes = {
  sumZinsen: number;
  totalSum: number;
  paidAfter: number;
  paidInYear: number;
  kreditSumme: number;
};
export default function TimeUntilTilgung({
  sumZinsen,
  totalSum,
  paidAfter,
  paidInYear,
  kreditSumme,
}: PropTypes) {
  const show = window.innerWidth >= 768;
  console.log("show in scenario: ", show);
  return (
    <div className="sm:h-none overflow-clip flex max-h-48 rounded-lg p-5 shadow backdrop-blur-2xl md:mx-0 md:my-0 md:max-h-56 md:max-w-none md:p-8 md:text-start">
      <div>
        <Image
          className={`${paidAfter === -1 ? "block" : "hidden"} opacity-20 absolute md:top-12 md:left-28 left-12`}
          src={AttentionIcon}
          height="200"
          width="200"
          alt="Achtung"
        />
        <ScenarioTextDisplay
          sumZinsen={sumZinsen}
          totalSum={totalSum}
          paidAfter={paidAfter}
          paidInYear={paidInYear}
        />
        <BarChartInterestVsTilgung
          sumZinsen={sumZinsen}
          kreditSumme={kreditSumme}
          show={show}
        />
      </div>
    </div>
  );
}
