import Form from "next/form";
import { useEffect, useState } from "react";
import CashRoiModel from "app/lib/models/cashRoiModel";
import SliderInput from "app/components/slider/sliderInput";
import { useRouter, useSearchParams } from "next/navigation";
import { calculationsLocalStorageSetter } from "app/services/calculationsLocalStorageSetter";
import { useBundeslandStore, useMaklergebuehrPercentageStore } from "app/store";
import NebenKostenModel from "app/lib/models/nebenkostenModel";
import { transferSonderAmounts } from "app/services/sonderAmountBrowserUpdater";
import { useCalcNebenkostenSum } from "app/hooks/useCalcNebenkostenSum";
import { toast } from "sonner"

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const maklergebuehrPercentage =
    useMaklergebuehrPercentageStore.getState().value;
  const bundesland = useBundeslandStore.getState().value;

  const nebenkosten = useCalcNebenkostenSum(Number(principalValue));

  const monthlyRateInPercent = () => {
    const kreditSumme =
      Number(principalValue) + nebenkosten - Number(downPayment);
    const yearlyRate = Number(monthlyRate) * 12;
    const zins = (Number(interestRate) * kreditSumme) / 100;
    const tilgung = yearlyRate - zins;
    const monthlyRateInPercent = (100 / kreditSumme) * tilgung;
    return monthlyRateInPercent.toFixed(2) + " %";
  };

  const handleInputChange = (name: string, value: number) => {
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

  const handleSubmit = async () => {
    const nebenkosten: NebenKostenModel = {
      bundesland: bundesland,
      maklergebuehrPercentage: Number(
        maklergebuehrPercentage.replace(",", "."),
      ),
    };
    if (!values) {
      return;
    }
    const uuid = calculationsLocalStorageSetter(values, nebenkosten);
    if (uuid) {
      const params = new URLSearchParams(searchParams);
      params.set("calculationId", uuid);
      router.push(`/?${params.toString()}`, { scroll: false });
    }
    transferSonderAmounts(uuid);
    toast.success("Szenario gespeichert");
  };

  return (
    <>
      <Form action={handleSubmit} className="mx-8 pb-8 md:mx-auto md:pb-0">
        <div className="p-2">
          <div className="lg:justify-none mb-2 grid gap-8 md:justify-center md:gap-8">
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
              <div className="border-b border-stone-700 bg-transparent pb-1 text-xl text-neutral-500 transition-colors duration-200 focus:border-slate-500 focus:outline-none md:w-36 md:text-base dark:text-[var(--ultralight-accent)]">
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
            ></SliderInput>
          </div>
        </div>
        <div className="flex justify-center w-full mx-auto">
          <button
            type="submit"
            className="mt-9 cursor-pointer rounded-full dark:bg-[var(--accent)]/50 bg-[var(--primary)]/90 px-4 py-2 text-[var(--foreground)] shadow backdrop-blur-md transition-colors duration-200 dark:hover:bg-[var(--accent)]/80 hover:bg-[var(--primary)] w-full md:w-fit 2xl:w-full"
          >
            Berechnung speichern
          </button>
        </div>
      </Form>
    </>
  );
}
