const express = require("express");
const {
    getRecipes,
    getRecipe,
   
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



module.exports = router;
