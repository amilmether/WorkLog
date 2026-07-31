// models/User.js
// Defines the shape of a User document in MongoDB.
// A user can be either an "admin" or an "employee".

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have the same email
      trim: true,
    },
    // role decides what the user can see in the app
    role: {
      type: String,
      enum: ["admin", "employee"], // Only these two values are allowed
      default: "employee",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
