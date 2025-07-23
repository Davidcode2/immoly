import Form from "next/form";
import { storeInDb } from "./lib/calc";
import { useEffect, useState } from "react";
import CashRoiModel from "./lib/models/cashRoiModel";
import CalculationResult from "./lib/models/CalculationResult";

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
      cash_roi: name === "cashRoi" ? Number(value) : Number(cashRoi),
      rent: name === "rent" ? Number(value) : Number(rent),
      monthly_rate:
        name === "monthly_rate" ? Number(value) : Number(monthlyRate),
    });
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
        <div className="grid gap-2 md:gap-6">
          <div className="grid">
            {/* Eigenkapital */}
            <label
              htmlFor="capital"
              className="mb-1 text-xs font-semibold text-stone-400 uppercase"
            >
              Eigenkapital
            </label>
            <input
              type="number"
              className="border-b border-stone-700 bg-transparent pb-1 transition-colors duration-200 focus:border-slate-500 focus:outline-none"
              id="capital"
              name="down_payment"
              value={downPayment}
              onChange={handleInputChange}
            />
          </div>

          {/* Monatsrate */}
          <div className="grid">
            <label
              htmlFor="monthlyRate"
              className="mb-1 text-xs font-semibold text-stone-400 uppercase"
            >
              Monatsrate
            </label>
            <input
              type="number"
              className="border-b border-stone-700 bg-transparent pb-1 transition-colors duration-200 focus:border-slate-500 focus:outline-none"
              id="monthlyRate"
              name="monthly_rate"
              value={monthlyRate}
              onChange={handleInputChange}
            />
          </div>

          {/* Kreditzins */}
          <div className="grid">
            <label
              htmlFor="interestRate"
              className="mb-1 text-xs font-semibold text-stone-400 uppercase"
            >
              Kreditzins
            </label>
            <input
              type="number"
              step="0.1"
              className="border-b border-stone-700 bg-transparent pb-1 transition-colors duration-200 focus:border-slate-500 focus:outline-none"
              id="interestRate"
              name="interest_rate"
              max="20"
              min="0.1"
              value={interestRate}
              onChange={handleInputChange}
            />
          </div>

          {/* Kaufsumme */}
          <div className="grid">
            <label
              htmlFor="creditSum"
              className="mb-1 text-xs font-semibold text-stone-400 uppercase"
            >
              Kaufsumme
            </label>
            <input
              type="number"
              className="border-b border-stone-700 bg-transparent pb-1 transition-colors duration-200 focus:border-slate-500 focus:outline-none"
              id="creditSum"
              name="principal"
              value={principalValue}
              onChange={handleInputChange}
            />
          </div>

          {/* Kapitalrendite (optional) */}
          <div className="grid">
            <label
              htmlFor="cashRoi"
              className="mb-1 text-xs font-semibold text-stone-400 uppercase"
            >
              Kapitalrendite{" "}
              <span className="text-xs font-normal text-gray-400 normal-case">
                (optional)
              </span>
            </label>
            <input
              type="number"
              step="0.1"
              className="border-b border-stone-700 bg-transparent pb-1 transition-colors duration-200 focus:border-slate-500 focus:outline-none"
              id="cashRoi"
              name="cashRoi"
              max="20"
              min="0.1"
              value={cashRoi}
              onChange={handleInputChange}
            />
          </div>

          {/* Miete (optional) */}
          <div className="mb-10 grid">
            <label
              htmlFor="rent"
              className="mb-1 text-xs font-semibold text-stone-400 uppercase"
            >
              Miete{" "}
              <span className="text-xs font-normal text-gray-400 normal-case">
                (optional)
              </span>
            </label>
            <input
              type="number"
              className="border-b border-stone-700 bg-transparent pb-1 transition-colors duration-200 focus:border-slate-500 focus:outline-none"
              id="rent"
              name="rent"
              value={rent}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-purple-900/60 px-4 py-2 font-bold text-white shadow-md backdrop-blur-md transition-colors duration-200 hover:bg-purple-700/80"
      >
        Berechnen
      </button>
    </Form>
  );
}
