"use server";
import { getPool } from "./db/db";

export default async function storeTilgungsWechselInDb(
  newTilgung: number,
  year: number,
  calculationId: string,
) {
  const query = `
  INSERT INTO tilgungswechsel (calculation_id, amount, year)
  VALUES ($1, $2, $3)
  ON CONFLICT (calculation_id, year)
  DO UPDATE SET
  amount = EXCLUDED.amount;
  `;
  try {
    const pool = await getPool();
    const res = await pool.query(query, [calculationId, newTilgung, year]);
    return res.rows.length > 0;
  } catch (error) {
    console.error("Error storing tilgungswechsel in database:", error);
    throw error;
  }
}

export async function getTilgungsWechsel(
  calculationId: string,
): Promise<{ year: number; amount: number }[]> {
  const query = `
  SELECT year, amount
  FROM tilgungswechsel
  WHERE calculation_id = $1;
  `;
  try {
    const pool = await getPool();
    const res = await pool.query(query, [calculationId]);
    return res.rows.length > 0 ? res.rows : [];
  } catch (error) {
    console.error("Error fetching tilgungswechsel from database:", error);
    throw error;
  }
}
