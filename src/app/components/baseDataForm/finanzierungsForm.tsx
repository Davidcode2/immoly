import Form from "next/form";
import { storeInDb } from "app/lib/calculationDatabaseService";
import { useEffect, useState } from "react";
import CashRoiModel from "app/lib/models/cashRoiModel";
import SliderInput from "app/components/slider/sliderInput";
import OptionalParameters from "app/components/baseDataForm/optionalParameters";

export default function FinanzierungsForm({
  values,
  setInput,
}: {
  values: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
}) {
  const [downPayment, setDownPayment] = useState<number | string>("");
  const [principalValue, setPrincipal] = useState<number | string>("");
  const [interestRate, setInterestRate] = useState<number | string>("");
  const [cashRoi, setCashRoi] = useState<number | string>("");
  const [rent, setRent] = useState<number | string>("");
  const [monthlyRate, setMonthlyRate] = useState<number | string>("");

  const [showExtended, setShowExtended] = useState<boolean>(false);

  const monthlyRateInPercent = () => {
    const kreditSumme = Number(principalValue) - Number(downPayment);
    const yearlyRate = Number(monthlyRate) * 12;
    const zins = (Number(interestRate) * kreditSumme) / 100;
    const tilgung = yearlyRate - zins;
    const monthlyRateInPercent = (100 / kreditSumme) * tilgung;
    return monthlyRateInPercent.toFixed(2) + " %";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "down_payment":
        setDownPayment(value);
        break;
      case "principal":
        setPrincipal(value);
        break;
      case "interest_rate":
        setInterestRate(value);
        break;
      case "cashRoi":
        if (Number(cashRoi) > 20) {
          setCashRoi(20);
          return;
        }
        setCashRoi(value);
        break;
      case "rent":
        setRent(value);
        break;
      case "monthly_rate":
        setMonthlyRate(value);
        break;
      default:
        break;
    }
    setInput({
      principal: name === "principal" ? Number(value) : Number(principalValue),
      down_payment:
        name === "down_payment" ? Number(value) : Number(downPayment),
      interest_rate:
        name === "interest_rate" ? Number(value) : Number(interestRate),
      cash_roi: name === "cashRoi" ? checkCashRoi(value) : Number(cashRoi),
      rent: name === "rent" ? Number(value) : Number(rent),
      monthly_rate:
        name === "monthly_rate" ? Number(value) : Number(monthlyRate),
    });
  };

  const checkCashRoi = (value: number | string) => {
    const numValue = Number(value);
    if (numValue > 20) {
      return 20;
    }
    return Number(numValue);
  };

  useEffect(() => {
    if (values && values) {
      setDownPayment(values.down_payment || "");
      setPrincipal(values.principal || "");
      setInterestRate(values.interest_rate || "");
      setCashRoi(values.cash_roi || "");
      setRent(values.rent || "");
      setMonthlyRate(values.monthly_rate || "");
    }
  }, [values]);

  return (
    <Form action={storeInDb} className="mx-8 pb-8 md:pb-0 md:mx-auto">
      <div className="p-2">
        <div className="mb-2 grid gap-8 md:gap-8 md:justify-center lg:justify-none">
          {/* Eigenkapital */}
          <SliderInput
            min={0}
            max={450000}
            step={1000}
            value={Number(downPayment) || 0}
            inputName={"down_payment"}
            label={"Eigenkapital"}
            htmlFor={"capital"}
            handleChange={handleInputChange}
          />
          <SliderInput
            min={500}
            max={6000}
            step={10}
            value={Number(monthlyRate)}
            inputName={"monthly_rate"}
            label={"Monatsrate"}
            htmlFor={"monthlyRate"}
            handleChange={handleInputChange}
          >
            <div className="md:w-36 border-b border-stone-700 bg-transparent pb-1 text-xl text-neutral-500 transition-colors duration-200 focus:border-slate-500 focus:outline-none md:text-base">
              {monthlyRateInPercent()}
            </div>
          </SliderInput>
          <SliderInput
            min={0.1}
            max={6}
            step={0.1}
            value={Number(interestRate) || 0}
            inputName={"interest_rate"}
            label={"Kreditzins"}
            htmlFor={"interestRate"}
            handleChange={handleInputChange}
          />
          <SliderInput
            min={50000}
            max={1500000}
            step={10000}
            value={Number(principalValue) || 0}
            inputName={"principal"}
            label={"Kaufsumme"}
            htmlFor={"creditSum"}
            handleChange={handleInputChange}
          >
          </SliderInput>
        </div>
      </div>
      <button
        className="mr-auto rounded-lg px-2 pb-4 text-xs text-gray-400 hover:text-slate-800 dark:hover:text-gray-200"
        type="button"
        onClick={() => setShowExtended(!showExtended)}
      >
        {showExtended ? "Weniger Optionen" : "Mehr Optionen"}
      </button>
      <div
        className={`${showExtended ? "block" : "hidden"} mb-2 rounded-lg p-2 backdrop-blur-2xl`}
      >
        <OptionalParameters
          cashRoi={cashRoi}
          handleInputChange={handleInputChange}
          rent={rent}
        />
      </div>

      <button
        type="submit"
        className="mt-1 w-full rounded-lg bg-[var(--primary)]/60 px-4 py-2 font-bold text-white shadow backdrop-blur-md transition-colors duration-200 hover:bg-[var(--primary)]"
      >
        Berechnung speichern
      </button>
    </Form>
  );
}
