// components/TaskTable.jsx
// Renders a table of tasks. Used on both the Admin dashboard and Employee task page.
// Props:
//   tasks        – array of task objects
//   showEmployee – boolean, show the "Assigned To" column (admin view only)
//   onStatusChange – optional function; if provided, shows a status dropdown

import { updateTaskStatus } from "../services/api";

function TaskTable({ tasks, showEmployee, onStatusChange }) {
  // Called when an employee picks a new status from the dropdown
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      // Tell the parent to re-fetch so the table refreshes
      if (onStatusChange) onStatusChange();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (tasks.length === 0) {
    return <p className="empty-msg">No tasks found.</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          {showEmployee && <th>Assigned To</th>}
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task._id}>
            <td>{task.title}</td>
            <td>{task.description || "—"}</td>
            {showEmployee && (
              <td>{task.assignedTo ? task.assignedTo.name : "—"}</td>
            )}
            <td>
              {/* If onStatusChange is provided, show a dropdown; otherwise show plain text */}
              {onStatusChange ? (
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className={`status-select status-${task.status.replace(" ", "")}`}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              ) : (
                <span className={`status-badge status-${task.status.replace(" ", "")}`}>
                  {task.status}
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
