import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/migrations',
  schema: './src/app/lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
    ssl: process.env.NODE_ENV === 'production' ? true : false,
  },
});
