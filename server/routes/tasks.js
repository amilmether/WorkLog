// routes/tasks.js
// Defines the URL endpoints for task operations.

const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTasksByEmployee,
  addTask,
  updateTaskStatus,
} = require("../controllers/taskController");

router.get("/", getTasks);                              // GET  /tasks
router.get("/employee/:userId", getTasksByEmployee);   // GET  /tasks/employee/:userId
router.post("/", addTask);                             // POST /tasks
router.put("/:id/status", updateTaskStatus);           // PUT  /tasks/:id/status

module.exports = router;
