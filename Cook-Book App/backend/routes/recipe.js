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

// Forkify API Base URL for fetching recipe suggestions
const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes?search=";

// Route to get all recipes
router.get("/", getRecipes);

// Route to get a single recipe by ID
router.get("/:id", getRecipe);

// Route to add a new recipe (requires authentication & file upload)
router.post("/", upload.single('file'), verifyToken, addRecipe);

// Route to edit an existing recipe (with file upload)
router.put("/:id", upload.single('file'), editRecipe);

// Route to delete a recipe by ID
router.delete("/:id", deleteRecipe);

// Route to get recipe name suggestions from Forkify API
router.get("/suggestions/:query", async (req, res) => {
    try {
        const { query } = req.params;

        // Ensure query parameter is provided
        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        // Fetch suggestions from Forkify API
        const response = await axios.get(`${API_URL}${query}`);

        // Extract and return recipe names
        const suggestions = response.data.data.recipes.map(recipe => recipe.title);

        res.json({ suggestions });
    } catch (error) {
        console.error("Error fetching recipe suggestions:", error);
        res.status(500).json({ error: "Failed to fetch suggestions" });
    }
});

module.exports = router;
