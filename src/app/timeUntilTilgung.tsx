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
  return (
    <div className="sm:h-none flex overflow-clip rounded-lg p-5 shadow backdrop-blur-2xl md:mx-0 md:my-0 md:max-h-56 md:max-w-none md:p-8 md:text-start dark:shadow-[0_4px_50px_var(--dark-accent)]/20">
      <div>
        <Image
          className={`${paidAfter === -1 ? "block" : "hidden"} absolute top-0 left-12 opacity-20 md:top-12 md:left-28 dark:invert`}
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
        <div className="hidden h-20 w-40 md:block">
          {paidAfter !== -1 && (
            <BarChartInterestVsTilgung
              sumZinsen={sumZinsen}
              kreditSumme={kreditSumme}
              show={show}
            />
          )}
        </div>
      </div>
    </div>
  );
}
