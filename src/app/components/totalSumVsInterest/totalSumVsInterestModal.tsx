import ScenarioTextDisplay from "app/scenarioTextDisplay";
import BarChartInterestVsTilgung from "./barChartInterestVsTilgung";
import AttentionIcon from "/public/images/icons/attention_flaticon.png";
import Image from "next/image";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import { useEffect, useState } from "react";
import CloseButton from "../utilities/closeButton";

type PropTypes = {
  sumZinsen: number;
  totalSum: number;
  paidAfter: number;
  paidInYear: number;
  kreditSumme: number;
  show: boolean;
  setShow: (show: boolean) => void;
  table: ArmotizationEntry[];
};
export default function TotalSumVsInterestModal({
  sumZinsen,
  totalSum,
  paidAfter,
  paidInYear,
  kreditSumme,
  show,
  setShow,
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
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      console.debug(e);
      return 0;
    }
  };
  
  const paidOffAfterFiveYears = table.length <= 5;

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
    <div className="z-40 mx-4 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--background)]/50 to-[var(--primary)]/20 p-6 pb-10 shadow-2xl backdrop-blur-3xl md:mx-auto md:max-w-3xl md:backdrop-blur-xl lg:p-20">
      <CloseButton onClick={() => setShow(false)} />
      <div className="grid xl:grid-cols-2 gap-y-10">
        <div className="">
          <Image
            className={`${paidAfter === -1 ? "block" : "hidden"} absolute top-0 left-32 opacity-20 md:left-40 md:top-8 lg:left-50 lg:top-20 dark:invert`}
            src={AttentionIcon}
            height="100"
            width="100"
            alt="Achtung"
          />
          <ScenarioTextDisplay
            sumZinsen={sumZinsen}
            totalSum={totalSum}
            paidAfter={paidAfter}
            paidInYear={paidInYear}
            isModal={true}
          />
          <div className="hidden w-[180px] md:block">
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
          {paidOffAfterFiveYears ? (
            <div>Nach fünf Jahren bereits abgezahlt, daher kürzeste Zinsbindung wählen.</div>
          ) : (
            <>
              <div className="">Restsumme nach Ende der Zinsbindung</div>
              <div className="text-5xl">
                {Math.round(restSummeAfter(years)).toLocaleString("de")}
              </div>
            </>
          )}
          { !paidOffAfterFiveYears &&
          <div>bei einer Zinsbindung von {years} Jahren</div>
          }
          <div className="flex items-center gap-x-4">
            <div className="flex rounded-l-full rounded-r-full bg-[var(--secondary)]/90">
              {makeYearsArray().map(
                (entry: { year: number; disabled: boolean }, index: number) => {
                  return (
                    <div
                      key={entry.year}
                      className={`${index === 0 && "rounded-l-full"} dark:text-[var(--background)] ${index === yearsArray.length - 1 && "rounded-r-full"} ${entry.disabled ? "bg-[var(--grey-accent)] text-stone-600" : "hover:bg-[var(--secondary)]"} ${years === entry.year && "font-bold"} px-5 py-3 cursor-pointer`}
                      onClick={() => localSetYears(entry)}
                    >
                      {entry.year}&nbsp;Jahre
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
