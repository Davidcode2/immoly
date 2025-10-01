import ScenarioTextDisplay from "app/scenarioTextDisplay";
import BarChartInterestVsTilgung from "../barChartInterestVsTilgung";
import AttentionIcon from "/public/images/icons/attention_flaticon.png";
import Image from "next/image";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import { useState } from "react";
import EditIcon from "/public/images/icons/icons8-edit-48.png";

type PropTypes = {
  sumZinsen: number;
  totalSum: number;
  paidAfter: number;
  paidInYear: number;
  kreditSumme: number;
  show: boolean;
  table: ArmotizationEntry[];
};
export default function TotalSumVsInterestModal({
  sumZinsen,
  totalSum,
  paidAfter,
  paidInYear,
  kreditSumme,
  show,
  table,
}: PropTypes) {
  const [years, setYears] = useState(10);
  const restSummeAfter = (year: number) => {
    const index = table.findIndex((x) => x.year === year);
    const restSumme = table[index].remainingPrincipal;
    return restSumme;
  };

  const yearsArray = [5, 10, 15];

  return (
    <div className="z-40 mx-4 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--background)]/50 to-[var(--primary)]/20 p-20 shadow-2xl backdrop-blur-3xl md:mx-auto md:max-w-3xl md:backdrop-blur-xl">
      <div className="grid xl:grid-cols-2">
        <div className="">
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
        <div className="flex flex-col gap-y-4">
          <div>Restsumme nach {years} Jahren</div>
          <div className="text-5xl text-[var(--primary)]">
            {Math.round(restSummeAfter(years)).toLocaleString("de")}
          </div>
          <div>Zinsbindung</div>
          <div className="flex items-center gap-x-4">
            <div className="flex rounded-l-full rounded-r-full bg-[var(--accent)]">
              {yearsArray.map((year: number, index: number) => {
                return (
                  <div
                    key={year}
                    className={`${index === 0 && "rounded-l-full"} ${index === yearsArray.length - 1 && "rounded-r-full"} px-5 py-3 hover:bg-[var(--light-accent)]`}
                    onClick={() => setYears(year)}
                  >
                    {year}&nbsp;Jahre
                  </div>
                );
              })}
            </div>
            <Image
              src={EditIcon}
              alt="Stift zum Bearbeiten"
              className="dark:invert hover:opacity-100 opacity-70 transition-opacity"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
