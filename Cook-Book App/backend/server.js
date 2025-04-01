




const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectionDb");
const cors = require("cors");

const app = express();

// Connect to Database
connectDb();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.static("public")); // Serve static files from the "public" folder

// Routes
app.use("/", require("./routes/user")); // User routes
app.use("/api/recipes", require("./routes/recipe")); // Recipe routes

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
