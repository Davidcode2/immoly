import { Pool } from "pg";
//import { drizzle } from 'drizzle-orm/node-postgres';

const dbConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT, 10)
    : 5432,
};

declare const global: typeof globalThis & {
  pool?: Pool;
};

//const db = drizzle(process.env.DATABASE_URL!);

let pool: Pool | null = null;

export async function getPool() {
  if (!pool) {
    if (process.env.NODE_ENV === "production") {
      pool = new Pool(dbConfig);
    } else {
      if (!global.pool) {
        global.pool = new Pool(dbConfig);
      }
      pool = global.pool;
    }
    pool = new Pool(dbConfig);
    await pool.connect();
    console.log("Connected to PostgreSQL");
  }
  return pool;
}

export default pool;
