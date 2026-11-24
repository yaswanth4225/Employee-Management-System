
import React, { useState } from "react";
import "./App.css";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    {
      id: 101,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      department: "IT",
      role: "Developer",
      phone: "9876543210"
    },
    {
      id: 102,
      name: "Priya Kumar",
      email: "priya@gmail.com",
      department: "HR",
      role: "HR Manager",
      phone: "9876543211"
    },
    {
      id: 103,
      name: "Arun Kumar",
      email: "arun@gmail.com",
      department: "Finance",
      role: "Accountant",
      phone: "9876543212"
    }
  ]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    name: "",
    email: "",
    department: "IT",
    role: "",
    phone: ""
  };

  const [form, setForm] = useState(emptyForm);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" ||
      employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editId !== null) {
      setEmployees(employees.map((employee) =>
        employee.id === editId
          ? { ...form, id: editId }
          : employee
      ));
    } else {
      const newEmployee = {
        ...form,
        id: Date.now()
      };

      setEmployees([...employees, newEmployee]);
    }

    closeForm();
  }

  function openAddForm() {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(employee) {
    setEditId(employee.id);
    setForm({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      phone: employee.phone
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
  }

  function deleteEmployee(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmed) {
      setEmployees(employees.filter(
        (employee) => employee.id !== id
      ));
    }
  }

  return (
    <div className="employee-page">

      <div className="employee-header">
        <div>
          <h2>Employee Management</h2>
          <p>Manage your organization's employees.</p>
        </div>

        <button
          className="add-employee-btn"
          onClick={openAddForm}
        >
          + Add Employee
        </button>
      </div>

      <div className="employee-summary">
        <div>
          <span>Total Employees</span>
          <h2>{employees.length}</h2>
        </div>

        <div>
          <span>Departments</span>
          <h2>
            {[...new Set(
              employees.map(e => e.department)
            )].length}
          </h2>
        </div>
      </div>

      <div className="employee-table-container">

        <div className="employee-tools">
          <input
            type="text"
            placeholder="Search employee by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <div className="employee-table-scroll">
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Email</th>
                <th>Department</th>
                <th>Job Role</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>

                    <td>
                      <strong>{employee.name}</strong>
                    </td>

                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.role}</td>
                    <td>{employee.phone}</td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => openEditForm(employee)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {showForm && (
        <div className="employee-modal-overlay">
          <form
            className="employee-modal"
            onSubmit={handleSubmit}
          >
            <h2>
              {editId !== null
                ? "Edit Employee"
                : "Add New Employee"}
            </h2>

            <label>Employee Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter employee name"
              required
            />

            <label>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />

            <label>Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Sales</option>
              <option>Marketing</option>
            </select>

            <label>Job Role</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Enter job role"
              required
            />

            <label>Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

            <div className="employee-modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button type="submit" className="save-btn">
                {editId !== null ? "Update Employee" : "Save Employee"}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}

export default EmployeeManagement;
