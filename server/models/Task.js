// models/Task.js
// Defines a Task document. Tasks are created by admins and assigned to employees.

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    // assignedTo stores the _id of the employee this task belongs to
    // "ref: 'User'" lets Mongoose join with the User collection (populate)
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
