// pages/TasksPage.jsx
// Employee-only page. Shows the tasks assigned to the logged-in employee.
// Each task has a status dropdown so the employee can update their progress.
// Also has a button to go to the daily report submission page.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskTable from "../components/TaskTable";
import { getTasksByEmployee } from "../services/api";

function TasksPage() {
  const navigate = useNavigate();

  // Get the logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("worklog_user"));

  // Redirect if not logged in or is admin
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.role === "admin") {
      navigate("/dashboard");
    }
  }, []);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load this employee's tasks
  const loadTasks = async () => {
    try {
      const res = await getTasksByEmployee(user._id);
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadTasks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">My Tasks</h2>
          {/* Quick link to submit today's report */}
          <button
            className="btn btn-primary"
            onClick={() => navigate("/report")}
          >
            📄 Submit Daily Report
          </button>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <div className="card">
            {/* Pass onStatusChange so employee can update task status inline */}
            <TaskTable
              tasks={tasks}
              showEmployee={false}
              onStatusChange={loadTasks}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TasksPage;
