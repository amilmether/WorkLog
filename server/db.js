// db.js
// Connects our Express server to MongoDB using Mongoose.
// We call this once at startup in index.js.

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Stop the server if DB fails to connect
  }
};

module.exports = connectDB;
