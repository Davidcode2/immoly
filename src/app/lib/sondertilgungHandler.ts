import ArmotizationEntry from "./models/ArmotizationEntry";

export const updateSondertilgung = (currentTable: ArmotizationEntry[], updatedYear: number, updatedSondertilgungAmount: number) => {
  const newTable = [...currentTable];
  const index = newTable.findIndex(
    (row) => row.year === updatedYear,
  );
  if (index !== -1) {
    const updatedRow = { ...newTable[index] };
    updatedRow.sondertilgung = updatedSondertilgungAmount;
    newTable[index] = updatedRow;
  }
  return newTable;
};
