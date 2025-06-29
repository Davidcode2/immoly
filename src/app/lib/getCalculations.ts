'use server';

import { connect, disconnect } from "./db";
import CalculationResult from "./models/CalculationResult";

export default async function getCalculations() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    console.warn('Skipping static generation for calculations due to SKIP_BUILD_STATIC_GENERATION flag.');
    return [] as CalculationResult[];
  }
  const client = await connect();
  try {
    const query = `
      SELECT id, principal, interest_rate, monthly_rate, down_payment, rent, annual_percentage_rate, created_at
      FROM calculations;
    `;
    const result = await client.query(query);
    return result.rows.length > 0 ? result.rows as CalculationResult[] : null;
  } catch (error) {
    console.error('Error fetching calculations:', error);
    return null;
  } finally {
    await disconnect();
  }
}

export async function getCalculation(id: string): Promise<CalculationResult[] | null> {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    console.warn('Skipping static generation for calculations due to SKIP_BUILD_STATIC_GENERATION flag.');
    return [] as CalculationResult[];
  }
  const client = await connect();
  try {
    const query = `
      SELECT id, principal, interest_rate, monthly_rate, down_payment, rent, annual_percentage_rate, created_at
      FROM calculations WHERE id = $1;
    `;
    const result = await client.query(query, [id]);
    return result.rows.length > 0 ? result.rows as CalculationResult[] : null;
  } catch (error) {
    console.error('Error fetching calculations:', error);
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
    console.error('Error deleting calculation:', error);
    return null;
  } finally {
    await disconnect();
  }
}
