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
  const [data, setData] = useState<ArmotizationEntry[] | null>(null);
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
      setData(tilgungungsTabelle);
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
          setData(tilgungungsTabelle);
        } catch (e) {
          console.error(e);
        }
      }
    }

    loadData();
  }, [calculationId]);

  return (
    <div className="grid md:grid-cols-[1fr_5fr] md:gap-x-4 md:gap-y-16">
      <div className="p-4 md:p-8 bg-gradient-to-tl from-purple-800/30 to-neutral-900/70 shadow border border-purple-500/30 backdrop-blur-2xl rounded-lg">
        <Image
          src="/immoly_logo_square_transparent_text.webp"
          width={200}
          height={10}
          alt="Logo"
          className="mx-auto md:mb-16"
        />
        <div className="md:hidden mx-auto p-4 ">
          <IconsHeader />
        </div>
        <div className="font-bold text-center p-4 mb-10">
          Die Plattform für Immobilienkredite. Kalkulieren Sie was möglich ist.
        </div>
        <FinanzierungsForm values={formValues} setInput={setInput} />
      </div>
      <div className="grid">
        <NoData data={data} />
        {data && (
          <>
            <div className="grid md:grid-cols-2">
              <Scenario calculationId={selectedScenario} data={data} />
              <div className="hidden md:block ml-auto">
                <IconsHeader />
              </div>
            </div>
            <div className="md:gap-4 gap-y-20 grid xl:grid-cols-[3fr_2fr]">
              <TilgungstabelleContainer
                data={data}
                calculationId={calculationId}
                input={input}
                setData={setData}
              />
              <div className="xl:col-start-2">
                {input && (
                  <div className="grid md:gap-4 gap-y-20">
                    <div className="grid justify-around min-h-[300px] border backdrop-blur-sm border-slate-600 rounded-lg">
                      <PlotlyChart data={data} rent={input.rent} />
                    </div>
                    <div className="grid justify-around min-h-[300px] border border-slate-600 backdrop-blur-sm rounded-lg">
                      <DevelopmentChart
                        data={data}
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
