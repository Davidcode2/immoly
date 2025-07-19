ALTER TABLE "calculations" ALTER COLUMN "interest_rate" SET DATA TYPE numeric(8, 4);--> statement-breakpoint
ALTER TABLE "calculations" ALTER COLUMN "interest_rate" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "calculations" ALTER COLUMN "annual_percentage_rate" DROP NOT NULL;