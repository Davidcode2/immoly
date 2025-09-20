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
import { calcWidth, screenWidthMobile } from "app/utils/screenWidth";
import { customToolTip, renderLegend, renderThousandIndicator } from "./chartHelper";
import { onThemeChangeColorUpdate } from "app/services/onThemeChangeColorUpdate";

interface ChartDataItem {
  name: string;
  Zins: number;
  Tilgung: number;
  Sparen: number;
}

export default function PlotlyChart({
  data,
  rent,
}: {
  data: ArmotizationEntry[];
  rent: number;
}) {
  const [debouncedChartData, setDebouncedChartData] = useState<
    ChartDataItem[] | null
  >(null);
  const [gridColor, setGridColor] = useState<string>("hsl(10, 10%, 10%)");
  const [labelColor, setLabelColor] = useState<string>("hsl(200, 80%, 10%)");


  useEffect(() => {
    const observerLabels = onThemeChangeColorUpdate(
      setLabelColor,
      "hsl(200, 80%, 10%)",
      "hsl(172, 15%, 35%)",
    );
    const observerGrid = onThemeChangeColorUpdate(
      setGridColor,
      "hsl(10, 10%, 80%)",
      "hsl(10, 10%, 10%)",
    );
    return () => {
      observerLabels.disconnect();
      observerGrid.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!data) {
      setDebouncedChartData(null);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filteredData = data.filter(
        (x: ArmotizationEntry) => x.year !== data.length,
      );
      const transformedData: ChartDataItem[] = filteredData.map(
        (x: ArmotizationEntry) => {
          return {
            name: x.year.toString(),
            Zins: Math.floor(x.interest),
            Tilgung: Math.floor(x.principal),
            Sparen: Math.floor(x.yearlyRate - rent * 12),
          };
        },
      );
      setDebouncedChartData(transformedData);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [data]);

  const zinsLineColor = "var(--light-accent)";
  const tilgungLineColor = "var(--accent)";


  if (!debouncedChartData) {
    return null;
  }

  return (
    <LineChart
      className="grid justify-stretch"
      width={calcWidth()}
      height={screenWidthMobile() ? 400 : 300}
      data={debouncedChartData}
      margin={{
        top: 30,
        right: 0,
        left: 10,
        bottom: 15,
      }}
    >
      <XAxis
        dataKey="name"
        minTickGap={50}
        axisLine={false}
        tick={{ fill: labelColor, fontSize: 12, dy: 5 }}
        tickLine={false}
        label={{ value: "Jahr", position: "insideBottomRight", dy: 20, dx: 4 }}
      />
      <YAxis
        tick={(props) => renderThousandIndicator({ ...props, labelColor })}
        tickCount={4}
        axisLine={false}
        tickLine={false}
        label={{ value: "EUR", position: "insideTopLeft", dx: -16, dy: -4 }}
      />
      <Tooltip content={customToolTip} />
      <Legend content={renderLegend} />
      <CartesianGrid
        vertical={false}
        stroke={gridColor}
        strokeDasharray="3 3"
      />
      <Line
        type="monotone"
        dataKey="Zins"
        stroke={zinsLineColor}
        animationDuration={1000}
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="Tilgung"
        stroke={tilgungLineColor}
        animationDuration={1000}
        dot={false}
      />
    </LineChart>
  );
}
