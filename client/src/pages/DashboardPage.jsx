// pages/DashboardPage.jsx
// Admin-only page. Shows:
//   - Stats (total tasks, completed, pending, total employees)
//   - Form to add a new employee
//   - Form to create and assign a task
//   - Table of all tasks
//   - Table of all daily reports

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskTable from "../components/TaskTable";
import ReportTable from "../components/ReportTable";
import { getTasks, addTask, getEmployees, addUser, getReports } from "../services/api";

function DashboardPage() {
  const navigate = useNavigate();

  // Redirect non-admins away from this page
  const user = JSON.parse(localStorage.getItem("worklog_user"));
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, []);

  // ── State ──────────────────────────────────────────────
  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);
  const [employees, setEmployees] = useState([]);

  // New employee form fields
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // New task form fields
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [message, setMessage] = useState("");

  // ── Fetch data on page load ────────────────────────────
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [taskRes, reportRes, empRes] = await Promise.all([
        getTasks(),
        getReports(),
        getEmployees(),
      ]);
      setTasks(taskRes.data);
      setReports(reportRes.data);
      setEmployees(empRes.data);
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  // ── Add Employee ───────────────────────────────────────
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await addUser({ name: newName, email: newEmail, role: "employee" });
      setMessage(`✅ Employee "${newName}" added!`);
      setNewName("");
      setNewEmail("");
      loadData(); // Refresh employee list
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Failed to add employee"));
    }
  };

  // ── Create Task ────────────────────────────────────────
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await addTask({ title: taskTitle, description: taskDesc, assignedTo });
      setMessage(`✅ Task "${taskTitle}" created!`);
      setTaskTitle("");
      setTaskDesc("");
      setAssignedTo("");
      loadData();
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Failed to create task"));
    }
  };

  // ── Quick stats ────────────────────────────────────────
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h2 className="page-title">Admin Dashboard</h2>

        {message && <p className="flash-msg">{message}</p>}

        {/* ── Stats ── */}
        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-num">{employees.length}</div>
            <div className="stat-label">Employees</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">{totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-box stat-orange">
            <div className="stat-num">{pendingTasks}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-box stat-green">
            <div className="stat-num">{completedTasks}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        {/* ── Add Employee & Create Task side by side ── */}
        <div className="two-col">
          {/* Add Employee */}
          <div className="card">
            <h3>➕ Add Employee</h3>
            <form onSubmit={handleAddEmployee}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="jane@company.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Employee
              </button>
            </form>
          </div>

          {/* Create Task */}
          <div className="card">
            <h3>📝 Create Task</h3>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  placeholder="Fix login bug"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description (optional)</label>
                <input
                  type="text"
                  placeholder="Short description..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Assign To</label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  required
                >
                  <option value="">-- Select Employee --</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Create Task
              </button>
            </form>
          </div>
        </div>

        {/* ── All Tasks ── */}
        <div className="card">
          <h3>📋 All Tasks</h3>
          <TaskTable tasks={tasks} showEmployee={true} />
        </div>

        {/* ── Daily Reports ── */}
        <div className="card">
          <h3>📄 Daily Reports</h3>
          <ReportTable reports={reports} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
