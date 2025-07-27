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
      <XAxis
        dataKey="name"
        label={{ value: "Jahr", position: "insideBottomRight" }}
      />
      <YAxis
        tick={renderThousandIndicator}
        label={{ value: "€", position: "insideTopLeft" }}
      />
      <Tooltip content={customToolTip} />
      <CartesianGrid stroke="#3b3d40" />
      <Legend />
      <Line
        type="monotone"
        dataKey="Zins"
        stroke="#ff7300 "
        animationDuration={1000}
      />
      <Line
        type="monotone"
        dataKey="Tilgung"
        stroke="#387908"
        animationDuration={1000}
      />
      <Line
        type="monotone"
        dataKey="Sparen"
        stroke="#a87908"
        animationDuration={1000}
      />
    </LineChart>
  );
}
