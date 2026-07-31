// controllers/userController.js
// Contains the logic for user-related API endpoints.
// Controllers keep the route files clean — routes just call these functions.

const User = require("../models/User");

// GET /users — return all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users", error: error.message });
  }
};

// GET /users/employees — return only employees (used to populate dropdowns)
const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to get employees", error: error.message });
  }
};

// POST /users — create a new user
const addUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const newUser = new User({ name, email, role });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    // Handle duplicate email error from MongoDB
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Failed to add user", error: error.message });
  }
};

module.exports = { getUsers, getEmployees, addUser };
