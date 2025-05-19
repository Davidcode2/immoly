import React, { useState, useEffect } from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from 'recharts';

// Define the shape of your chart data for better type safety
interface ChartDataItem {
  name: string;
  Zins: number;
  Tilgung: number;
  Sparen: number;
}

export default function DevelopmentChart({ data, rent, interest = 4 }: { data: any, rent: number, interest: number }) {
  // State to hold the debounced and transformed data that the chart will render
  const [debouncedChartData, setDebouncedChartData] = useState<ChartDataItem[] | null>(null);

  const calcInterest = () => {
    const interestCalculations = data.reduce((acc: any, currentYearData: any) => {
      const previousYearBalance = acc.length > 0 ? acc[acc.length - 1].endBalance : 0;
      const annualSavings = currentYearData.yearlyRate - (rent * 12);

      let balanceBeforeInterest = previousYearBalance + annualSavings;
      let endBalance = balanceBeforeInterest * (1 + (interest / 100) );
      let interestEarnedThisYear = endBalance - balanceBeforeInterest;


      const yearResult = {
        year: currentYearData.year,
        startBalance: previousYearBalance,
        annualSavings: annualSavings,
        interestEarned: interestEarnedThisYear,
        endBalance: endBalance,
      };

      acc.push(yearResult);
      return acc;
    }, []);
    return interestCalculations;
  }

  // useEffect hook to implement the debounce logic
  useEffect(() => {
    // If there's no incoming data, clear the debounced data and return
    if (!data) {
      setDebouncedChartData(null);
      return;
    }

    // Set a timeout to transform and update the chart data
    const timeoutId = setTimeout(() => {
      console.log('Debounce timeout fired! Updating chart data...');
      const transformedData: ChartDataItem[] = data.map((x: any) => {
        if (x.year !== data.length) {
          return {
            name: x.year,
            Sparen: Math.floor(calcInterest().find((item: any) => item.year === x.year)?.endBalance || 0),
            Getilgt: Math.floor((x.principal * x.year)),
          };
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
      <Line type="monotone" dataKey="Sparen" stroke="#a87908" />
      <Line type="monotone" dataKey="Getilgt" stroke="#2d7d15" />
    </LineChart>
  );
}
