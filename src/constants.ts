import CashRoiModel from "./lib/models/cashRoiModel";

export const DEFAULT_THEME = "green-mist-dark";
export const DEFAULT_BUNDESLAND = "Baden-Wuerttemberg";
export const DEFAULT_CALCULATION = {
      monthly_rate: 1800,
      principal: 480000,
      down_payment: 70000,
      interest_rate: 3.8,
      rent: 800,
      cash_roi: 5,
} as CashRoiModel
