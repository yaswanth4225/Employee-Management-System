
import React, { useState } from "react";
import "./App.css";

function Performance() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [employees, setEmployees] = useState([
    { id: 101, name: "Rahul Sharma", department: "IT", score: 95, rating: "Excellent", goal: 95, review: "Completed project ahead of schedule." },
    { id: 102, name: "Priya Kumar", department: "HR", score: 88, rating: "Very Good", goal: 85, review: "Excellent recruitment performance." },
    { id: 103, name: "Arun Kumar", department: "Finance", score: 72, rating: "Good", goal: 75, review: "Meeting most monthly targets." },
    { id: 104, name: "Sneha Reddy", department: "Marketing", score: 58, rating: "Needs Improvement", goal: 70, review: "Needs improvement in campaign delivery." },
    { id: 105, name: "Kiran Rao", department: "Sales", score: 91, rating: "Excellent", goal: 90, review: "Exceeded sales targets." },
    { id: 106, name: "Vikram Singh", department: "Operations", score: 65, rating: "Good", goal: 75, review: "Working towards operational targets." }
  ]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    department: "",
    score: "",
    goal: "",
    review: ""
  });

  const average = employees.length
    ? Math.round(employees.reduce((sum, e) => sum + e.score, 0) / employees.length)
    : 0;

  const topPerformers = employees.filter(e => e.score >= 90).length;
  const needsImprovement = employees.filter(e => e.score < 60).length;

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || employee.rating === filter;

    return matchesSearch && matchesFilter;
  });

  function getRating(score) {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  }

  function handleSubmit(e) {
    e.preventDefault();

    const score = Number(form.score);
    const goal = Number(form.goal);

    if (!form.id || !form.name.trim() || !form.department.trim() ||
        !Number.isFinite(score) || score < 0 || score > 100 ||
        !Number.isFinite(goal) || goal < 0 || goal > 100) {
      alert("Please enter valid details. Scores must be between 0 and 100.");
      return;
    }

    const employee = {
      ...form,
      id: Number(form.id),
      score,
      goal,
      rating: getRating(score)
    };

    setEmployees(previous => [
      ...previous.filter(item => item.id !== employee.id),
      employee
    ]);

    setForm({
      id: "",
      name: "",
      department: "",
      score: "",
      goal: "",
      review: ""
    });

    setShowForm(false);
  }

  function deleteReview(id) {
    if (window.confirm("Delete this performance review?")) {
      setEmployees(previous => previous.filter(e => e.id !== id));
    }
  }

  return (
    <div className="performance-page">

      {/* HEADER */}

      <div className="performance-header">
        <div>
          <h2>Employee Performance</h2>
          <p>Monitor employee achievements, goals and performance reviews.</p>
        </div>

        <button
          className="performance-add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Performance Review
        </button>
      </div>

      {/* STATISTICS */}

      <div className="performance-stats">

        <div className="performance-stat-card">
          <span>Total Reviews</span>
          <h2>{employees.length}</h2>
          <small>Employee performance records</small>
        </div>

        <div className="performance-stat-card">
          <span>Average Performance</span>
          <h2>{average}%</h2>
          <small>Overall performance score</small>
        </div>

        <div className="performance-stat-card">
          <span>Top Performers</span>
          <h2>{topPerformers}</h2>
          <small>Scored 90% or above</small>
        </div>

        <div className="performance-stat-card">
          <span>Needs Improvement</span>
          <h2>{needsImprovement}</h2>
          <small>Scored below 60%</small>
        </div>

      </div>

      {/* ADD REVIEW FORM */}

      {showForm && (
        <form className="performance-form" onSubmit={handleSubmit}>
          <h3>Add Employee Performance Review</h3>

          <div className="performance-form-grid">

            <input
              type="number"
              placeholder="Employee ID"
              value={form.id}
              onChange={e => setForm({...form, id: e.target.value})}
              required
            />

            <input
              placeholder="Employee Name"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              required
            />

            <input
              placeholder="Department"
              value={form.department}
              onChange={e => setForm({...form, department: e.target.value})}
              required
            />

            <input
              type="number"
              placeholder="Performance Score (0-100)"
              min="0"
              max="100"
              value={form.score}
              onChange={e => setForm({...form, score: e.target.value})}
              required
            />

            <input
              type="number"
              placeholder="Goal Completion (0-100)"
              min="0"
              max="100"
              value={form.goal}
              onChange={e => setForm({...form, goal: e.target.value})}
              required
            />

          </div>

          <textarea
            placeholder="Manager feedback..."
            value={form.review}
            onChange={e => setForm({...form, review: e.target.value})}
          />

          <div className="performance-form-actions">
            <button type="submit" className="performance-save-btn">
              Save Review
            </button>

            <button
              type="button"
              className="performance-cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* PERFORMANCE TABLE */}

      <div className="performance-table-container">

        <div className="performance-table-heading">
          <div>
            <h3>Employee Performance Records</h3>
            <p>Review employee scores and goal completion.</p>
          </div>
        </div>

        <div className="performance-filters">

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
            <option value="All">All Ratings</option>
            <option value="Excellent">Excellent</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Needs Improvement">Needs Improvement</option>
          </select>

        </div>

        <div className="performance-table-scroll">
          <table className="performance-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Performance</th>
                <th>Goal Progress</th>
                <th>Rating</th>
                <th>Manager Feedback</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td><strong>{employee.name}</strong></td>
                    <td>{employee.department}</td>

                    <td>
                      <strong>{employee.score}%</strong>
                    </td>

                    <td>
                      <div className="goal-progress">
                        <div className="goal-track">
                          <div
                            className="goal-fill"
                            style={{width: `${employee.goal}%`}}
                          />
                        </div>
                        <small>{employee.goal}%</small>
                      </div>
                    </td>

                    <td>
                      <span className={`performance-badge ${employee.rating.toLowerCase().replaceAll(" ", "-")}`}>
                        {employee.rating}
                      </span>
                    </td>

                    <td className="feedback-cell">
                      {employee.review || "No feedback provided"}
                    </td>

                    <td>
                      <button
                        className="performance-delete-btn"
                        onClick={() => deleteReview(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="performance-empty">
                    No performance records found.
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

export default Performance;
