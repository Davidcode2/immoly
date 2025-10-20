CREATE TABLE "calculations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "calculations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"principal" integer NOT NULL,
	"interest_rate" numeric(8, 4) NOT NULL,
	"monthly_rate" integer NOT NULL,
	"down_payment" integer DEFAULT 0,
	"rent" integer DEFAULT 0,
	"annual_percentage_rate" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "config" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "config_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"customer_id" uuid NOT NULL,
	CONSTRAINT "config_customer_id_unique" UNIQUE("customer_id")
);
--> statement-breakpoint
CREATE TABLE "customer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_name" varchar(30)
);
--> statement-breakpoint
CREATE TABLE "customer_url" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "customer_url_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"customer_id" uuid NOT NULL,
	"url" varchar(100) NOT NULL,
	CONSTRAINT "customer_url_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "sondertilgungen" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sondertilgungen_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"calculation_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"year" integer NOT NULL,
	CONSTRAINT "sondertilgungen_year_calculation_id_unique" UNIQUE("year","calculation_id")
);
--> statement-breakpoint
CREATE TABLE "theme" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "theme_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(30) NOT NULL,
	"config_id" integer NOT NULL,
	"background" varchar(30),
	"foreground" varchar(30),
	"ultra_accent" varchar(30),
	"dark_accent" varchar(30),
	"neutral_accent" varchar(30),
	"accent" varchar(30),
	"strong_accent" varchar(30),
	"light_accent" varchar(30),
	"ultralight_accent" varchar(30),
	"muted_accent" varchar(30),
	"grey_accent" varchar(30),
	"primary" varchar(30),
	"secondary" varchar(30),
	"success" varchar(30),
	"dark_success" varchar(30),
	"alert" varchar(30)
);
--> statement-breakpoint
CREATE TABLE "tilgungswechsel" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tilgungswechsel_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"calculation_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"year" integer NOT NULL,
	CONSTRAINT "tilgungswechsel_year_calculation_id_unique" UNIQUE("year","calculation_id")
);
--> statement-breakpoint
ALTER TABLE "config" ADD CONSTRAINT "config_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_url" ADD CONSTRAINT "customer_url_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sondertilgungen" ADD CONSTRAINT "sondertilgungen_calculation_id_calculations_id_fk" FOREIGN KEY ("calculation_id") REFERENCES "public"."calculations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "theme" ADD CONSTRAINT "theme_config_id_config_id_fk" FOREIGN KEY ("config_id") REFERENCES "public"."config"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tilgungswechsel" ADD CONSTRAINT "tilgungswechsel_calculation_id_calculations_id_fk" FOREIGN KEY ("calculation_id") REFERENCES "public"."calculations"("id") ON DELETE cascade ON UPDATE no action;