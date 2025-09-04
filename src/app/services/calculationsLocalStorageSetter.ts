import BaseModel from "app/lib/models/baseModel";
import { CalculationDbo } from "app/lib/models/calculationDbo";
import NebenKostenModel from "app/lib/models/nebenkostenModel";

export function calculationsLocalStorageSetter(formData: FormData, nebenkosten: NebenKostenModel) {
  const model = {
    down_payment: Number(formData.get("down_payment")),
    principal: Number(formData.get("principal")),
    interest_rate: Number(formData.get("interest_rate")),
    monthly_rate: Number(formData.get("monthly_rate")),
    rent: Number(formData.get("rent")),
  } as BaseModel;
  const uuid = crypto.randomUUID();
  const calculation = { id: uuid, ...model };
  const currentCalculations = localStorage.getItem("calculations");
  let calculationsJson: BaseModel[] = []
  if (currentCalculations) {
    calculationsJson = JSON.parse(currentCalculations);
    calculationsJson.push(calculation);
  } else {
    calculationsJson = [calculation];
  }
  const withDate = calculationsJson as CalculationDbo[];
  withDate[calculationsJson.length - 1].created_at = new Date().toISOString();
  withDate[calculationsJson.length - 1].maklerguehrPercentage = nebenkosten.maklergebuehrPercentage;
  withDate[calculationsJson.length - 1].bundesland = nebenkosten.bundesland;
  const newCalculationsString = JSON.stringify(calculationsJson);
  localStorage.setItem("calculations", newCalculationsString);
  return uuid;
}
