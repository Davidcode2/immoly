import {
  integer,
  varchar,
  pgTable,
  decimal,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const calculations = pgTable("calculations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  principal: integer().notNull(),
  interest_rate: decimal({ precision: 8, scale: 4 }).notNull(),
  monthly_rate: integer().notNull(),
  down_payment: integer().default(0),
  rent: integer().default(0),
  annual_percentage_rate: integer().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const sondertilgungen = pgTable(
  "sondertilgungen",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    calculation_id: integer()
      .notNull()
      .references(() => calculations.id, { onDelete: "cascade" }),
    amount: integer().notNull(),
    year: integer().notNull(),
  },
  (t) => [unique().on(t.year, t.calculation_id)],
);

export const tilgungswechsel = pgTable(
  "tilgungswechsel",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    calculation_id: integer()
      .notNull()
      .references(() => calculations.id, { onDelete: "cascade" }),
    amount: integer().notNull(),
    year: integer().notNull(),
  },
  (t) => [unique().on(t.year, t.calculation_id)],
);

export const customer = pgTable("customer", {
  id: uuid().primaryKey().defaultRandom(),
  customer_name: varchar({ length: 30 }).notNull().unique(),
});

export const config = pgTable("config", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  customer_id: uuid()
    .notNull()
    .unique()
    .references(() => customer.id, { onDelete: "cascade" }),
});

export const theme = pgTable("theme", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 30 }).notNull(),
  config_id: integer()
    .notNull()
    .references(() => config.id, { onDelete: "cascade" }),
  background: varchar({ length: 30 }),
  foreground: varchar({ length: 30 }),
  ultra_accent: varchar({ length: 30 }),
  dark_accent: varchar({ length: 30 }),
  neutral_accent: varchar({ length: 30 }),
  accent: varchar({ length: 30 }),
  strong_accent: varchar({ length: 30 }),
  light_accent: varchar({ length: 30 }),
  ultralight_accent: varchar({ length: 30 }),
  muted_accent: varchar({ length: 30 }),
  grey_accent: varchar({ length: 30 }),
  primary: varchar({ length: 30 }),
  secondary: varchar({ length: 30 }),
  success: varchar({ length: 30 }),
  dark_success: varchar({ length: 30 }),
  alert: varchar({ length: 30 }),
});
