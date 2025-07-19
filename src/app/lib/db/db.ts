import { Client } from 'pg';
//import { drizzle } from 'drizzle-orm/node-postgres';

const dbConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
};


//const db = drizzle(process.env.DATABASE_URL!);

let pool: Client | null = null;

async function connect() {
  if (!pool) {
    pool = new Client(dbConfig);
    await pool.connect();
    console.log('Connected to PostgreSQL');
  }
  return pool;
}

async function disconnect() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('Disconnected from PostgreSQL');
  }
}

export { connect, disconnect };
