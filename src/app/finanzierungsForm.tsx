import Form from "next/form";
import { storeInDb } from "./calc";
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
    if (values) {
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
      <div className="grid gap-2 flex-col">
        <div className="grid">
          <label htmlFor="capital">Eigenkapital</label>
          <input
            type="number"
            className="border-stone-700 border rounded-lg p-1"
            id="captital"
            name="down_payment"
            value={downPayment}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid max-w-[200px]">
          <label htmlFor="monthlyRate">Monatsrate</label>
          <input
            type="number"
            className="border-stone-700 border rounded-lg p-1"
            id="monthylRate"
            name="monthly_rate"
            value={monthlyRate}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid max-w-[200px]">
          <label htmlFor="creditSum">Kaufsumme</label>
          <input
            type="number"
            className="border-stone-700 border rounded-lg p-1"
            id="creditSum"
            name="principal"
            value={principalValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid max-w-[200px]">
          <label htmlFor="interestRate">Kreditzins</label>
          <input
            type="decimal"
            className="border-stone-700 border rounded-lg p-1"
            id="interestRate"
            name="interest_rate"
            max="20"
            min="0.1"
            value={interestRate}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid max-w-[200px]">
          <label htmlFor="cashRoi">Kapitalrendite <span className="text-xs text-gray-400">(optional)</span></label>
          <input
            type="decimal"
            className="border-stone-700 border rounded-lg p-1"
            id="cashRoi"
            name="cashRoi"
            max="20"
            min="0.1"
            value={cashRoi}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid max-w-[200px]">
          <label htmlFor="rent">Miete <span className="text-xs text-gray-400">(optional)</span></label>
          <input
            type="number"
            className="border-stone-700 border rounded-lg p-1"
            id="rent"
            name="rent"
            value={rent}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" />
      </div>
    </Form>
  );
}
