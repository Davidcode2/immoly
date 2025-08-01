import calcTilgung from "./calculateArmotizaztionTable";
import ArmotizationEntry from "./models/ArmotizationEntry";
import CashRoiModel from "./models/cashRoiModel";
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

export const recalcForAllSondertilgungen = async (
  sondertilgungen: Sondertilgung[] | undefined,
  tilgungsTabelle: ArmotizationEntry[],
  calculationValues: CashRoiModel | null,
) => {
  if (!sondertilgungen) {
    return tilgungsTabelle;
  }
  sondertilgungen.sort((a, b) => a.year - b.year);
  if (
    calculationValues &&
    calculationValues.interest_rate &&
    calculationValues.monthly_rate
  ) {
    const newTable = [...tilgungsTabelle];
    tilgungsTabelle.forEach((tableRow: ArmotizationEntry) => {
      const tableRowNew = newTable.find((x) => x.year === tableRow.year);
      if (!tableRowNew) {
        return newTable;
      }
      const sondertilgung = sondertilgungen.find(
        (y) => y.year === tableRow.year,
      );
      if (sondertilgung) {
        recalcRestOfTableWithSondertilgung(
          sondertilgung,
          sondertilgungen,
          tilgungsTabelle,
          calculationValues,
          tableRow,
          newTable,
          tableRowNew
        );
      }
    });
    return newTable;
  } else {
    return tilgungsTabelle;
  }
};

const recalcRestOfTableWithSondertilgung = (
  sondertilgung: Sondertilgung,
  sondertilgungen: Sondertilgung[],
  tilgungsTabelle: ArmotizationEntry[],
  calculationValues: CashRoiModel,
  tableRow: ArmotizationEntry,
  newTable: ArmotizationEntry[],
  tableRowNew: ArmotizationEntry,
) => {
  const newReducedPrincipal =
    tableRowNew.remainingPrincipal - sondertilgung.amount;
  if (newReducedPrincipal < 0) {
    return newTable;
  }
  const newTilgung = calcTilgung({
    principal: newReducedPrincipal,
    down_payment: 0,
    interest_rate: calculationValues?.interest_rate,
    monthly_rate: calculationValues?.monthly_rate,
    rent: calculationValues?.rent || 0,
    sondertilgungen: sondertilgungen,
  });
  newTilgung.forEach((x: ArmotizationEntry) => {
    x.year = x.year + tableRow.year;
  });
  newTable.splice(
    tilgungsTabelle.indexOf(tableRow) + 1,
    newTable.length,
    ...newTilgung,
  );
};
