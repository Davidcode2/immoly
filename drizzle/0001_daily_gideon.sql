CREATE TABLE "tilgungswechsel" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tilgungswechsel_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"calculation_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"year" integer NOT NULL,
	CONSTRAINT "tilgungswechsel_year_calculation_id_unique" UNIQUE("year","calculation_id")
);
--> statement-breakpoint
ALTER TABLE "tilgungswechsel" ADD CONSTRAINT "tilgungswechsel_calculation_id_calculations_id_fk" FOREIGN KEY ("calculation_id") REFERENCES "public"."calculations"("id") ON DELETE cascade ON UPDATE no action;