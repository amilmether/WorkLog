# WorkLog – Simple Task & Daily Report System

A beginner-friendly MERN Stack web application built as an internship project.  
Employees can view assigned tasks and submit daily work reports. Admins can manage employees, assign tasks, and monitor all activity from a single dashboard.

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Seed Sample Data](#seed-sample-data)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
  - [Database – MongoDB Atlas](#database--mongodb-atlas)
  - [Backend – Render](#backend--render)
  - [Frontend – Vercel](#frontend--vercel)
- [Screenshots](#screenshots)
- [Sample Login Credentials](#sample-login-credentials)
- [Common Issues](#common-issues)
- [Future Improvements](#future-improvements)

---

## Problem Statement

Employees usually share their daily work updates through WhatsApp messages or verbal communication, making it difficult for managers to:

- Track which tasks are completed or pending
- Monitor daily progress across the team
- Keep a record of blockers and plans

---

## Solution

WorkLog is a simple web application where:

- **Admins** can add employees, assign tasks, and view all activity
- **Employees** can update their task status and submit a structured daily report

---

## Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Frontend   | React 18 (Vite)     |
| Backend    | Node.js + Express   |
| Database   | MongoDB + Mongoose  |
| HTTP Client| Axios               |
| Hosting    | Vercel + Render     |

---

## Features

### Admin
- Add new employees to the system
- Create tasks and assign them to employees
- View all tasks with status and assigned employee
- View all daily reports submitted by employees
- Dashboard with task statistics (total, pending, completed)

### Employee
- View only their own assigned tasks
- Update task status: `Pending` → `In Progress` → `Completed`
- Submit a daily work report with:
  - Date
  - Hours worked
  - Completed work summary
  - Problems faced
  - Tomorrow's plan
- View their own past reports

---

## Project Structure

```
worklog/
│
├── server/                         # Express backend
│   ├── controllers/
│   │   ├── userController.js       # Add/get users logic
│   │   ├── taskController.js       # Add/get/update tasks logic
│   │   └── reportController.js     # Add/get reports logic
│   ├── models/
│   │   ├── User.js                 # User schema (name, email, role)
│   │   ├── Task.js                 # Task schema (title, assignedTo, status)
│   │   └── Report.js               # Daily report schema
│   ├── routes/
│   │   ├── users.js                # /users endpoints
│   │   ├── tasks.js                # /tasks endpoints
│   │   └── reports.js              # /reports endpoints
│   ├── db.js                       # MongoDB connection
│   ├── index.js                    # Express server entry point
│   ├── seed.js                     # Script to insert sample data
│   ├── .env                        # Environment variables (not in git)
│   └── package.json
│
└── client/                         # React frontend
    ├── src/
    │   ├── services/
    │   │   └── api.js              # All Axios API functions
    │   ├── components/
    │   │   ├── Navbar.jsx          # Top navigation bar
    │   │   ├── TaskTable.jsx       # Reusable task table
    │   │   └── ReportTable.jsx     # Reusable reports table
    │   ├── pages/
    │   │   ├── LoginPage.jsx       # Email-based login
    │   │   ├── DashboardPage.jsx   # Admin dashboard
    │   │   ├── TasksPage.jsx       # Employee task view
    │   │   └── ReportPage.jsx      # Daily report form
    │   ├── App.jsx                 # React Router setup
    │   ├── main.jsx                # App entry point
    │   └── index.css               # Global styles
    ├── index.html
    ├── vite.config.js
    ├── .env                        # Frontend environment variables
    └── package.json
```

---

## Database Schema

### User
```
{
  name      : String (required)
  email     : String (required, unique)
  role      : String (enum: "admin" | "employee", default: "employee")
  createdAt : Date (auto)
  updatedAt : Date (auto)
}
```

### Task
```
{
  title      : String (required)
  description: String
  assignedTo : ObjectId → ref: User (required)
  status     : String (enum: "Pending" | "In Progress" | "Completed", default: "Pending")
  createdAt  : Date (auto)
  updatedAt  : Date (auto)
}
```

### Report
```
{
  employee     : ObjectId → ref: User (required)
  date         : String YYYY-MM-DD (required)
  hoursWorked  : Number (required)
  completedWork: String (required)
  problems     : String (default: "None")
  tomorrowPlan : String
  createdAt    : Date (auto)
  updatedAt    : Date (auto)
}
```

---

## API Endpoints

### Users
| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | `/users`          | Get all users            |
| GET    | `/users/employees`| Get employees only       |
| POST   | `/users`          | Add a new user           |

### Tasks
| Method | Endpoint                    | Description                     |
|--------|-----------------------------|---------------------------------|
| GET    | `/tasks`                    | Get all tasks (with employee name) |
| GET    | `/tasks/employee/:userId`   | Get tasks for one employee      |
| POST   | `/tasks`                    | Create a new task               |
| PUT    | `/tasks/:id/status`         | Update task status              |

### Reports
| Method | Endpoint                     | Description                      |
|--------|------------------------------|----------------------------------|
| GET    | `/reports`                   | Get all reports (admin view)     |
| GET    | `/reports/employee/:userId`  | Get one employee's reports       |
| POST   | `/reports`                   | Submit a daily report            |

---

## Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org) v18 or higher
- [Git](https://git-scm.com)
- A [MongoDB Atlas](https://cloud.mongodb.com) free account

Verify your installation:
```bash
node --version
npm --version
git --version
```

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/worklog.git
cd worklog
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
```

> See [Environment Variables](#environment-variables) for how to get your MongoDB URI.

### Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client` folder:

```
VITE_API_URL=http://localhost:5000
```

### Seed Sample Data

Make sure the backend `.env` is configured, then run:

```bash
cd server
node seed.js
```

This inserts:
- 4 users (1 admin, 3 employees)
- 6 tasks assigned across employees
- 5 daily reports

---

## Environment Variables

### server/.env

| Variable    | Description                          | Example |
|-------------|--------------------------------------|---------|
| `MONGO_URI` | MongoDB connection string from Atlas | `mongodb+srv://user:pass@cluster.mongodb.net/worklog` |
| `PORT`      | Port the Express server listens on   | `5000` |

**How to get MONGO_URI from Atlas:**
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Click **Connect** on your cluster
3. Choose **Drivers** → Node.js
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Add `/worklog` before the `?` as the database name

### client/.env

| Variable       | Description                    | Example |
|----------------|--------------------------------|---------|
| `VITE_API_URL` | URL of the Express backend     | `http://localhost:5000` |

> In production, set `VITE_API_URL` to your Render backend URL.

---

## Running the App

You need **two terminals** running at the same time.

**Terminal 1 — Start the backend:**
```bash
cd server
npm run dev
```
Expected output:
```
✅ MongoDB connected!
🚀 Server running on http://localhost:5000
```

**Terminal 2 — Start the frontend:**
```bash
cd client
npm run dev
```
Expected output:
```
VITE v5.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

Open **http://localhost:5173** in your browser.

---

## Deployment

### Database – MongoDB Atlas

1. Sign up at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free **M0** cluster
3. Go to **Network Access** → **Add IP Address** → **Allow Access from Anywhere**
4. Go to **Connect** → **Drivers** → copy the connection string
5. Use this string as `MONGO_URI` in both local `.env` and Render environment variables

### Backend – Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repository
4. Configure:

| Setting          | Value         |
|------------------|---------------|
| Root Directory   | `server`      |
| Runtime          | Node          |
| Build Command    | `npm install` |
| Start Command    | `node index.js` |

5. Add environment variables:
   - `MONGO_URI` = your Atlas connection string
   - `PORT` = `5000`

6. Click **Create Web Service**

Your backend URL will be: `https://worklog-server.onrender.com`

> **Note:** Render free tier sleeps after 15 minutes of inactivity. The first request after sleep takes ~30 seconds to wake up.

### Frontend – Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Configure:

| Setting        | Value         |
|----------------|---------------|
| Root Directory | `client`      |
| Framework      | Vite          |
| Build Command  | `npm run build` |
| Output Dir     | `dist`        |

4. Add environment variable:
   - `VITE_API_URL` = `https://worklog-server.onrender.com`

5. Click **Deploy**

Your frontend URL will be: `https://worklog.vercel.app`

---

## Screenshots

> Add screenshots here after deployment.

| Page | Description |
|------|-------------|
| Login | Email-based login with role detection |
| Dashboard | Admin stats, add employee, create task |
| Tasks | Employee task list with status dropdown |
| Report | Daily report form and history |

---

## Sample Login Credentials

After running `node seed.js`, use these emails to log in:

| Role     | Email                  | What they can see |
|----------|------------------------|-------------------|
| Admin    | admin@worklog.com      | Dashboard — full control |
| Employee | bob@worklog.com        | Own tasks + report form |
| Employee | sara@worklog.com       | Own tasks + report form |
| Employee | james@worklog.com      | Own tasks + report form |

> No password is needed — this app uses simple email-based role selection for learning purposes.

---

## Common Issues

**`querySrv ECONNREFUSED` on MongoDB connect**  
Your network is blocking SRV DNS lookups. Go to Atlas → Connect → Drivers and copy the **standard (non-SRV)** connection string. It starts with `mongodb://` instead of `mongodb+srv://`.

**`CORS error` in browser**  
Make sure `app.use(cors())` is placed before all routes in `server/index.js`.

**`req.body` is undefined**  
Make sure `app.use(express.json())` is in `server/index.js` before the routes.

**Login shows "No user found"**  
Run `node seed.js` from the server folder to insert test users into the database.

**Render backend is slow to respond**  
The free tier sleeps after 15 minutes of inactivity. The first request takes ~30 seconds to wake it up. This is normal.

**Vercel shows blank page**  
Make sure `VITE_API_URL` is set correctly in the Vercel environment variables dashboard and redeploy.

**npm gives script execution error on Windows**  
Run this once in PowerShell:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## Future Improvements

- [ ] Add password-based authentication with bcrypt
- [ ] Use JWT tokens instead of localStorage for sessions
- [ ] Add due dates to tasks with overdue highlighting
- [ ] Add task priority levels (Low / Medium / High)
- [ ] Add a search and filter bar on the tasks table
- [ ] Export daily reports as PDF
- [ ] Add charts to the admin dashboard (tasks per employee)
- [ ] Add pagination for large task/report lists
- [ ] Send email notifications when a task is assigned
- [ ] Build a mobile-friendly responsive layout

---

## License

This project was built for learning purposes as part of a MERN Stack internship.  
Feel free to use, modify, and share it.
