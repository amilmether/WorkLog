// controllers/taskController.js
// Contains the logic for task-related API endpoints.

const Task = require("../models/Task");

// GET /tasks — return all tasks, with employee name populated
const getTasks = async (req, res) => {
  try {
    // .populate("assignedTo", "name email") replaces the stored ObjectId
    // with the actual name and email fields from the User collection
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to get tasks", error: error.message });
  }
};

// GET /tasks/employee/:userId — return tasks assigned to one employee
const getTasksByEmployee = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId })
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to get tasks", error: error.message });
  }
};

// POST /tasks — admin creates a new task
const addTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    if (!title || !assignedTo) {
      return res.status(400).json({ message: "Title and assignedTo are required" });
    }

    const newTask = new Task({ title, description, assignedTo });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to add task", error: error.message });
  }
};

// PUT /tasks/:id/status — employee updates their task status
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};

module.exports = { getTasks, getTasksByEmployee, addTask, updateTaskStatus };
