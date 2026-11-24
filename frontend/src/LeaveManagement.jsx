
import React, { useState } from "react";
import "./App.css";

function LeaveManagement() {

  const initialLeaves = [
    {
      id: 1,
      employee: "Rahul Sharma",
      department: "IT",
      type: "Casual Leave",
      from: "2026-11-25",
      to: "2026-11-26",
      days: 2,
      reason: "Personal work",
      status: "Pending"
    },
    {
      id: 2,
      employee: "Priya Kumar",
      department: "HR",
      type: "Sick Leave",
      from: "2026-11-20",
      to: "2026-11-21",
      days: 2,
      reason: "Not feeling well",
      status: "Approved"
    },
    {
      id: 3,
      employee: "Arun Kumar",
      department: "Finance",
      type: "Earned Leave",
      from: "2026-11-28",
      to: "2026-11-30",
      days: 3,
      reason: "Family function",
      status: "Pending"
    },
    {
      id: 4,
      employee: "Sneha Reddy",
      department: "Marketing",
      type: "Casual Leave",
      from: "2026-11-18",
      to: "2026-11-18",
      days: 1,
      reason: "Personal reasons",
      status: "Rejected"
    }
  ];

  const [leaves, setLeaves] = useState(initialLeaves);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    employee: "",
    department: "IT",
    type: "Casual Leave",
    from: "",
    to: "",
    reason: ""
  });

  const pending = leaves.filter(
    l => l.status === "Pending"
  ).length;

  const approved = leaves.filter(
    l => l.status === "Approved"
  ).length;

  const rejected = leaves.filter(
    l => l.status === "Rejected"
  ).length;

  const filteredLeaves = leaves.filter(leave => {
    const matchesSearch =
      leave.employee.toLowerCase().includes(search.toLowerCase()) ||
      leave.department.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filter === "All" || leave.status === filter;

    return matchesSearch && matchesStatus;
  });

  function updateStatus(id, status) {
    setLeaves(previous =>
      previous.map(leave =>
        leave.id === id
          ? { ...leave, status }
          : leave
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.to < form.from) {
      alert("End date cannot be before start date.");
      return;
    }

    const start = new Date(form.from + "T00:00:00");
    const end = new Date(form.to + "T00:00:00");

    const days =
      Math.round((end - start) / 86400000) + 1;

    const newLeave = {
      ...form,
      id: Date.now(),
      days,
      status: "Pending"
    };

    setLeaves(previous => [newLeave, ...previous]);

    setForm({
      employee: "",
      department: "IT",
      type: "Casual Leave",
      from: "",
      to: "",
      reason: ""
    });

    setShowForm(false);
  }

  return (
    <div className="leave-page">

      {/* HEADER */}

      <div className="leave-header">
        <div>
          <h2>Leave Management</h2>
          <p>Manage employee leave requests and approvals.</p>
        </div>

        <button
          className="add-leave-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Apply for Leave
        </button>
      </div>

      {/* STATISTICS */}

      <div className="leave-stats">

        <div className="leave-stat-card">
          <span>Total Requests</span>
          <h2>{leaves.length}</h2>
          <small>All leave applications</small>
        </div>

        <div className="leave-stat-card pending-card">
          <span>Pending</span>
          <h2>{pending}</h2>
          <small>Waiting for approval</small>
        </div>

        <div className="leave-stat-card approved-card">
          <span>Approved</span>
          <h2>{approved}</h2>
          <small>Approved requests</small>
        </div>

        <div className="leave-stat-card rejected-card">
          <span>Rejected</span>
          <h2>{rejected}</h2>
          <small>Rejected requests</small>
        </div>

      </div>

      {/* APPLY LEAVE FORM */}

      {showForm && (

        <div className="leave-form-container">

          <h3>New Leave Application</h3>

          <form onSubmit={handleSubmit}>

            <div className="leave-form-grid">

              <div>
                <label>Employee Name</label>
                <input
                  type="text"
                  placeholder="Enter employee name"
                  value={form.employee}
                  onChange={e =>
                    setForm({ ...form, employee: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label>Department</label>
                <select
                  value={form.department}
                  onChange={e =>
                    setForm({ ...form, department: e.target.value })
                  }
                >
                  <option>IT</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Operations</option>
                </select>
              </div>

              <div>
                <label>Leave Type</label>
                <select
                  value={form.type}
                  onChange={e =>
                    setForm({ ...form, type: e.target.value })
                  }
                >
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Earned Leave</option>
                </select>
              </div>

              <div>
                <label>Start Date</label>
                <input
                  type="date"
                  value={form.from}
                  onChange={e =>
                    setForm({ ...form, from: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label>End Date</label>
                <input
                  type="date"
                  min={form.from || undefined}
                  value={form.to}
                  onChange={e =>
                    setForm({ ...form, to: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label>Reason</label>
                <input
                  type="text"
                  placeholder="Enter reason"
                  value={form.reason}
                  onChange={e =>
                    setForm({ ...form, reason: e.target.value })
                  }
                  required
                />
              </div>

            </div>

            <div className="leave-form-actions">

              <button type="submit" className="submit-leave-btn">
                Submit Application
              </button>

              <button
                type="button"
                className="cancel-leave-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* LEAVE REQUEST TABLE */}

      <div className="leave-table-container">

        <div className="leave-table-heading">
          <div>
            <h3>Leave Applications</h3>
            <p>View and manage employee leave requests.</p>
          </div>
        </div>

        <div className="leave-filters">

          <input
            type="text"
            placeholder="Search employee or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

        </div>

        <div className="leave-table-scroll">

          <table className="leave-table">

            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredLeaves.length > 0 ? (

                filteredLeaves.map(leave => (

                  <tr key={leave.id}>

                    <td><strong>{leave.employee}</strong></td>
                    <td>{leave.department}</td>
                    <td>{leave.type}</td>
                    <td>{leave.from}</td>
                    <td>{leave.to}</td>
                    <td>{leave.days}</td>
                    <td>{leave.reason}</td>

                    <td>
                      <span className={`leave-badge ${leave.status.toLowerCase()}`}>
                        {leave.status}
                      </span>
                    </td>

                    <td>
                      {leave.status === "Pending" ? (

                        <div className="leave-actions">

                          <button
                            className="approve-btn"
                            onClick={() =>
                              updateStatus(leave.id, "Approved")
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() =>
                              updateStatus(leave.id, "Rejected")
                            }
                          >
                            Reject
                          </button>

                        </div>

                      ) : (
                        <span className="processed-text">
                          Processed
                        </span>
                      )}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="9" className="no-leaves">
                    No leave applications found.
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

export default LeaveManagement;
