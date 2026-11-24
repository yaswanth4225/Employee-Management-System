
import React, { useState } from "react";
import "./App.css";

function Departments() {
  const initialDepartments = [
    {
      id: 1,
      name: "Information Technology",
      code: "IT",
      head: "Rahul Sharma",
      employees: 35,
      description: "Software development and technical support.",
      color: "#536DF5"
    },
    {
      id: 2,
      name: "Human Resources",
      code: "HR",
      head: "Priya Kumar",
      employees: 15,
      description: "Employee recruitment and management.",
      color: "#16A085"
    },
    {
      id: 3,
      name: "Finance",
      code: "FIN",
      head: "Arun Kumar",
      employees: 20,
      description: "Financial planning and accounting.",
      color: "#E59A36"
    },
    {
      id: 4,
      name: "Marketing",
      code: "MKT",
      head: "Sneha Reddy",
      employees: 18,
      description: "Marketing campaigns and branding.",
      color: "#9B59B6"
    },
    {
      id: 5,
      name: "Sales",
      code: "SAL",
      head: "Kiran Rao",
      employees: 22,
      description: "Sales operations and customer relations.",
      color: "#E56B6F"
    },
    {
      id: 6,
      name: "Operations",
      code: "OPS",
      head: "Vikram Singh",
      employees: 10,
      description: "Business operations and administration.",
      color: "#3498DB"
    }
  ];

  const [departments, setDepartments] = useState(initialDepartments);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    name: "",
    code: "",
    head: "",
    employees: 0,
    description: "",
    color: "#536DF5"
  };

  const [form, setForm] = useState(emptyForm);

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(search.toLowerCase()) ||
    dept.code.toLowerCase().includes(search.toLowerCase()) ||
    dept.head.toLowerCase().includes(search.toLowerCase())
  );

  const totalEmployees = departments.reduce(
    (total, dept) => total + Number(dept.employees), 0
  );

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function openAddForm() {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(dept) {
    setEditId(dept.id);
    setForm({
      ...dept,
      employees: String(dept.employees)
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const departmentData = {
      ...form,
      employees: Number(form.employees)
    };

    if (editId !== null) {
      setDepartments(departments.map((dept) =>
        dept.id === editId
          ? { ...departmentData, id: editId }
          : dept
      ));
    } else {
      setDepartments([
        ...departments,
        { ...departmentData, id: Date.now() }
      ]);
    }

    closeForm();
  }

  function deleteDepartment(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (confirmed) {
      setDepartments(departments.filter(
        (dept) => dept.id !== id
      ));
    }
  }

  return (
    <div className="department-page">

      {/* HEADER */}

      <div className="department-header">
        <div>
          <h2>Department Management</h2>
          <p>Organize and manage your company departments.</p>
        </div>

        <button
          className="add-department-btn"
          onClick={openAddForm}
        >
          + Add Department
        </button>
      </div>

      {/* STATISTICS */}

      <div className="department-stats">

        <div className="department-stat-card">
          <span>Total Departments</span>
          <h2>{departments.length}</h2>
          <small>Company departments</small>
        </div>

        <div className="department-stat-card">
          <span>Total Employees</span>
          <h2>{totalEmployees}</h2>
          <small>Across all departments</small>
        </div>

        <div className="department-stat-card">
          <span>Average Employees</span>
          <h2>
            {departments.length
              ? Math.round(totalEmployees / departments.length)
              : 0}
          </h2>
          <small>Employees per department</small>
        </div>

      </div>

      {/* SEARCH */}

      <div className="department-search">
        <input
          type="text"
          placeholder="Search department, code or department head..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* DEPARTMENT CARDS */}

      <div className="department-grid">

        {filteredDepartments.length > 0 ? (
          filteredDepartments.map((dept) => (

            <div className="department-card" key={dept.id}>

              <div className="department-card-top">

                <div
                  className="department-icon"
                  style={{ backgroundColor: dept.color }}
                >
                  {dept.code.substring(0, 2)}
                </div>

                <span className="department-code">
                  {dept.code}
                </span>

              </div>

              <h3>{dept.name}</h3>

              <p className="department-description">
                {dept.description}
              </p>

              <div className="department-details">
                <div>
                  <span>Department Head</span>
                  <strong>{dept.head}</strong>
                </div>

                <div>
                  <span>Employees</span>
                  <strong>{dept.employees}</strong>
                </div>
              </div>

              <div className="department-actions">

                <button
                  className="department-edit-btn"
                  onClick={() => openEditForm(dept)}
                >
                  Edit
                </button>

                <button
                  className="department-delete-btn"
                  onClick={() => deleteDepartment(dept.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        ) : (
          <div className="department-empty">
            No departments found.
          </div>
        )}

      </div>

      {/* ADD / EDIT FORM */}

      {showForm && (

        <div className="department-overlay">

          <form
            className="department-form"
            onSubmit={handleSubmit}
          >

            <h2>
              {editId !== null
                ? "Edit Department"
                : "Create New Department"}
            </h2>

            <label>Department Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter department name"
              required
            />

            <label>Department Code</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Example: IT"
              required
            />

            <label>Department Head</label>
            <input
              name="head"
              value={form.head}
              onChange={handleChange}
              placeholder="Enter department head"
              required
            />

            <label>Number of Employees</label>
            <input
              type="number"
              name="employees"
              min="0"
              value={form.employees}
              onChange={handleChange}
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the department"
              rows="3"
            />

            <label>Department Color</label>
            <input
              type="color"
              name="color"
              value={form.color}
              onChange={handleChange}
            />

            <div className="department-form-actions">

              <button
                type="button"
                className="department-cancel-btn"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="department-save-btn"
              >
                {editId !== null ? "Update" : "Create Department"}
              </button>

            </div>

          </form>

        </div>
      )}

    </div>
  );
}

export default Departments;
