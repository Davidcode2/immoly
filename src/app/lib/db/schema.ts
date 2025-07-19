import { integer, pgTable, decimal, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("calculations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  principal: integer().notNull(),
  interest_rate: decimal({ precision: 8, scale: 4 })
    .notNull(),
  monthly_rate: integer().notNull(),
  down_payment: integer().default(0),
  rent: integer().default(0),
  annual_percentage_rate: integer().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
