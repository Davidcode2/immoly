import ScenarioTextDisplay from "app/scenarioTextDisplay";
import BarChartInterestVsTilgung from "../barChartInterestVsTilgung";
import AttentionIcon from "/public/images/icons/attention_flaticon.png";
import Image from "next/image";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import { useEffect, useState } from "react";
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
    if (!index) {
      return 0;
    }
    try {
      const restSumme = table[index].remainingPrincipal;
      return restSumme;
    } catch (e) {
      return 0;
    }
  };

  useEffect(() => {
    setYears(table.length <= 10 ? 5 : 10);
  }, []);

  const makeYearsArray = () => {
    const maxYears = table.length;
    if (maxYears <= 5) {
      return [
        { year: 5, disabled: true },
        { year: 10, disabled: true },
        { year: 20, disabled: true },
      ];
    }
    if (maxYears <= 10) {
      return [
        { year: 5, disabled: false },
        { year: 10, disabled: true },
        { year: 20, disabled: true },
      ];
    }
    if (maxYears <= 15) {
      return [
        { year: 5, disabled: false },
        { year: 10, disabled: false },
        { year: 20, disabled: true },
      ];
    }
    if (maxYears <= 20) {
      return [
        { year: 5, disabled: false },
        { year: 10, disabled: false },
        { year: 15, disabled: false },
      ];
    }
    return [
      { year: 5, disabled: false },
      { year: 10, disabled: false },
      { year: 20, disabled: false },
    ];
  };
  const yearsArray = [5, 10, 20];

  const localSetYears = (entry: { year: number; disabled: boolean }) => {
    if (entry.disabled) {
      return;
    }
    setYears(entry.year);
  };

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
          {table.length <= 5 ? (
            <div>kürzeste Zinsbindung wählen.</div>
          ) : (
            <>
              <div>Restsumme nach {years} Jahren</div>
              <div className="text-5xl text-[var(--primary)]">
                {Math.round(restSummeAfter(years)).toLocaleString("de")}
              </div>
              <div>Zinsbindung</div>
              <div className="flex items-center gap-x-4">
                <div className="flex rounded-l-full rounded-r-full bg-[var(--accent)]">
                  {makeYearsArray().map(
                    (
                      entry: { year: number; disabled: boolean },
                      index: number,
                    ) => {
                      return (
                        <div
                          key={entry.year}
                          className={`${index === 0 && "rounded-l-full"} ${index === yearsArray.length - 1 && "rounded-r-full"} ${entry.disabled ? "bg-[var(--grey-accent)]" : "hover:bg-[var(--light-accent)]"} px-5 py-3`}
                          onClick={() => localSetYears(entry)}
                        >
                          {entry.year}&nbsp;Jahre
                        </div>
                      );
                    },
                  )}
                </div>
                <Image
                  src={EditIcon}
                  alt="Stift zum Bearbeiten"
                  className="opacity-70 transition-opacity hover:opacity-100 dark:invert"
                  width={24}
                  height={24}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
