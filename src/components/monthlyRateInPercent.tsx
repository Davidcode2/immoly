import { useCalcNebenkostenSum } from "@/hooks/useCalcNebenkostenSum";
import { useState, useEffect } from "react";

export default function MonthlyRateInPercent({
  principalValue,
  downPayment,
  interestRate,
  monthlyRate,
  handleInputChange,
}: {
  principalValue: string;
  downPayment: string;
  interestRate: string;
  monthlyRate: string;
  handleInputChange: (field: string, value: number) => void;
}) {
  const nebenkosten = useCalcNebenkostenSum(Number(principalValue));
  const [inputValue, setInputValue] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const monthlyRateInPercent = () => {
    const kreditSumme =
      Number(principalValue) + nebenkosten - Number(downPayment);
    const yearlyRate = Number(monthlyRate) * 12;
    const zins = (Number(interestRate) * kreditSumme) / 100;
    const tilgung = yearlyRate - zins;
    const monthlyRateInPercent = (100 / kreditSumme) * tilgung;
    return Math.round(monthlyRateInPercent * 100) / 100;
  };

  const calcAbsoluteMonthlyRateFromPercentage = (value: string) => {
    const kreditSumme =
      Number(principalValue) + nebenkosten - Number(downPayment);
    const parsedValue = Number(value.replace(",", "."));
    if (isNaN(parsedValue)) {
      return 0;
    }
    const tilgung = (parsedValue / 100) * kreditSumme;
    const zins = (Number(interestRate) * kreditSumme) / 100;
    const monthlyRate = (tilgung + zins) / 12;
    return Number(monthlyRate.toFixed());
  };

  // Only update inputValue from calculated value if not editing
  useEffect(() => {
    if (!isEditing) {
      setInputValue(monthlyRateInPercent().toString().replace(".", ","));
    }
  }, [
    principalValue,
    downPayment,
    interestRate,
    monthlyRate,
    nebenkosten,
    isEditing,
  ]);

  const handleCurrentMonthlyRatePercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsEditing(true);
    const value = e.target.value;
    if (!value.includes(",") && !value.includes(".") && value.length >= 3) {
      return;
    }
    setInputValue(value);
    const absoluteValue = calcAbsoluteMonthlyRateFromPercentage(value);
    handleInputChange("monthly_rate", absoluteValue);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setInputValue(monthlyRateInPercent().toString().replace(".", ","));
  };

  return (
    <>
      <input
        value={inputValue}
        type="text"
        inputMode="decimal"
        maxLength={5}
        max={99.99}
        min={0}
        className="w-24 border-b border-[var(--secondary)] bg-transparent pb-1 text-xl transition-colors duration-200 invalid:text-green-900 focus:border-[var(--accent)] focus:outline-none lg:text-base"
        onChange={handleCurrentMonthlyRatePercentageChange}
        onBlur={handleBlur}
        aria-label="Monatliche Rate in Prozent"
      />
      <div className="relative -left-6 text-[var(--foreground)]/80">%</div>
    </>
  );
}
