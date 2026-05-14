import ArmotizationEntry from "./models/ArmotizationEntry";
import CashRoiModel from "./models/cashRoiModel";

export type BuyVsRentComparison = {
  monthlyBuyCashflow: number;
  monthlyBuyTotalCost: number;
  monthlyRentCost: number;
  monthlyRentTotalCost: number;
  averageMonthlyRentCost: number;
  effectiveMonthlyBuyCost: number;
  effectiveMonthlyRentCost: number;
  differencePerMonth: number;
  totalBuyingCost: number;
  totalRentCost: number;
  renterInvestmentBalance: number;
  totalRenterSavingsContribution: number;
  saleProceedsAfterLoan: number;
  estimatedSalePrice: number;
  holdingPeriodYears: number;
  expectedPropertyAppreciation: number;
  expectedInflation: number;
  realPropertyAppreciation: number;
  cashRoi: number;
  realCashRoi: number;
  monthlyBuyNebenkosten: number;
  monthlyRentNebenkosten: number;
};

const DEFAULT_HOLDING_PERIOD_YEARS = 10;

export function getHoldingPeriodYears(input: CashRoiModel) {
  const holdingPeriodYears = Math.round(
    input.holding_period_years || DEFAULT_HOLDING_PERIOD_YEARS,
  );
  return Math.min(Math.max(holdingPeriodYears, 1), 40);
}

export function getExpectedPropertyAppreciation(input: CashRoiModel) {
  return input.expected_property_appreciation ?? 2;
}

export function getExpectedInflation(input: CashRoiModel) {
  return input.expected_inflation ?? 2;
}

export function getCashRoi(input: CashRoiModel) {
  return input.cash_roi ?? 5;
}

export function getMonthlyBuyNebenkosten(input: CashRoiModel) {
  return input.monthly_buy_nebenkosten ?? 0;
}

export function getMonthlyRentNebenkosten(input: CashRoiModel) {
  return input.monthly_rent_nebenkosten ?? 0;
}

function calculateRealRate(nominalRate: number, inflationRate: number) {
  return ((1 + nominalRate / 100) / (1 + inflationRate / 100) - 1) * 100;
}

function discountToPresentValue(
  value: number,
  year: number,
  annualInflation: number,
) {
  return value / Math.pow(1 + annualInflation / 100, year);
}

function calculateRenterInvestmentBalance({
  monthlyBuyTotalCost,
  monthlyRentTotalCost,
  holdingPeriodYears,
  cashRoi,
  expectedInflation,
}: {
  monthlyBuyTotalCost: number;
  monthlyRentTotalCost: number;
  holdingPeriodYears: number;
  cashRoi: number;
  expectedInflation: number;
}) {
  let balance = 0;
  let totalContribution = 0;
  const realCashRoi = calculateRealRate(cashRoi, expectedInflation);

  for (let year = 0; year < holdingPeriodYears; year++) {
    const buyCostForYear = monthlyBuyTotalCost * 12;
    const rentCostForYear = monthlyRentTotalCost * 12;
    const savingsThisYear = Math.max(buyCostForYear - rentCostForYear, 0);

    balance = (balance + savingsThisYear) * (1 + realCashRoi / 100);
    totalContribution += savingsThisYear;
  }

  return {
    renterInvestmentBalance: balance,
    totalRenterSavingsContribution: totalContribution,
    realCashRoi,
  };
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
  const expectedPropertyAppreciation = getExpectedPropertyAppreciation(input);
  const expectedInflation = getExpectedInflation(input);
  const realPropertyAppreciation = calculateRealRate(
    expectedPropertyAppreciation,
    expectedInflation,
  );
  const cashRoi = getCashRoi(input);
  const monthlyBuyNebenkosten = getMonthlyBuyNebenkosten(input);
  const monthlyRentNebenkosten = getMonthlyRentNebenkosten(input);
  const monthlyBuyTotalCost = monthlyBuyCashflow + monthlyBuyNebenkosten;
  const monthlyRentTotalCost = monthlyRentCost + monthlyRentNebenkosten;
  const totalFinancingPayments = yearlyEntries.reduce(
    (sum, entry) =>
      sum +
      discountToPresentValue(
        entry.yearlyRate + entry.sondertilgung,
        entry.year - 1,
        expectedInflation,
      ),
    0,
  );
  const totalBuyingNebenkosten = Array.from(
    { length: holdingPeriodYears },
    (_, index) =>
      discountToPresentValue(
        monthlyBuyNebenkosten * 12 * Math.pow(1 + expectedInflation / 100, index),
        index,
        expectedInflation,
      ),
  ).reduce((sum, annualCost) => sum + annualCost, 0);
  const remainingLoan = yearlyEntries.at(-1)?.remainingPrincipal ?? Math.max(
    input.principal + nebenkosten - input.down_payment,
    0,
  );
  const nominalSalePrice =
    input.principal * Math.pow(1 + expectedPropertyAppreciation / 100, holdingPeriodYears);
  const saleProceedsAfterLoan = discountToPresentValue(
    Math.max(nominalSalePrice - remainingLoan, 0),
    holdingPeriodYears,
    expectedInflation,
  );
  const estimatedSalePrice =
    input.principal * Math.pow(1 + realPropertyAppreciation / 100, holdingPeriodYears);
  const totalBuyingCost =
    input.down_payment + totalFinancingPayments + totalBuyingNebenkosten - saleProceedsAfterLoan;
  const totalRentCost = Array.from({ length: holdingPeriodYears }, (_, index) =>
    discountToPresentValue(
      monthlyRentTotalCost * 12 * Math.pow(1 + expectedInflation / 100, index),
      index,
      expectedInflation,
    ),
  ).reduce((sum, annualRent) => sum + annualRent, 0);
  const {
    renterInvestmentBalance,
    totalRenterSavingsContribution,
    realCashRoi,
  } = calculateRenterInvestmentBalance({
    monthlyBuyTotalCost,
    monthlyRentTotalCost,
    holdingPeriodYears,
    cashRoi,
    expectedInflation,
  });
  const averageMonthlyRentCost = totalRentCost / (holdingPeriodYears * 12);
  const effectiveMonthlyRentCost =
    (totalRentCost - renterInvestmentBalance) / (holdingPeriodYears * 12);
  const effectiveMonthlyBuyCost = totalBuyingCost / (holdingPeriodYears * 12);

  return {
    monthlyBuyCashflow,
    monthlyBuyTotalCost,
    monthlyRentCost,
    monthlyRentTotalCost,
    averageMonthlyRentCost,
    effectiveMonthlyBuyCost,
    effectiveMonthlyRentCost,
    differencePerMonth: effectiveMonthlyBuyCost - effectiveMonthlyRentCost,
    totalBuyingCost,
    totalRentCost,
    renterInvestmentBalance,
    totalRenterSavingsContribution,
    saleProceedsAfterLoan,
    estimatedSalePrice,
    holdingPeriodYears,
    expectedPropertyAppreciation,
    expectedInflation,
    realPropertyAppreciation,
    cashRoi,
    realCashRoi,
    monthlyBuyNebenkosten,
    monthlyRentNebenkosten,
  };
}
