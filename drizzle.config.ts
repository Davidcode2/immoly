import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/app/lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_CONNECTION_STRING!,
    ssl: process.env.NODE_ENV === 'production' ? true : false,
  },
});
