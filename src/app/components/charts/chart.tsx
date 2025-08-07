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
import { customToolTip, renderThousandIndicator } from "./chartHelper";
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
  const [horizontalTickNumber, setHorizontalTickNumber] = useState<number>(5);

  useEffect(() => {
    const observer = onThemeChangeColorUpdate(
      setGridColor,
      "hsl(10, 10%, 80%)",
      "hsl(10, 10%, 10%)",
    );
    return () => observer.disconnect();
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

  useEffect(() => {
    if (!debouncedChartData) {
      setHorizontalTickNumber(4);
      return;
    }
    setHorizontalTickNumber(Math.round(debouncedChartData.length / 4));
  }, [debouncedChartData]);

  if (!debouncedChartData) {
    return null;
  }

  return (
    <LineChart
      className="grid justify-stretch"
      width={calcWidth()}
      height={screenWidthMobile() ? 200 : 300}
      data={debouncedChartData}
      margin={{
        top: 30,
        right: 0,
        left: 0,
        bottom: 15,
      }}
    >
      <XAxis
        dataKey="name"
        label={{ value: "Jahr", position: "insideBottomRight" }}
        minTickGap={50}
      />
      <YAxis
        tick={renderThousandIndicator}
        tickCount={4}
        label={{ value: "€", position: "insideTopLeft" }}
      />
      <Tooltip content={customToolTip} />
      <Legend />
      <CartesianGrid
        vertical={false}
        stroke={gridColor}
        strokeDasharray="3 3"
      />
      <Line
        type="monotone"
        dataKey="Zins"
        stroke="hsl(195, 37%, 40%)"
        animationDuration={1000}
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="Tilgung"
        stroke="hsl(194, 33%, 18%)"
        animationDuration={1000}
        dot={false}
      />
    </LineChart>
  );
}
