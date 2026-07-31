// components/Navbar.jsx
// Simple top navigation bar shown on every page.
// It reads the logged-in user from localStorage and shows their name and role.
// The logout button clears localStorage and redirects to the login page.

import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // We saved the user object to localStorage when they "logged in"
  const user = JSON.parse(localStorage.getItem("worklog_user"));

  const handleLogout = () => {
    localStorage.removeItem("worklog_user");
    navigate("/"); // Go back to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">📋 WorkLog</div>
      <div className="navbar-right">
        {user && (
          <>
            <span className="navbar-user">
              👤 {user.name}{" "}
              <span className={`role-badge role-${user.role}`}>{user.role}</span>
            </span>
            <button className="btn btn-sm btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
