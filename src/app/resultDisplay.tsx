"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCalculation } from "./lib/getCalculations";
import calcTilgung from "./lib/calculateArmotizaztionTable";
import FinanzierungsForm from "./finanzierungsForm";
import Scenario from "./scenario";
import PlotlyChart from "./chart";
import DevelopmentChart from "./developmentChart";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import CalculationResult from "./lib/models/CalculationResult";
import CashRoiModel from "./lib/models/cashRoiModel";
import Image from "next/image";
import IconsHeader from "./components/iconsHeader";
import NoData from "./components/noData";
import TilgungstabelleContainer from "./components/tilgungstabelleContainer";

export default function ResultDisplay() {
  const [table, setTable] = useState<ArmotizationEntry[] | null>(null);
  const [input, setInput] = useState<CashRoiModel | null>(null);
  const [formValues, setFormValues] = useState<CalculationResult[] | null>(
    null,
  );
  const [selectedScenario, setSelectedScenario] = useState<string | null>("18");

  const searchParams = useSearchParams();
  const calculationId = searchParams.get("calculationId");

  useEffect(() => {
    async function loadData() {
      if (!input) {
        return;
      }

      const tilgungungsTabelle = calcTilgung(input);
      setTable(tilgungungsTabelle);
    }
    loadData();
  }, [input]);

  useEffect(() => {
    setSelectedScenario(
      calculationId ? (Number(calculationId) - 1).toString() : "19",
    );
    async function loadData() {
      console.log("Loading data for calculationId:", calculationId);
      if (calculationId) {
        try {
          const result = await getCalculation(calculationId);
          if (!result) {
            return;
          }
          setFormValues(result);
          setInput(result[0]);
          const tilgungungsTabelle = calcTilgung(result[0]);
          setTable(tilgungungsTabelle);
        } catch (e) {
          console.error(e);
        }
      }
    }

    loadData();
  }, [calculationId]);

  const thinOutGraphDataPoints = (data: ArmotizationEntry[]) => {
    return data.length > 25
      ? data.filter((x: ArmotizationEntry) => data.indexOf(x) % 2)
      : data;
  };

  return (
    <div className="grid pt-3 px-3 md:grid-cols-[1fr_5fr] md:gap-x-4 md:gap-y-16">
      <div className="rounded-lg border border-purple-500/30 bg-gradient-to-tl from-purple-800/30 to-neutral-900/70 p-4 shadow backdrop-blur-2xl md:p-8">
        <Image
          src="/immoly_logo_square_transparent_text.webp"
          width={200}
          height={10}
          alt="Logo"
          className="mx-auto md:mb-16"
        />
        <div className="mx-auto p-4 md:hidden">
          <IconsHeader />
        </div>
        <div className="mb-10 p-4 text-center font-bold md:hidden">
          Die Plattform für Immobilienkredite. Kalkulieren Sie was möglich ist.
        </div>
        <FinanzierungsForm values={formValues} setInput={setInput} />
      </div>
      <div className="grid">
        {!table && <NoData />}
        {table && (
          <>
            <div className="grid md:grid-cols-2">
              <Scenario calculationId={selectedScenario} data={table} />
              <div className="ml-auto hidden md:block">
                <IconsHeader />
              </div>
            </div>
            <div className="grid gap-y-20 md:gap-4 xl:grid-cols-[3fr_2fr]">
              <TilgungstabelleContainer
                table={table}
                calculationId={calculationId}
                input={input}
                setTable={setTable}
              />
              <div className="xl:col-start-2">
                {input && (
                  <div className="grid gap-y-20 md:gap-4">
                    <div className="grid min-h-[300px] justify-around rounded-lg border border-slate-600 bg-neutral-950/10 shadow-lg backdrop-blur-lg">
                      <PlotlyChart
                        data={thinOutGraphDataPoints(table)}
                        rent={input.rent}
                      />
                    </div>
                    <div className="grid min-h-[300px] justify-around rounded-lg border border-slate-600 bg-neutral-950/10 shadow-lg backdrop-blur-lg">
                      <DevelopmentChart
                        data={thinOutGraphDataPoints(table)}
                        rent={input.rent}
                        interest={input.cash_roi || 0}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
