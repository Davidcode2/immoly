"use server";

import { connect, disconnect } from "./db/db";
import { transformCalculationResults } from "./db/transformCalculations";
import CalculationResult, { CalculationWithSondertilgung } from "./models/CalculationResult";

export default async function getCalculations() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    console.warn(
      "Skipping static generation for calculations due to SKIP_BUILD_STATIC_GENERATION flag.",
    );
    return [] as CalculationResult[];
  }
  const client = await connect();
  try {
    const query = `
      SELECT id, principal, interest_rate, monthly_rate, down_payment, rent, annual_percentage_rate, created_at
      FROM calculations;
    `;
    const result = await client.query(query);
    return result.rows.length > 0 ? (result.rows as CalculationResult[]) : null;
  } catch (error) {
    console.error("Error fetching calculations:", error);
    return null;
  } finally {
    await disconnect();
  }
}

export async function getCalculation(
  id: string,
): Promise<CalculationWithSondertilgung[] | null> {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    console.warn(
      "Skipping static generation for calculations due to SKIP_BUILD_STATIC_GENERATION flag.",
    );
    return [] as CalculationWithSondertilgung[];
  }
  const client = await connect();
  try {
    const query = `
      SELECT c.id, c.principal, c.interest_rate, c.monthly_rate, c.down_payment, c.rent, c.annual_percentage_rate, c.created_at, s.year, s.amount
      FROM calculations c
      LEFT JOIN sondertilgungen s ON c.id = s.calculation_id
      WHERE c.id = $1;
    `;
    const result = await client.query(query, [id]);

    if (result && result.rows) {
      const res = transformCalculationResults(result.rows);
      return res;
    }
    throw new Error("No calculations found for the given ID");
    //return result.rows.length > 0 ? (result.rows as CalculationResult[]) : null;
  } catch (error) {
    console.error("Error fetching calculations:", error);
    return null;
  } finally {
    await disconnect();
  }
}

export async function deleteItem(id: string) {
  const client = await connect();
  try {
    const query = `
      DELETE
      FROM calculations WHERE id = $1;
    `;
    const result = await client.query(query, [id]);
    return result.rowCount;
  } catch (error) {
    console.error("Error deleting calculation:", error);
    return null;
  } finally {
    await disconnect();
  }
}
