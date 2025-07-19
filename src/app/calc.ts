"use server";
import { redirect } from "next/navigation";
import { connect, disconnect } from "./lib/db/db";
import BaseModel from "./lib/models/baseModel";

export async function storeInDb(formData: FormData) {
  const model = {
    down_payment: Number(formData.get("down_payment")),
    principal: Number(formData.get("principal")),
    interest_rate: Number(formData.get("interest_rate")),
    monthly_rate: Number(formData.get("monthly_rate")),
    rent: Number(formData.get("rent")),
  } as BaseModel;

  const yearlyRate = calcYearlyRate(model.principal, model.interest_rate);
  console.log(model);
  const result = await storeCalculationInDb(model, yearlyRate);
  console.log(result);
  if (!result) {
    throw new Error("Failed to store calculation in database");
  }

  const calculationId = result.rows[0].id;
  redirect(`/graph?calculationId=${calculationId}`);
}

function calcYearlyRate(creditSum: number, interest: number) {
  return (creditSum * interest) / 100;
}

async function storeCalculationInDb(model: BaseModel, yearly_rate: number) {
  const client = await connect();
  try {
    const query = `
      INSERT INTO calculations (principal, interest_rate, monthly_rate, down_payment, rent, annual_percentage_rate)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const values = [
      model.principal,
      model.interest_rate,
      model.monthly_rate,
      model.down_payment,
      model.rent,
      yearly_rate,
    ];
    const result = await client.query(query, values);
    return result;
  } catch (e) {
    console.error(e, "Error occured when storing calculation in database");
  } finally {
    await disconnect();
  }
}
