import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
} from "recharts";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import ChartDataItem from "./lib/models/ChartDataItem";
import InterestEarnedModel from "./lib/models/interestEarnedModel";
import { calcWidth, screenWidthMobile } from "./utils/screenWidth";

export default function DevelopmentChart({
  data,
  rent,
  interest = 4,
}: {
  data: ArmotizationEntry[];
  rent: number;
  interest: number;
}) {
  const [debouncedChartData, setDebouncedChartData] = useState<
    ChartDataItem[] | null
  >(null);

  const calcInterest = () => {
    const interestCalculations = data.reduce(
      (acc: InterestEarnedModel[], currentYearData: ArmotizationEntry) => {
        const previousYearBalance =
          acc.length > 0 ? acc[acc.length - 1].endBalance : 0;
        const annualSavings = currentYearData.yearlyRate - rent * 12;

        const balanceBeforeInterest = previousYearBalance + annualSavings;
        const endBalance = balanceBeforeInterest * (1 + interest / 100);
        const interestEarnedThisYear = endBalance - balanceBeforeInterest;

        const yearResult: InterestEarnedModel = {
          year: currentYearData.year,
          startBalance: previousYearBalance,
          annualSavings: annualSavings,
          interestEarned: interestEarnedThisYear,
          endBalance: endBalance,
        };

        acc.push(yearResult);
        return acc;
      },
      [],
    );
    return interestCalculations;
  };

  useEffect(() => {
    if (!data) {
      setDebouncedChartData(null);
      return;
    }

    const interestRes = calcInterest();

    const timeoutId = setTimeout(() => {
      console.log("Debounce timeout fired! Updating chart data...");
      const validEntries = data.filter(
        (x: ArmotizationEntry) => x.year !== data.length,
      );
      const transformedData: ChartDataItem[] = validEntries.map(
        (x: ArmotizationEntry) => {
          return {
            name: x.year.toString(),
            Sparen: Math.floor(
              interestRes.find(
                (item: InterestEarnedModel) => item.year === x.year,
              )?.endBalance || 0,
            ),
            Tilgung: Math.floor(x.principal * x.year),
          };
        },
      );
      setDebouncedChartData(transformedData);
    }, 1000);

    // Cleanup function: This runs if 'data' changes before the timeout,
    // or when the component unmounts. It clears the previous timeout.
    return () => {
      console.log("Clearing previous debounce timer...");
      clearTimeout(timeoutId);
    };
  }, [data]);

  if (!debouncedChartData) {
    return null;
  }

  return (
    <LineChart width={calcWidth()} height={screenWidthMobile() ? 200 : 300} data={debouncedChartData}>
      <XAxis dataKey="name" />
      <Tooltip />
      <CartesianGrid stroke="#3b3d40" />
      <Legend />
      <Line type="monotone" dataKey="Sparen" stroke="#a87908" />
      <Line type="monotone" dataKey="Tilgung" stroke="#2d7d15" />
    </LineChart>
  );
}
