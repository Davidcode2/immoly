ALTER TABLE "calculations" ALTER COLUMN "annual_percentage_rate" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "calculations" ALTER COLUMN "annual_percentage_rate" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "calculations" ALTER COLUMN "annual_percentage_rate" SET NOT NULL;