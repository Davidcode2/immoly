import { CalculationDbo } from "app/lib/models/calculationDbo";
import CashRoiModel from "app/lib/models/cashRoiModel";

export const calculationAccessor = (id: string) => {
    const storedData = localStorage.getItem(`calculations`);
    const parsed = storedData ? JSON.parse(storedData) : [];
    const calculation: CalculationDbo = parsed.find((item: { id: string }) => item.id === id);
    return calculation;
}

export const calculationsAccessor = () => {
    const storedData = localStorage.getItem(`calculations`);
    const calculations = storedData ? JSON.parse(storedData) : [];
    return calculations;
}

export const deleteCalculation = (id: string) => {
  const storedData = localStorage.getItem(`calculations`);
  const parsed = storedData ? JSON.parse(storedData) : [];
  const filtered = parsed.filter((item: { id: string }) => item.id !== id);
  if (filtered.length === parsed.length) {
    return false;
  }
  localStorage.setItem("calculations", JSON.stringify(filtered));
  return true;
}
