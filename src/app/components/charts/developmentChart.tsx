import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import ChartDataItem from "app/lib/models/ChartDataItem";
import InterestEarnedModel from "app/lib/models/interestEarnedModel";
import { calcWidth, screenWidthMobile } from "app/utils/screenWidth";
import { customToolTip, renderThousandIndicator } from "./chartHelper";
import { onThemeChangeColorUpdate } from "app/services/onThemeChangeColorUpdate";

export default function DevelopmentChart({
  tilgungsTabelle,
  rent,
  interest = 4,
}: {
  tilgungsTabelle: ArmotizationEntry[];
  rent: number;
  interest: number;
}) {
  const [debouncedChartData, setDebouncedChartData] = useState<
    ChartDataItem[] | null
  >(null);
  const [gridColor, setGridColor] = useState<string>("hsl(10, 10%, 10%)");

  const calcInterest = () => {
    const interestCalculations = tilgungsTabelle.reduce(
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

  const calcTilgung = () => {
    return tilgungsTabelle.reduce(
      (acc: { year: number; tilgung: number }[], x) => {
        if (acc.length === 0) {
          acc.push({ year: x.year, tilgung: x.principal });
        } else {
          acc.push({
            year: x.year,
            tilgung: acc[acc.length - 1].tilgung + x.principal,
          });
        }
        return acc;
      },
      [],
    );
  };

  useEffect(() => {
    const observer = onThemeChangeColorUpdate(
      setGridColor,
      "hsl(10, 10%, 80%)",
      "hsl(10, 10%, 10%)",
    );
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!tilgungsTabelle) {
      setDebouncedChartData(null);
      return;
    }

    const interestRes = calcInterest();
    const accumulatedTilgung = calcTilgung();

    const timeoutId = setTimeout(() => {
      const transformedData: ChartDataItem[] = tilgungsTabelle.map(
        (x: ArmotizationEntry) => {
          return {
            name: x.year.toString(),
            Sparen: Math.floor(
              interestRes.find(
                (item: InterestEarnedModel) => item.year === x.year,
              )?.endBalance || 0,
            ),
            Tilgung: Math.floor(
              accumulatedTilgung.find((y) => y.year === x.year)!.tilgung,
            ),
          };
        },
      );
      setDebouncedChartData(transformedData);
    }, 1000);

    // Cleanup function: This runs if 'data' changes before the timeout,
    // or when the component unmounts. It clears the previous timeout.
    return () => {
      clearTimeout(timeoutId);
    };
  }, [tilgungsTabelle]);

  if (!debouncedChartData) {
    return null;
  }

  return (
    <LineChart
      width={calcWidth()}
      height={screenWidthMobile() ? 200 : 300}
      data={debouncedChartData}
    >
      <XAxis
        dataKey="name"
        label={{ value: "Jahr", position: "insideBottomRight" }}
      />
      <YAxis
        tick={renderThousandIndicator}
        label={{ value: "€", position: "insideTopLeft" }}
      />
      <Tooltip content={customToolTip} />
      <CartesianGrid stroke={gridColor} />
      <Legend />
      <Line type="monotone" dataKey="Sparen" stroke="#a87908" dot={false} />
      <Line type="monotone" dataKey="Tilgung" stroke="#2d7d15" dot={false} />
    </LineChart>
  );
}
