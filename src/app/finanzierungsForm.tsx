import Form from "next/form";
import { storeInDb } from "./lib/calc";
import { useEffect, useState } from "react";
import CashRoiModel from "./lib/models/cashRoiModel";
import CalculationResult from "./lib/models/CalculationResult";
import SliderInput from "./components/slider/sliderInput";
import OptionalParameters from "./components/optionalParameters";

export default function FinanzierungsForm({
  values,
  setInput,
}: {
  values: CalculationResult[] | null;
  setInput: (data: CashRoiModel) => void;
}) {
  const [downPayment, setDownPayment] = useState<number | string>("");
  const [principalValue, setPrincipal] = useState<number | string>("");
  const [interestRate, setInterestRate] = useState<number | string>("");
  const [cashRoi, setCashRoi] = useState<number | string>("");
  const [rent, setRent] = useState<number | string>("");
  const [monthlyRate, setMonthlyRate] = useState<number | string>("");

  const [showExtended, setShowExtended] = useState<boolean>(false);

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
    if (values && values[0]) {
      setDownPayment(values[0].down_payment || "");
      setPrincipal(values[0].principal || "");
      setInterestRate(values[0].interest_rate || "");
      setCashRoi(values[0].cash_roi || "");
      setRent(values[0].rent || "");
      setMonthlyRate(values[0].monthly_rate || "");
    }
  }, [values]);

  return (
    <Form action={storeInDb} className="mx-auto">
      <div className="rounded-lg border border-purple-500/30 bg-gradient-to-tl from-sky-900/10 to-purple-800/10 p-2 shadow backdrop-blur-2xl">
        <div className="grid gap-2 md:gap-6 mb-4">
          {/* Eigenkapital */}
          <SliderInput
            min={0}
            max={500000}
            step={1000}
            value={Number(downPayment) || 0}
            inputName={"down_payment"}
            label={"Eigenkapital"}
            htmlFor={"capital"}
            handleChange={handleInputChange}
          />
          <SliderInput
            min={0}
            max={10000}
            step={10}
            value={Number(monthlyRate) || 0}
            inputName={"monthly_rate"}
            label={"Monatsrate"}
            htmlFor={"monthlyRate"}
            handleChange={handleInputChange}
          />
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
          />
        </div>
      </div>
      <button
        className="relative bottom-2 mr-auto rounded-lg p-2 pt-0 text-gray-400 hover:bg-purple-600"
        type="button"
        onClick={() => setShowExtended(!showExtended)}
      >
        &#8964;
      </button>
      <div className={`${showExtended ? "block" : "hidden" } rounded-lg border border-purple-500/30 bg-gradient-to-tl from-sky-900/10 to-purple-800/10 p-2 shadow backdrop-blur-2xl`}>
        <OptionalParameters
          cashRoi={cashRoi}
          handleInputChange={handleInputChange}
          rent={rent}
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-lg bg-purple-900/60 px-4 py-2 font-bold text-white shadow-md backdrop-blur-md transition-colors duration-200 hover:bg-purple-700/80"
      >
        Berechnen
      </button>
    </Form>
  );
}
