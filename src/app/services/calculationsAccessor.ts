import { CalculationDbo } from "app/lib/models/calculationDbo";
import { dispatchLocalStorageEvent } from "./calculationsLocalStorageSetter";

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
  dispatchLocalStorageEvent();
  return true;
}
