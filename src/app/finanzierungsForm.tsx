import Form from "next/form";
import { calc } from "./calc";
import { useEffect, useRef, useState } from "react";

export default function FinanzierungsForm({ values, setInput }: { values: any, setInput: (data: any) => void }) {
  const [downPayment, setDownPayment] = useState<number | string>('');
  const [principalValue, setPrincipal] = useState<number | string>('');
  const [interestRate, setInterestRate] = useState<number | string>('');
  const [rent, setRent] = useState<number | string>('');
  const [monthlyRate, setMonthlyRate] = useState<number | string>('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'down_payment':
        setDownPayment(value);
        break;
      case 'principal':
        setPrincipal(value);
        break;
      case 'interest_rate':
        setInterestRate(value);
        break;
      case 'rent':
        setRent(value);
        break;
      case 'monthly_rate':
        setMonthlyRate(value);
        break;
      default:
        break;
    }
    setInput({
      down_payment: name === 'down_payment' ? value : downPayment,
      principal: name === 'principal' ? value : principalValue,
      interest_rate: name === 'interest_rate' ? value : interestRate,
      rent: name === 'rent' ? value : rent,
      monthly_rate: name === 'monthly_rate' ? value : monthlyRate,
    });
  };

  useEffect(() => {
    if (values) {
      setDownPayment(values[0].down_payment || '');
      setPrincipal(values[0].principal || '');
      setInterestRate(values[0].interest_rate || '');
      setRent(values[0].rent || '');
      setMonthlyRate(values[0].monthly_rate || '');
    }
  }, [values]);

  return (
    <Form ref={formRef} action={calc}>
      <div className="flex gap-2 flex-col">
        <label htmlFor="capital">Eigenkapital</label>
        <input type="number" className="border-stone-700 border rounded-lg" id="captital" name="down_payment" value={downPayment} onChange={handleInputChange} />
        <label htmlFor="creditSum">Kreditsumme</label>
        <input type="number" className="border-stone-700 border rounded-lg" id="creditSum" name="principal" value={principalValue} onChange={handleInputChange} />
        <label htmlFor="interestRate">Zins</label>
        <input type="number" className="border-stone-700 border rounded-lg" id="interestRate" name="interest_rate" max="20" min="0.1" value={interestRate} onChange={handleInputChange} />
        <label htmlFor="rent">Miete</label>
        <input type="number" className="border-stone-700 border rounded-lg" id="rent" name="rent" value={rent} onChange={handleInputChange} />
        <label htmlFor="monthlyRate">Monatsrate</label>
        <input type="number" className="border-stone-700 border rounded-lg" id="monthylRate" name="monthly_rate" value={monthlyRate} onChange={handleInputChange} />
        <button type="submit" />
      </div>
    </Form>
  );
}
