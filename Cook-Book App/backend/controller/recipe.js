const Recipes = require("../models/recipe");
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images"); // Save files in the images directory
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + "-" + file.fieldname; // Unique filename
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// Get all recipes
const getRecipes = async (req, res) => {
    const recipes = await Recipes.find();
    return res.json(recipes);
};

// Get a single recipe by ID
const getRecipe = async (req, res) => {
    const recipe = await Recipes.findById(req.params.id);
    res.json(recipe);
};

// Add a new recipe
const addRecipe = async (req, res) => {
    console.log(req.user);
    const { title, ingredients, instructions, time } = req.body;

    // Validate required fields
    if (!title || !ingredients || !instructions) {
        return res.json({ message: "Required fields can't be empty" });
    }

    // Create a new recipe
    const newRecipe = await Recipes.create({
        title,
        ingredients,
        instructions,
        time,
        coverImage: req.file.filename,
        createdBy: req.user.id
    });

    return res.json(newRecipe);
};

// Edit an existing recipe
const editRecipe = async (req, res) => {
    const { title, ingredients, instructions, time } = req.body;
    let recipe = await Recipes.findById(req.params.id);

    try {
        if (recipe) {
            let coverImage = req.file?.filename ? req.file.filename : recipe.coverImage;
            await Recipes.findByIdAndUpdate(req.params.id, { ...req.body, coverImage }, { new: true });
            res.json({ title, ingredients, instructions, time });
        }
    } catch (err) {
        return res.status(404).json({ message: err });
    }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
    try {
        await Recipes.deleteOne({ _id: req.params.id });
        res.json({ status: "ok" });
    } catch (err) {
        return res.status(400).json({ message: "Error" });
    }
};

// Export functions
module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload };
