"use server";
import { connect, disconnect } from "./db/db";

export async function updateSondertilgungInDb(
  calculationId: number,
  year: number,
  amount: number,
) {
  try {
    if (amount <= 0) {
      const res = await deleteSondertilgungFromDb(calculationId, year);
      return res;
    }
    storeSonderTilgungInDb(calculationId, amount, year);
  } catch (error) {
    console.error("Error updating sondertilgung in database:", error);
  }
}

export async function getSondertilgungen(calculationId: string) {
  const query = `SELECT * FROM sondertilgungen WHERE calculation_id = $1`;
  const client = await connect();
  try {
    const res = await client.query(query, [calculationId]);
    if (res && res.rows) {
      return res.rows;
    }
    console.warn("No sondertilgungen found for the given calculation ID");
    return [];
  } catch (error) {
    console.error("Error fetching sondertilgungen from database:", error);
  } finally {
    await disconnect();
  }
}

async function deleteSondertilgungFromDb(calculationId: number, year: number) {
  const client = await connect();
  const query = `DELETE FROM sondertilgungen WHERE calculation_id = $1 AND year = $2`;
  try {
    const res = await client.query(query, [calculationId, year]);
    if (res && res.rowCount) {
      return res.rowCount > 0 ? true : false;
    }
    console.warn("Failed to delete sondertilgung from the database");
    return false;
  } catch (error) {
    console.error("Error deleting sondertilgung from database:", error);
    throw error;
  } finally {
    await disconnect();
  }
}

async function storeSonderTilgungInDb(
  calculationId: number,
  amount: number,
  year: number,
) {
  const query = `
  INSERT INTO sondertilgungen (calculation_id, amount, year) 
  VALUES ($1, $2, $3) 
  ON CONFLICT (calculation_id, year)
  DO UPDATE SET
  amount = EXCLUDED.amount;`;

  const client = await connect();
  try {
    const res = await client.query(query, [calculationId, amount, year]);
    if (res && res.rowCount) {
      return res.rowCount > 0 ? true : false;
    }
    console.warn("Failed to insert sondertilgung into the database");
    return false;
  } catch (error) {
    console.error("Error storing sondertilgung in database:", error);
    throw error;
  } finally {
    await disconnect();
  }
}
