// routes/reports.js
// Defines the URL endpoints for daily report operations.

const express = require("express");
const router = express.Router();
const {
  getReports,
  getReportsByEmployee,
  addReport,
} = require("../controllers/reportController");

router.get("/", getReports);                              // GET  /reports
router.get("/employee/:userId", getReportsByEmployee);   // GET  /reports/employee/:userId
router.post("/", addReport);                             // POST /reports

module.exports = router;
