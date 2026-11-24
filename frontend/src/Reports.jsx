
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import "./Reports.css";

function Reports() {
  const [period, setPeriod] = useState("6");

  // Demo data. Later these values will come from Spring Boot APIs.
  const monthlyData = [
    { month: "Jun", present: 88, absent: 8, late: 4, payroll: 420000 },
    { month: "Jul", present: 91, absent: 5, late: 4, payroll: 435000 },
    { month: "Aug", present: 86, absent: 9, late: 5, payroll: 440000 },
    { month: "Sep", present: 93, absent: 4, late: 3, payroll: 450000 },
    { month: "Oct", present: 90, absent: 6, late: 4, payroll: 460000 },
    { month: "Nov", present: 95, absent: 3, late: 2, payroll: 475000 },
    { month: "Dec", present: 92, absent: 5, late: 3, payroll: 480000 },
    { month: "Jan", present: 89, absent: 7, late: 4, payroll: 485000 },
    { month: "Feb", present: 94, absent: 4, late: 2, payroll: 490000 },
    { month: "Mar", present: 91, absent: 6, late: 3, payroll: 500000 },
    { month: "Apr", present: 96, absent: 2, late: 2, payroll: 510000 },
    { month: "May", present: 93, absent: 4, late: 3, payroll: 520000 }
  ];

  const attendanceData = useMemo(
    () => monthlyData.slice(-Number(period)),
    [period]
  );

  const leaveData = [
    { name: "Approved", value: 45, color: "#16a36a" },
    { name: "Pending", value: 12, color: "#f59e0b" },
    { name: "Rejected", value: 8, color: "#ef4444" }
  ];

  const performanceData = [
    { rating: "Excellent", employees: 18 },
    { rating: "Good", employees: 25 },
    { rating: "Average", employees: 12 },
    { rating: "Needs Improvement", employees: 5 }
  ];

  const departmentData = [
    { department: "IT", employees: 25, attendance: "94%" },
    { department: "HR", employees: 8, attendance: "96%" },
    { department: "Finance", employees: 12, attendance: "91%" },
    { department: "Marketing", employees: 10, attendance: "92%" },
    { department: "Sales", employees: 15, attendance: "89%" }
  ];

  const latestMonth = attendanceData[attendanceData.length - 1];

  const exportCSV = () => {
    const rows = [
      ["Department", "Employees", "Attendance"],
      ...departmentData.map(item => [
        item.department,
        item.employees,
        item.attendance
      ])
    ];

    const csvContent = rows
      .map(row =>
        row.map(value =>
          `"${String(value).replace(/"/g, '""')}"`
        ).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "employee-department-report.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="reports-page">

      {/* Header */}
      <div className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Monitor employee activities and organizational performance.</p>
        </div>

        <div className="reports-header-actions">
          <button className="reports-print-btn" onClick={printReport}>
            🖨 Print Report
          </button>

          <button className="reports-export-btn" onClick={exportCSV}>
            ↓ Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="reports-summary">

        <div className="report-card">
          <div className="report-card-top">
            <span>Total Employees</span>
            <span className="report-icon blue">👥</span>
          </div>
          <h2>70</h2>
          <p className="report-positive">Across 5 departments</p>
        </div>

        <div className="report-card">
          <div className="report-card-top">
            <span>Attendance Rate</span>
            <span className="report-icon green">📅</span>
          </div>
          <h2>{latestMonth.present}%</h2>
          <p className="report-positive">Latest demo month</p>
        </div>

        <div className="report-card">
          <div className="report-card-top">
            <span>Pending Leaves</span>
            <span className="report-icon orange">📝</span>
          </div>
          <h2>12</h2>
          <p className="report-neutral">Awaiting approval</p>
        </div>

        <div className="report-card">
          <div className="report-card-top">
            <span>Monthly Payroll</span>
            <span className="report-icon purple">💰</span>
          </div>
          <h2>₹5.2L</h2>
          <p className="report-positive">Latest demo month</p>
        </div>

      </div>

      {/* Attendance Chart */}
      <div className="reports-chart-card">
        <div className="reports-section-heading">
          <div>
            <h2>Attendance Overview</h2>
            <p>Monthly employee attendance percentages</p>
          </div>

          <select
            value={period}
            onChange={e => setPeriod(e.target.value)}
          >
            <option value="6">Last 6 months</option>
            <option value="12">Last 12 months</option>
          </select>
        </div>

        <div className="reports-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="present"
                name="Present"
                fill="#16a36a"
                radius={[5, 5, 0, 0]}
              />
              <Bar
                dataKey="absent"
                name="Absent"
                fill="#ef4444"
                radius={[5, 5, 0, 0]}
              />
              <Bar
                dataKey="late"
                name="Late"
                fill="#f59e0b"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leave and Payroll Charts */}
      <div className="reports-two-column">

        <div className="reports-chart-card">
          <div className="reports-section-heading">
            <div>
              <h2>Leave Analysis</h2>
              <p>Employee leave request distribution</p>
            </div>
          </div>

          <div className="reports-chart pie-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaveData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {leaveData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="reports-chart-card">
          <div className="reports-section-heading">
            <div>
              <h2>Payroll Trends</h2>
              <p>Monthly salary expenditure</p>
            </div>
          </div>

          <div className="reports-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={value =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />
                <Line
                  type="monotone"
                  dataKey="payroll"
                  name="Payroll"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Performance Chart */}
      <div className="reports-chart-card">
        <div className="reports-section-heading">
          <div>
            <h2>Employee Performance</h2>
            <p>Distribution of employee performance ratings</p>
          </div>
        </div>

        <div className="reports-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="rating"
                width={145}
              />
              <Tooltip />
              <Bar
                dataKey="employees"
                name="Employees"
                fill="#6366f1"
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Table */}
      <div className="reports-table-card">
        <div className="reports-section-heading">
          <div>
            <h2>Department Summary</h2>
            <p>Employee distribution across departments</p>
          </div>
        </div>

        <div className="reports-table-scroll">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Employees</th>
                <th>Attendance Rate</th>
                <th>Department Status</th>
              </tr>
            </thead>

            <tbody>
              {departmentData.map((department, index) => (
                <tr key={index}>
                  <td>{department.department}</td>
                  <td>{department.employees}</td>
                  <td>{department.attendance}</td>
                  <td>
                    <span className="department-active">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Reports;
