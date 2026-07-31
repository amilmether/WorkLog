// services/api.js
// One place for all API calls. Every component imports functions from here.
// We create a single Axios instance with the base URL already set,
// so we never have to type "http://localhost:5000" in every component.

import axios from "axios";

// Use the environment variable in production, fallback to localhost in development
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// ── Users ────────────────────────────────────────────────
export const getUsers = () => api.get("/users");
export const getEmployees = () => api.get("/users/employees");
export const addUser = (userData) => api.post("/users", userData);

// ── Tasks ────────────────────────────────────────────────
export const getTasks = () => api.get("/tasks");
export const getTasksByEmployee = (userId) => api.get(`/tasks/employee/${userId}`);
export const addTask = (taskData) => api.post("/tasks", taskData);
// Only the status field is updated here, not the whole task
export const updateTaskStatus = (taskId, status) =>
  api.put(`/tasks/${taskId}/status`, { status });

// ── Reports ──────────────────────────────────────────────
export const getReports = () => api.get("/reports");
export const getReportsByEmployee = (userId) => api.get(`/reports/employee/${userId}`);
export const addReport = (reportData) => api.post("/reports", reportData);
