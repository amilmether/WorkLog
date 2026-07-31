// controllers/reportController.js
// Contains the logic for daily report API endpoints.

const Report = require("../models/Report");

// GET /reports — return all reports (admin view), with employee name
const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("employee", "name email")
      .sort({ date: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to get reports", error: error.message });
  }
};

// GET /reports/employee/:userId — reports submitted by one employee
const getReportsByEmployee = async (req, res) => {
  try {
    const reports = await Report.find({ employee: req.params.userId })
      .populate("employee", "name email")
      .sort({ date: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to get reports", error: error.message });
  }
};

// POST /reports — employee submits a daily report
const addReport = async (req, res) => {
  try {
    const { employee, date, hoursWorked, completedWork, problems, tomorrowPlan } = req.body;

    if (!employee || !date || !hoursWorked || !completedWork) {
      return res.status(400).json({ message: "Employee, date, hoursWorked and completedWork are required" });
    }

    const newReport = new Report({
      employee,
      date,
      hoursWorked,
      completedWork,
      problems,
      tomorrowPlan,
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: "Failed to add report", error: error.message });
  }
};

module.exports = { getReports, getReportsByEmployee, addReport };
