import express from "express";
import { ENV } from "./config/env.js";
import { db } from './config/db.js';
import { favoriteRecipes } from "./db/schema.js";
import { and, eq } from "drizzle-orm";
const app = express();
const PORT = ENV.PORT|| 5001;
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: true });
});

app.post("/api/favorite", async(req, res) => {
  try {
    const {userId,recipeId, title, image,cookTime , servings} = req.body;
    if(!userId || !recipeId || !title ){
      return res.status(400).json({ status: false, message: "Missing required fields" });
    }
   const newFavorite = await db.insert(favoriteRecipes).values({userId,recipeId,title,image,cookTime,servings}).returning();
    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.error("Error adding favorite recipe:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

app.delete("/api/favorite/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    if (!userId || !recipeId) {
      return res.status(400).json({ status: false, message: "Missing required parameters" });
    }
    await db.delete(favoriteRecipes).where(and(eq(favoriteRecipes.userId,userId), eq(favoriteRecipes.recipeId, parseInt(recipeId))));
    res.status(200).json({ status: true, message: "Favorite recipe deleted successfully" });
  } catch (error) {
    console.error("Error removing favorite recipe:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

app.get("/api/favorite/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ status: false, message: "Missing required parameter" });
    }
    const userFavorites = await db.select()
      .from(favoriteRecipes)
      .where(eq(favoriteRecipes.userId, userId));
    res.status(200).json(userFavorites);
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port :`, PORT);
});