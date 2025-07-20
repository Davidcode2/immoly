import BaseModel from "./baseModel";
import { Sondertilgung } from "./sondertilgung";

export default interface CalculationResult extends BaseModel {
  id: number;
  annual_percentage_rate: number;
  loan_term_in_months: number;
  created_at: string;
  cash_roi: number;
}

export interface CalculationWithSondertilgung extends CalculationResult {
  sondertilgungen: Sondertilgung[];
}

export interface DBSingleCalculationRow {
  id: number;
  principal: number;
  down_payment: number;
  interest_rate: number;
  monthly_rate: number;
  rent: number;
  annual_percentage_rate: number;
  loan_term_in_months: number;
  created_at: string; // Or Date, depending on your DB client's parsing
  cash_roi: number;
  // Sondertilgung fields (can be null due to LEFT JOIN)
  year: number | null;
  amount: number | null;
}
