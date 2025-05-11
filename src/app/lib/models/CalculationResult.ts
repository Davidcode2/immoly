export default interface CalculationResult {
  id: number;
  principal: number;
  down_payment: number;
  interest_rate: number;
  annual_percentage_rate: number;
  loan_term_in_months: number;
  monthly_rate: number;
  rent: number;
  created_at: string;
}

