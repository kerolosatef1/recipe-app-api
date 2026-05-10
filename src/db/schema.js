import {pgTable,serial,text,timestamp,integer} from "drizzle-orm/pg-core";
export const favoriteRecipes = pgTable("favorite_recipes",{
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull(),
    recipeId: integer("recipe_id").notNull(),
    cookTime: integer("cooktime"),
    image: text("image"),
    title: text("title").notNull(),
    createdAt: timestamp("created_at").defaultNow(), 

})