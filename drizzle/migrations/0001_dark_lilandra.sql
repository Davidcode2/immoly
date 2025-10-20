CREATE TABLE "config_theme" (
	"config_id" integer NOT NULL,
	"theme_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "theme" DROP CONSTRAINT "theme_config_id_config_id_fk";
--> statement-breakpoint
ALTER TABLE "config_theme" ADD CONSTRAINT "config_theme_config_id_config_id_fk" FOREIGN KEY ("config_id") REFERENCES "public"."config"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "config_theme" ADD CONSTRAINT "config_theme_theme_id_theme_id_fk" FOREIGN KEY ("theme_id") REFERENCES "public"."theme"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "theme" DROP COLUMN "config_id";