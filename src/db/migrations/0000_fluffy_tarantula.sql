CREATE TABLE "favorite_recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"recipe_id" integer NOT NULL,
	"cooktime" integer,
	"image" text,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
