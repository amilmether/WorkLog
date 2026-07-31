// index.js
// The main entry point for the WorkLog backend server.
// Sets up Express, middleware, routes, and starts listening.

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");
const reportRoutes = require("./routes/reports");

const app = express();

// ── Middleware ──────────────────────────────────────────────
// Allow ALL origins — works for local dev, Vercel, Postman, everywhere
app.use(cors());

// express.json() lets us read JSON from req.body on POST/PUT requests
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/reports", reportRoutes);

// Simple health-check route
app.get("/", (req, res) => {
  res.send("WorkLog API is running 🚀");
});

// ── Start Server ────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();           // Connect to MongoDB first
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
