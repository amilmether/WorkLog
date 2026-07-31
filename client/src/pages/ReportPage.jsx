// pages/ReportPage.jsx
// Employee-only page. Lets the employee fill in and submit their daily report.
// After submission, they are redirected back to their tasks page.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addReport, getReportsByEmployee } from "../services/api";

function ReportPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("worklog_user"));

  useEffect(() => {
    if (!user) navigate("/");
    else if (user.role === "admin") navigate("/dashboard");
  }, []);

  // Form fields — initialized with sensible defaults
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  const [date, setDate] = useState(today);
  const [hoursWorked, setHoursWorked] = useState("");
  const [completedWork, setCompletedWork] = useState("");
  const [problems, setProblems] = useState("");
  const [tomorrowPlan, setTomorrowPlan] = useState("");
  const [message, setMessage] = useState("");

  // Past reports submitted by this employee
  const [pastReports, setPastReports] = useState([]);

  useEffect(() => {
    if (user) {
      getReportsByEmployee(user._id)
        .then((res) => setPastReports(res.data))
        .catch(() => {});
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReport({
        employee: user._id,
        date,
        hoursWorked: Number(hoursWorked),
        completedWork,
        problems,
        tomorrowPlan,
      });
      setMessage("✅ Report submitted successfully!");
      // Clear form
      setHoursWorked("");
      setCompletedWork("");
      setProblems("");
      setTomorrowPlan("");
      // Refresh past reports list
      const res = await getReportsByEmployee(user._id);
      setPastReports(res.data);
    } catch (err) {
      setMessage("❌ Failed to submit report. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Daily Report</h2>
          <button className="btn btn-secondary" onClick={() => navigate("/tasks")}>
            ← Back to Tasks
          </button>
        </div>

        {message && <p className="flash-msg">{message}</p>}

        <div className="two-col">
          {/* ── Submit Form ── */}
          <div className="card">
            <h3>📝 Submit Today's Report</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Hours Worked</label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  placeholder="8"
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Completed Work</label>
                <textarea
                  rows={3}
                  placeholder="What did you finish today?"
                  value={completedWork}
                  onChange={(e) => setCompletedWork(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Problems Faced</label>
                <textarea
                  rows={2}
                  placeholder="Any blockers or issues? (optional)"
                  value={problems}
                  onChange={(e) => setProblems(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Tomorrow's Plan</label>
                <textarea
                  rows={2}
                  placeholder="What will you work on tomorrow?"
                  value={tomorrowPlan}
                  onChange={(e) => setTomorrowPlan(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                Submit Report
              </button>
            </form>
          </div>

          {/* ── Past Reports ── */}
          <div className="card">
            <h3>📂 My Previous Reports</h3>
            {pastReports.length === 0 ? (
              <p className="empty-msg">No reports yet.</p>
            ) : (
              pastReports.map((r) => (
                <div key={r._id} className="report-item">
                  <p><strong>{r.date}</strong> — {r.hoursWorked}h worked</p>
                  <p>✅ {r.completedWork}</p>
                  {r.problems && r.problems !== "None" && (
                    <p>⚠️ {r.problems}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
