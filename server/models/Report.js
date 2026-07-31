// models/Report.js
// Defines a Daily Report document submitted by an employee.

const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    // Which employee submitted this report
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String, // stored as "YYYY-MM-DD" string for simplicity
      required: true,
    },
    hoursWorked: {
      type: Number,
      required: true,
    },
    completedWork: {
      type: String,
      required: true,
    },
    problems: {
      type: String,
      default: "None",
    },
    tomorrowPlan: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
