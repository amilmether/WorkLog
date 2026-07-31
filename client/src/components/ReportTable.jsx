// components/ReportTable.jsx
// Renders a table of daily reports. Used on the Admin dashboard.
// Props:
//   reports – array of report objects

function ReportTable({ reports }) {
  if (reports.length === 0) {
    return <p className="empty-msg">No reports submitted yet.</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Date</th>
          <th>Hours</th>
          <th>Completed Work</th>
          <th>Problems</th>
          <th>Tomorrow's Plan</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={report._id}>
            <td>{report.employee ? report.employee.name : "—"}</td>
            <td>{report.date}</td>
            <td>{report.hoursWorked}h</td>
            <td>{report.completedWork}</td>
            <td>{report.problems || "None"}</td>
            <td>{report.tomorrowPlan || "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReportTable;
