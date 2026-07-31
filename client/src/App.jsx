// App.jsx
// Root component. Sets up React Router and maps URLs to pages.
// No Navbar here — each page includes its own Navbar (except LoginPage).

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks"     element={<TasksPage />} />
        <Route path="/report"    element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
