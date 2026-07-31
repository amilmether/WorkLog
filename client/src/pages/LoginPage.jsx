// pages/LoginPage.jsx
// Simple login page. No passwords — the user just picks their email from the list.
// This is intentionally basic since the project doesn't need real authentication.
// We store the selected user in localStorage so other pages can read it.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/api";

function LoginPage() {
  const navigate = useNavigate();

  // List of users fetched from the database
  const [users, setUsers] = useState([]);

  // The email the user typed / selected
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  // Fetch all users when the page loads so we can match the email
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch (err) {
        setError("Could not load users. Is the server running?");
      }
    };
    fetchUsers();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Find the user whose email matches what was typed
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (!foundUser) {
      setError("No user found with that email. Check the sample data.");
      return;
    }

    // Save user to localStorage — other pages read this to know who is logged in
    localStorage.setItem("worklog_user", JSON.stringify(foundUser));

    // Redirect based on role
    if (foundUser.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/tasks");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>📋 WorkLog</h1>
        <p className="login-subtitle">Daily Task &amp; Report System</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Enter your email to log in</label>
            <input
              type="email"
              placeholder="e.g. admin@worklog.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="btn btn-primary btn-full">
            Login
          </button>
        </form>

        {/* Show registered emails so testers know what to type */}
        {users.length > 0 && (
          <div className="hint-box">
            <p><strong>Registered emails:</strong></p>
            {users.map((u) => (
              <p key={u._id} className="hint-email">
                {u.email}{" "}
                <span className={`role-badge role-${u.role}`}>{u.role}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
