import ArmotizationEntry from "./models/ArmotizationEntry";
import CashRoiModel from "./models/cashRoiModel";

export type BuyVsRentComparison = {
  monthlyBuyCashflow: number;
  monthlyRentCost: number;
  effectiveMonthlyBuyCost: number;
  differencePerMonth: number;
  totalBuyingCost: number;
  totalRentCost: number;
  saleProceedsAfterLoan: number;
  holdingPeriodYears: number;
};

const DEFAULT_HOLDING_PERIOD_YEARS = 10;

export function getHoldingPeriodYears(input: CashRoiModel) {
  const holdingPeriodYears = Math.round(
    input.holding_period_years || DEFAULT_HOLDING_PERIOD_YEARS,
  );
  return Math.min(Math.max(holdingPeriodYears, 1), 40);
}

export default function calculateBuyVsRentComparison(
  input: CashRoiModel,
  table: ArmotizationEntry[],
  nebenkosten: number,
): BuyVsRentComparison {
  const holdingPeriodYears = getHoldingPeriodYears(input);
  const yearlyEntries = table.slice(0, holdingPeriodYears);
  const monthlyBuyCashflow = input.monthly_rate;
  const monthlyRentCost = input.rent;
  const totalFinancingPayments = yearlyEntries.reduce(
    (sum, entry) => sum + entry.yearlyRate + entry.sondertilgung,
    0,
  );
  const remainingLoan = yearlyEntries.at(-1)?.remainingPrincipal ?? Math.max(
    input.principal + nebenkosten - input.down_payment,
    0,
  );
  const saleProceedsAfterLoan = Math.max(input.principal - remainingLoan, 0);
  const totalBuyingCost =
    input.down_payment + totalFinancingPayments - saleProceedsAfterLoan;
  const totalRentCost = monthlyRentCost * holdingPeriodYears * 12;
  const effectiveMonthlyBuyCost = totalBuyingCost / (holdingPeriodYears * 12);

  return {
    monthlyBuyCashflow,
    monthlyRentCost,
    effectiveMonthlyBuyCost,
    differencePerMonth: effectiveMonthlyBuyCost - monthlyRentCost,
    totalBuyingCost,
    totalRentCost,
    saleProceedsAfterLoan,
    holdingPeriodYears,
  };
}
