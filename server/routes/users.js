// routes/users.js
// Defines the URL endpoints for user operations.
// The actual logic lives in userController.js.

const express = require("express");
const router = express.Router();
const { getUsers, getEmployees, addUser } = require("../controllers/userController");

router.get("/", getUsers);                  // GET  /users
router.get("/employees", getEmployees);     // GET  /users/employees
router.post("/", addUser);                  // POST /users

module.exports = router;
