const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("MongoDB connected...");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDb;