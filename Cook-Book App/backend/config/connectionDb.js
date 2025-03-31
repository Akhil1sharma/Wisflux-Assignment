const mongoose = require("mongoose");

// Connect to MongoDB
const connectDb = async () => {
    await mongoose.connect(process.env.CONNECTION_STRING) // Use env connection string
    .then(() => console.log("connected...")) // Log success message
    .catch((error) => console.error("Connection failed:", error)); // Handle errors
};

// Export function
module.exports = connectDb