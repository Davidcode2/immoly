export default interface BaseModel {
  principal: number;
  down_payment: number;
  interest_rate: number;
  monthly_rate: number;
  rent: number;
  cash_roi?: number;
  holding_period_years?: number;
  expected_property_appreciation?: number;
  expected_inflation?: number;
  monthly_buy_nebenkosten?: number;
  monthly_rent_nebenkosten?: number;
}
