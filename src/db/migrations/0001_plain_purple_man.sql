ALTER TABLE "favorite_recipes" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "favorite_recipes" ADD COLUMN "servings" integer;