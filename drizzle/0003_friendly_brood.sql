CREATE TABLE "sondertilgungen" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sondertilgungen_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"calculation_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"year" integer NOT NULL,
	CONSTRAINT "sondertilgungen_year_unique" UNIQUE("year")
);
--> statement-breakpoint
ALTER TABLE "sondertilgungen" ADD CONSTRAINT "sondertilgungen_calculation_id_calculations_id_fk" FOREIGN KEY ("calculation_id") REFERENCES "public"."calculations"("id") ON DELETE cascade ON UPDATE no action;