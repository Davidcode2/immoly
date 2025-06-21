import BaseModel from "./baseModel";

export default interface CalculationResult extends BaseModel {
  id: number;
  annual_percentage_rate: number;
  loan_term_in_months: number;
  created_at: string;
}

