"use server";
import { redirect } from "next/navigation";
import { getPool } from "./db/db";
import BaseModel from "./models/baseModel";

export async function storeInDb(formData: FormData) {
  const model = {
    down_payment: Number(formData.get("down_payment")),
    principal: Number(formData.get("principal")),
    interest_rate: Number(formData.get("interest_rate")),
    monthly_rate: Number(formData.get("monthly_rate")),
    rent: Number(formData.get("rent")),
  } as BaseModel;

  const yearlyRate = calcYearlyRate(model.principal, model.interest_rate);
  const result = await storeCalculationInDb(model, yearlyRate);
  if (result === undefined || result === null) {
    throw new Error("Failed to store calculation in database");
  }

  if (result !== 0) {
    const calculationId = result;
    redirect(`/?calculationId=${calculationId}`);
  }
}

function calcYearlyRate(creditSum: number, interest: number) {
  return (creditSum * interest) / 100;
}

async function storeCalculationInDb(model: BaseModel, yearly_rate: number) {
  const numberOfEntriesExceeded = await isNumberOfEntriesExceeded();
  if (numberOfEntriesExceeded) {
    return 0;
  }

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
    const pool = await getPool();
    const result = await pool!.query(query, values);
    return result.rows[0].id;
  } catch (e) {
    console.error(e, "Error occured when storing calculation in database");
  }
}

async function isNumberOfEntriesExceeded() {
  try {
    const numberOfEntriesQuery = `SELECT COUNT(*) FROM calculations;`;
    const pool = await getPool();
    const numberOfEntries = await pool!.query(numberOfEntriesQuery);
    if (numberOfEntries.rows[0].count >= 15) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e, "Error occured when counting entries in database");
    return true;
  }
}
