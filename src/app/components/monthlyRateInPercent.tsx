import { useCalcNebenkostenSum } from "app/hooks/useCalcNebenkostenSum";
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
  const handleCurrentMonthlyRatePercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    /* prevent user from entering values larger than two digits before the comma */
    console.log(value);
    const absoluteValue = calcAbsoluteMonthlyRateFromPercentage(value);
    //setMonthlyRateInPercentRef(value)
    handleInputChange("monthly_rate", absoluteValue);
  };

  const nebenkosten = useCalcNebenkostenSum(Number(principalValue));

  const monthlyRateInPercent = () => {
    const kreditSumme =
      Number(principalValue) + nebenkosten - Number(downPayment);
    const yearlyRate = Number(monthlyRate) * 12;
    const zins = (Number(interestRate) * kreditSumme) / 100;
    const tilgung = yearlyRate - zins;
    const monthlyRateInPercent = (100 / kreditSumme) * tilgung;
    return monthlyRateInPercent;
  };

  const calcAbsoluteMonthlyRateFromPercentage = (value: string) => {
    const kreditSumme =
      Number(principalValue) + nebenkosten - Number(downPayment);
    const parsedValue = Number(value.replace(",", "."));
    console.log(parsedValue);
    if (isNaN(parsedValue)) {
      return 0;
    }
    const yearlyRate = (parsedValue / 100) * kreditSumme;
    const absoluteMonthlyRate = yearlyRate / 12;
    return absoluteMonthlyRate;
  };

  return (
    <>
      <input
        value={monthlyRateInPercent()}
        type="text"
        inputMode="decimal"
        maxLength={5}
        max={99.99}
        min={0}
        className="w-36 border-b border-[var(--dark-accent)] bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-[var(--dark-accent)]/60 focus:outline-none md:text-2xl"
        onChange={handleCurrentMonthlyRatePercentageChange}
      />
      <div>{monthlyRateInPercent()}</div>
      <div className="border-b border-stone-700 bg-transparent pb-1 text-xl text-neutral-500 transition-colors duration-200 focus:border-slate-500 focus:outline-none md:w-36 md:text-base dark:text-[var(--ultralight-accent)]"></div>
    </>
  );
}
