import { integer, pgTable, decimal, timestamp } from "drizzle-orm/pg-core";

export const calculations = pgTable("calculations", {
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

export const sondertilgungen = pgTable("sondertilgungen", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  calculation_id: integer()
    .notNull()
    .references(() => calculations.id, { onDelete: "cascade" }),
  amount: integer().notNull(),
  year: integer().notNull().unique()
});
