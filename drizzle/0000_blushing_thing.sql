CREATE TABLE "calculations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "calculations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"principal" integer NOT NULL,
	"interest_rate" integer,
	"monthly_rate" integer NOT NULL,
	"down_payment" integer DEFAULT 0,
	"rent" integer DEFAULT 0,
	"annual_percentage_rate" numeric(8, 4) DEFAULT '0.00' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
