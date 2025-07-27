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
import { calcWidth, screenWidthMobile } from "./utils/screenWidth";

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

  useEffect(() => {
    if (!data) {
      setDebouncedChartData(null);
      return;
    }

    const timeoutId = setTimeout(() => {
      console.log("Debounce timeout fired! Updating chart data...");
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
    }, 1000);

    return () => {
      console.log("Clearing previous debounce timer...");
      clearTimeout(timeoutId);
    };
  }, [data]);

  if (!debouncedChartData) {
    return null;
  }

  return (
    <LineChart
      className="grid justify-stretch"
      width={calcWidth()}
      height={screenWidthMobile() ? 200 : 300}
      data={debouncedChartData}
    >
      <XAxis dataKey="name" />
      <Tooltip />
      <CartesianGrid stroke="#3b3d40" />
      <Legend />
      <Line type="monotone" dataKey="Zins" stroke="#ff7300" />
      <Line type="monotone" dataKey="Tilgung" stroke="#387908" />
      <Line type="monotone" dataKey="Sparen" stroke="#a87908" />
    </LineChart>
  );
}
