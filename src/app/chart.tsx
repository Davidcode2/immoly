import React, { useState, useEffect } from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from 'recharts';
import ArmotizationEntry from './lib/models/ArmotizationEntry';

// Define the shape of your chart data for better type safety
interface ChartDataItem {
  name: string;
  Zins: number;
  Tilgung: number;
  Sparen: number;
}

export default function PlotlyChart({ data, rent }: { data: ArmotizationEntry[], rent: number }) {
  const [debouncedChartData, setDebouncedChartData] = useState<ChartDataItem[] | null>(null);

  useEffect(() => {
    // If there's no incoming data, clear the debounced data and return
    if (!data) {
      setDebouncedChartData(null);
      return;
    }

    // Set a timeout to transform and update the chart data
    const timeoutId = setTimeout(() => {
      console.log('Debounce timeout fired! Updating chart data...');
      const transformedData: ChartDataItem[] = data.map((x: ArmotizationEntry) => {
        if (x.year !== data.length) {
          return {
            name: x.year.toString(),
            Zins: Math.floor(x.interest),
            Tilgung: Math.floor(x.principal),
            Sparen: Math.floor(x.yearlyRate - (rent * 12)),
          }
        }
      });
      setDebouncedChartData(transformedData); // Update the state
    }, 1000); // 1500ms debounce time

    // Cleanup function: This runs if 'data' changes before the timeout,
    // or when the component unmounts. It clears the previous timeout.
    return () => {
      console.log('Clearing previous debounce timer...');
      clearTimeout(timeoutId);
    };
  }, [data]); // The effect re-runs whenever the 'data' prop changes

  // Render null if no debounced data is available yet
  if (!debouncedChartData) {
    return null;
  }

  return (
    <LineChart width={400} height={300} data={debouncedChartData}>
      <XAxis dataKey="name" />
      <Tooltip />
      <CartesianGrid stroke="#27232b" />
      <Line type="monotone" dataKey="Zins" stroke="#ff7300" />
      <Line type="monotone" dataKey="Tilgung" stroke="#387908" />
      <Line type="monotone" dataKey="Sparen" stroke="#a87908" />
    </LineChart>
  );
}
