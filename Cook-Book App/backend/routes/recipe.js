const express = require("express");
const {
    getRecipes,
    getRecipe,
    addRecipe,
    editRecipe,
    deleteRecipe,
    upload
} = require("../controller/recipe");

const verifyToken = require("../middleware/auth");
const axios = require("axios");

const router = express.Router();

// Forkify API Base URL
const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes?search=";

// Get all recipes
router.get("/", getRecipes);

// Get recipe by ID
router.get("/:id", getRecipe);

// Add recipe (with file upload & authentication)
router.post("/", upload.single('file'), verifyToken, addRecipe);

// Edit recipe (with file upload)
router.put("/:id", upload.single('file'), editRecipe);

// Delete recipe
router.delete("/:id", deleteRecipe);

// Get recipe name suggestions from Forkify API
router.get("/suggestions/:query", async (req, res) => {
    try {
        const { query } = req.params;
        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        // Fetch suggestions from Forkify API
        const response = await axios.get(`${API_URL}${query}`);

        // Extract recipe names
        const suggestions = response.data.data.recipes.map(recipe => recipe.title);

        res.json({ suggestions });
    } catch (error) {
        console.error("Error fetching recipe suggestions:", error);
        res.status(500).json({ error: "Failed to fetch suggestions" });
    }
});

module.exports = router;
