
import React, { useState } from "react";
import "./App.css";

function Attendance() {
  const today = new Date().toLocaleDateString("en-CA");

  const [date, setDate] = useState(today);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [records, setRecords] = useState([
    { id: 101, name: "Rahul Sharma", department: "IT", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "Present" },
    { id: 102, name: "Priya Kumar", department: "HR", checkIn: "09:25 AM", checkOut: "--", status: "Late" },
    { id: 103, name: "Arun Kumar", department: "Finance", checkIn: "--", checkOut: "--", status: "Absent" },
    { id: 104, name: "Sneha Reddy", department: "Marketing", checkIn: "08:55 AM", checkOut: "--", status: "Present" },
    { id: 105, name: "Kiran Rao", department: "Sales", checkIn: "09:15 AM", checkOut: "--", status: "Late" },
    { id: 106, name: "Vikram Singh", department: "Operations", checkIn: "--", checkOut: "--", status: "Absent" }
  ]);

  const total = records.length;
  const present = records.filter(r => r.status === "Present").length;
  const late = records.filter(r => r.status === "Late").length;
  const absent = records.filter(r => r.status === "Absent").length;

  const percentage = total
    ? Math.round(((present + late) / total) * 100)
    : 0;

  const filteredRecords = records.filter(record => {
    const matchesSearch =
      record.name.toLowerCase().includes(search.toLowerCase()) ||
      record.department.toLowerCase().includes(search.toLowerCase()) ||
      String(record.id).includes(search);

    const matchesFilter =
      filter === "All" || record.status === filter;

    return matchesSearch && matchesFilter;
  });

  function updateStatus(id, status) {
    setRecords(previous =>
      previous.map(record =>
        record.id === id
          ? { ...record, status }
          : record
      )
    );
  }

  
function checkIn(id) {
  const now = new Date();

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  const hours = now.getHours();
  const minutes = now.getMinutes();

  const isLate = hours > 9 || (hours === 9 && minutes > 15);

  setRecords(previous =>
    previous.map(record =>
      record.id === id && record.checkIn === "--"
        ? {
            ...record,
            checkIn: time,
            checkOut: "--",
            status: isLate ? "Late" : "Present"
          }
        : record
    )
  );
}


  function checkOut(id) {
    const time = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    setRecords(previous =>
      previous.map(record =>
        record.id === id &&
        record.status !== "Absent" &&
        record.checkIn !== "--"
          ? { ...record, checkOut: time }
          : record
      )
    );
  }

  return (
    <div className="attendance-page">

      {/* HEADER */}

      <div className="attendance-header">
        <div>
          <h2>Attendance Management</h2>
          <p>Track employee attendance and working hours.</p>
        </div>

        <div className="attendance-date">
          <label>Select Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* STATISTICS */}

      <div className="attendance-stats">

        <div className="attendance-card">
          <span>Total Employees</span>
          <h2>{total}</h2>
          <small>Registered employees</small>
        </div>

        <div className="attendance-card present-card">
          <span>Present</span>
          <h2>{present}</h2>
          <small>Currently present</small>
        </div>

        <div className="attendance-card late-card">
          <span>Late Arrivals</span>
          <h2>{late}</h2>
          <small>Employees arriving late</small>
        </div>

        <div className="attendance-card absent-card">
          <span>Absent</span>
          <h2>{absent}</h2>
          <small>Employees absent</small>
        </div>

      </div>

      {/* ATTENDANCE OVERVIEW */}

      <div className="attendance-overview">

        <div>
          <h3>Attendance Overview</h3>
          <p>Attendance percentage for {date}</p>
        </div>

        <div className="attendance-overview-content">
          <div className="attendance-circle">
            <div>
              <strong>{percentage}%</strong>
              <small>Attendance</small>
            </div>
          </div>

          <div className="attendance-legend">
            <p><span className="legend-dot present-dot" /> Present: {present}</p>
            <p><span className="legend-dot late-dot" /> Late: {late}</p>
            <p><span className="legend-dot absent-dot" /> Absent: {absent}</p>
          </div>
        </div>

      </div>

      {/* ATTENDANCE TABLE */}

      <div className="attendance-table-container">

        <div className="attendance-table-heading">
          <div>
            <h3>Employee Attendance Records</h3>
            <p>Daily employee check-in and check-out details.</p>
          </div>
        </div>

        <div className="attendance-filters">

          <input
            type="text"
            placeholder="Search employee, ID or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
          </select>

        </div>

        <div className="attendance-table-scroll">
          <table className="attendance-table">

            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map(record => (
                  <tr key={record.id}>

                    <td>{record.id}</td>
                    <td><strong>{record.name}</strong></td>
                    <td>{record.department}</td>
                    <td>{record.checkIn}</td>
                    <td>{record.checkOut}</td>

                    <td>
                      <span className={`attendance-badge ${record.status.toLowerCase()}`}>
                        {record.status}
                      </span>
                    </td>

                    <td>
                      <div className="attendance-actions">

                        <button
                          className="checkin-btn"
                         disabled={record.checkIn !== "--"}
                          onClick={() => checkIn(record.id)}
                        >
                          Check In
                        </button>

                        <button
                          className="checkout-btn"
                          disabled={record.status === "Absent" || record.checkIn === "--" || record.checkOut !== "--"}
                          onClick={() => checkOut(record.id)}
                        >
                          Check Out
                        </button>

                        <button
                          className="absent-btn"
                          onClick={() => updateStatus(record.id, "Absent")}
                        >
                          Absent
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="attendance-empty">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>

    </div>
    
  );
}

export default Attendance;
