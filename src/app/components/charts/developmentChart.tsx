import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import ChartDataItem from "app/lib/models/ChartDataItem";
import InterestEarnedModel from "app/lib/models/interestEarnedModel";
import {
  customToolTip,
  renderLegend,
  renderThousandIndicator,
} from "./chartHelper";
import { useThemeColorUpdates } from "app/hooks/useThemeColorUpdates";

export default function DevelopmentChart({
  tilgungsTabelle,
  rent,
  interest = 4,
  timeoutAmount = 1000,
}: {
  tilgungsTabelle: ArmotizationEntry[];
  rent: number;
  interest: number;
  timeoutAmount?: number;
}) {
  const [debouncedChartData, setDebouncedChartData] = useState<
    ChartDataItem[] | null
  >(null);
  const [gridColor, setGridColor] = useState<string>("hsl(10, 10%, 10%)");
  const [labelColor, setLabelColor] = useState<string>("hsl(200, 80%, 10%)");
  const sparenLineColor = "var(--light-accent)";
  const tilgungLineColor = "var(--accent)";

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

  useThemeColorUpdates([
    [setLabelColor, "var(--grey-accent)", "var(--grey-accent)"],
    [setGridColor, "var(--grey-accent)", "var(--grey-accent)"],
  ]);

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
    }, timeoutAmount);

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
    <ResponsiveContainer>
      <LineChart
        data={debouncedChartData}
        margin={{
          top: 30,
          right: 0,
          left: 10,
          bottom: 15,
        }}
      >
        <Legend content={renderLegend} />
        <XAxis
          dataKey="name"
          minTickGap={50}
          axisLine={false}
          tick={{ fill: labelColor, fontSize: 12, dy: 5 }}
          tickLine={false}
          label={{
            value: "Jahr",
            position: "insideBottomRight",
            dy: 20,
            dx: 4,
          }}
        />
        <YAxis
          tick={(props) => renderThousandIndicator({ ...props, labelColor })}
          label={{
            value: "EUR",
            position: "insideTopLeft",
            dx: -16,
            dy: -4,
            fontSize: 12,
          }}
          tickCount={4}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={customToolTip} />
        <CartesianGrid
          vertical={false}
          stroke={gridColor}
          strokeDasharray="3 3"
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="Sparen"
          stroke={sparenLineColor}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Tilgung"
          stroke={tilgungLineColor}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
