import { getPool } from "./db/db";

export default async function getConfig(configId: number) {
  const pool = await getPool();
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    console.warn(
      "Skipping static generation for calculations due to SKIP_BUILD_STATIC_GENERATION flag.",
    );
    return []; 
  }
  try {
    const query = `
      SELECT * FROM config WHERE id = ${configId};
    `;
    const result = await pool!.query(query);
    return result.rows.length > 0 ? (result.rows) : null;
  } catch (error) {
    console.error("Error fetching calculations:", error);
    return null;
  }
}

export async function getThemeByCustomerId(customerId: string) {
  const pool = await getPool();
  try {
    const query = `
      SELECT theme.*
      FROM customer
      JOIN config ON config.customer_id = customer.id
      JOIN theme ON theme.config_id = config.id
      WHERE customer.id = $1
      LIMIT 1
    `;
    const result = await pool!.query(query, [customerId]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error fetching theme:", error);
    return null;
  }
}
