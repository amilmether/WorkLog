// seed.js
// Run this script ONCE to insert dummy data into the database.
// Command: node seed.js
// It will clear existing data and insert fresh sample records.

const mongoose = require("mongoose");
require("dotenv").config();

const User   = require("./models/User");
const Task   = require("./models/Task");
const Report = require("./models/Report");

const seed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // ── Clear existing data ──────────────────────────────
    await User.deleteMany({});
    await Task.deleteMany({});
    await Report.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // ── Insert Users ─────────────────────────────────────
    const users = await User.insertMany([
      { name: "Alice Admin",  email: "admin@worklog.com",  role: "admin"    },
      { name: "Bob Wilson",   email: "bob@worklog.com",    role: "employee" },
      { name: "Sara Singh",   email: "sara@worklog.com",   role: "employee" },
      { name: "James Carter", email: "james@worklog.com",  role: "employee" },
    ]);
    console.log("👤 Users inserted:", users.map(u => u.name).join(", "));

    // Grab employee IDs for task assignment
    const bob   = users.find(u => u.email === "bob@worklog.com");
    const sara  = users.find(u => u.email === "sara@worklog.com");
    const james = users.find(u => u.email === "james@worklog.com");

    // ── Insert Tasks ─────────────────────────────────────
    const tasks = await Task.insertMany([
      {
        title: "Fix login page bug",
        description: "The login button doesn't respond on mobile screens",
        assignedTo: bob._id,
        status: "In Progress",
      },
      {
        title: "Design dashboard UI",
        description: "Create wireframes for the new admin dashboard",
        assignedTo: sara._id,
        status: "Completed",
      },
      {
        title: "Write API documentation",
        description: "Document all REST endpoints using Postman",
        assignedTo: james._id,
        status: "Pending",
      },
      {
        title: "Set up MongoDB Atlas",
        description: "Configure cloud database and connect to the backend",
        assignedTo: bob._id,
        status: "Completed",
      },
      {
        title: "Build employee report form",
        description: "Create the daily report submission form in React",
        assignedTo: sara._id,
        status: "In Progress",
      },
      {
        title: "Test all API endpoints",
        description: "Use Postman to test GET, POST, PUT routes",
        assignedTo: james._id,
        status: "Pending",
      },
    ]);
    console.log("📋 Tasks inserted:", tasks.map(t => t.title).join(", "));

    // ── Insert Daily Reports ──────────────────────────────
    const reports = await Report.insertMany([
      {
        employee: bob._id,
        date: "2026-07-28",
        hoursWorked: 8,
        completedWork: "Fixed the mobile login bug and tested on 3 devices",
        problems: "CSS flexbox issue on Safari — took extra time",
        tomorrowPlan: "Start writing unit tests for the login component",
      },
      {
        employee: sara._id,
        date: "2026-07-28",
        hoursWorked: 7,
        completedWork: "Completed all dashboard wireframes and shared with team",
        problems: "None",
        tomorrowPlan: "Convert wireframes into React components",
      },
      {
        employee: james._id,
        date: "2026-07-28",
        hoursWorked: 6,
        completedWork: "Documented 5 API endpoints in Postman",
        problems: "PUT /tasks/:id/status was returning old data — reported to Bob",
        tomorrowPlan: "Document remaining 4 endpoints and add examples",
      },
      {
        employee: bob._id,
        date: "2026-07-29",
        hoursWorked: 8,
        completedWork: "Connected MongoDB Atlas to backend, tested all CRUD operations",
        problems: "SRV DNS blocked on office network — switched to standard URI",
        tomorrowPlan: "Review Sara's React components and give feedback",
      },
      {
        employee: sara._id,
        date: "2026-07-29",
        hoursWorked: 8,
        completedWork: "Built TaskTable and ReportTable components",
        problems: "None",
        tomorrowPlan: "Integrate components with API calls",
      },
    ]);
    console.log("📄 Reports inserted:", reports.length, "reports");

    // ── Summary ───────────────────────────────────────────
    console.log("\n✅ Seed complete! Summary:");
    console.log("   Users  :", users.length);
    console.log("   Tasks  :", tasks.length);
    console.log("   Reports:", reports.length);
    console.log("\n📧 Login emails:");
    users.forEach(u => console.log(`   ${u.role.padEnd(8)} → ${u.email}`));

  } catch (error) {
    console.error("❌ Seed failed:", error.message);
  } finally {
    // Always disconnect after seeding
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
  }
};

seed();
