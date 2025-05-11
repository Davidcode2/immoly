'use client';
import { useEffect, useState } from "react";
import CalculationResult from "./lib/models/CalculationResult";
import { getCalculation } from "./lib/getCalculations";

export default function SingleGraph({ calculation }: { calculation: CalculationResult }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const setCalcId = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('calculationId', calculation.id.toString());
    window.history.pushState({}, '', url);
  }

  return (
    <div>
      <p>Credit Sum: {calculation.principal}</p>
      <p>Interest Rate: {calculation.interest_rate}%</p>
      <p>Capital: {calculation.down_payment}</p>
      <p>Rent: {calculation.rent}</p>
      <p>Yearly Interest: {calculation.annual_percentage_rate}</p>
      <p>Calculated At: {new Date(calculation.created_at).toLocaleString()}</p>
      <button className="rounded-lg bg-purple-700 p-2 mt-4" onClick={setCalcId}>Tilgungstabelle</button>
    </div>
  )
}
