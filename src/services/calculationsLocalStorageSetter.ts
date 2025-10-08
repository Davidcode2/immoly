import BaseModel from "@/lib/models/baseModel";
import { CalculationDbo } from "@/lib/models/calculationDbo";
import CashRoiModel from "@/lib/models/cashRoiModel";
import NebenKostenModel from "@/lib/models/nebenkostenModel";

export function calculationsLocalStorageSetter(
  input: CashRoiModel,
  nebenkosten: NebenKostenModel,
) {
  const model = {
    down_payment: Number(input.down_payment),
    principal: Number(input.principal),
    interest_rate: Number(input.interest_rate),
    monthly_rate: Number(input.monthly_rate),
    rent: Number(input.rent),
    cash_roi: Number(input.cash_roi),
  } as BaseModel;
  const uuid = crypto.randomUUID();
  const calculation = { id: uuid, ...model };

  const completeCalculationObject = addProperties(calculation, nebenkosten);
  pushToStoredCalculations(completeCalculationObject);
  dispatchLocalStorageEvent();
  return uuid;
}

export function dispatchLocalStorageEvent() {
  const event = new CustomEvent("local-storage");
  window.dispatchEvent(event);
}

function pushToStoredCalculations(calculation: BaseModel) {
  const currentCalculations = localStorage.getItem("calculations");

  let calculationsJson: BaseModel[] = [];
  if (currentCalculations) {
    calculationsJson = JSON.parse(currentCalculations);
    calculationsJson.push(calculation);
  } else {
    calculationsJson = [calculation];
  }
  const newCalculationsString = JSON.stringify(calculationsJson);
  localStorage.setItem("calculations", newCalculationsString);
}

function addProperties(calculation: BaseModel, nebenkosten: NebenKostenModel) {
  const withDate = { ...calculation } as CalculationDbo;
  withDate.created_at = new Date().toISOString();
  withDate.maklerguehrPercentage = nebenkosten.maklergebuehrPercentage;
  withDate.bundesland = nebenkosten.bundesland;
  return withDate;
}
