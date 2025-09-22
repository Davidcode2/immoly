import ArmotizationEntry from "./models/ArmotizationEntry";
import { Sondertilgung } from "./models/sondertilgung";

export const updateSondertilgungInTable = (
  currentTable: ArmotizationEntry[],
  updatedYear: number,
  updatedSondertilgungAmount: number,
) => {
  const newTable = [...currentTable];
  const index = newTable.findIndex((row) => row.year === updatedYear);
  if (index !== -1) {
    const updatedRow = { ...newTable[index] };
    updatedRow.sondertilgung = updatedSondertilgungAmount;
    newTable[index] = updatedRow;
  }
  return newTable;
};

export const updateSondertilgungForYear = (
  sondertilgungen: Sondertilgung[],
  year: number,
  amount: number,
) => {
  const currentSondertilgungIndex = sondertilgungen.findIndex(
    (x) => x.year === year,
  );
  const copy = [...sondertilgungen];
  copy[currentSondertilgungIndex].amount = amount;
  return copy;
};
