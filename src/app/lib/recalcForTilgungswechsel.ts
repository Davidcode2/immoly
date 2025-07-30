import calcTilgung from "./calculateArmotizaztionTable";
import ArmotizationEntry from "./models/ArmotizationEntry";

export default function recalcForTilgungswechsel(
  table: ArmotizationEntry[],
  year: number,
  newTilgung: number,
  interestRate: number
) {
  const tableCopy = [...table];
  const lastUnchangedItemIndex = table.findIndex((x) => x.year === year);
  const tableUpToChange = tableCopy.splice(0, lastUnchangedItemIndex + 1);
  const newBaseValue = tableUpToChange[lastUnchangedItemIndex];
  const newCashRoiModel = {
    principal: newBaseValue.remainingPrincipal,
    down_payment: 0,
    interest_rate: interestRate,
    monthly_rate: newTilgung,
    rent: 0,
  };
  // offset years
  const recalculatedTable = calcTilgung(newCashRoiModel);
  const recalculatedTableWithYearOffset = recalculatedTable.map(x => {
    x.year = x.year + year;
    return x;
  });
  const mergedTable = [...tableUpToChange, ...recalculatedTableWithYearOffset];
  return mergedTable;
}
