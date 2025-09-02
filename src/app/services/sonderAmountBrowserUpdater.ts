import { Sondertilgung } from "app/lib/models/sondertilgung";

export const updateSonderAmountInBrowserStorage = (
  type: string,
  year: string,
  newAmount: string,
  calculationId: string,
) => {
  const existingString = localStorage.getItem(`${calculationId}-${type}`);
  const existing: Sondertilgung[] = JSON.parse(existingString || "[]");
  const yearNumber = Number(year);
  const newAmountNumber = Number(newAmount);

  const index = existing.findIndex((item) => item.year === yearNumber);

  let updated: Sondertilgung[];

  if (index > -1) {
    updated = [...existing];
    updated[index] = {
      ...updated[index],
      amount: newAmountNumber,
    };
  } else {
    updated = [...existing, { year: yearNumber, amount: newAmountNumber }];
  }
  const updatedString = JSON.stringify(updated);
  localStorage.setItem(`${calculationId}-${type}`, updatedString);
};
