import {
  CalculationWithSondertilgung,
  DBSingleCalculationRow,
} from "../models/CalculationResult";
import { Sondertilgung } from "../models/sondertilgung";

export function transformCalculationResults(
  dbRows: DBSingleCalculationRow[],
): CalculationWithSondertilgung[] {
  const calculationsMap = new Map<number, CalculationWithSondertilgung>();

  dbRows.forEach((row) => {
    let calculation = calculationsMap.get(row.id);

    if (!calculation) {
      calculation = {
        id: row.id,
        principal: row.principal,
        down_payment: row.down_payment,
        interest_rate: row.interest_rate,
        monthly_rate: row.monthly_rate,
        rent: row.rent,
        annual_percentage_rate: row.annual_percentage_rate,
        loan_term_in_months: 0,
        created_at: row.created_at,
        cash_roi: 0,
        sondertilgungen: [],
      };
      calculationsMap.set(row.id, calculation);
    }

    if (row.year !== null && row.amount !== null) {
      const sondertilgung: Sondertilgung = {
        year: row.year,
        amount: row.amount,
      };
      calculation.sondertilgungen.push(sondertilgung);
    }
  });

  return Array.from(calculationsMap.values());
}
