
import React, { useState } from "react";
import "./App.css";

function Payroll() {
  const [month, setMonth] = useState("2026-11");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [employees, setEmployees] = useState([
    { id: 101, name: "Rahul Sharma", department: "IT", basic: 35000, allowance: 5000, deduction: 2000, status: "Paid" },
    { id: 102, name: "Priya Kumar", department: "HR", basic: 30000, allowance: 4000, deduction: 1500, status: "Pending" },
    { id: 103, name: "Arun Kumar", department: "Finance", basic: 40000, allowance: 6000, deduction: 2500, status: "Paid" },
    { id: 104, name: "Sneha Reddy", department: "Marketing", basic: 28000, allowance: 3500, deduction: 1000, status: "Pending" },
    { id: 105, name: "Kiran Rao", department: "Sales", basic: 32000, allowance: 4500, deduction: 1500, status: "Paid" },
    { id: 106, name: "Vikram Singh", department: "Operations", basic: 38000, allowance: 5000, deduction: 2000, status: "Pending" }
  ]);

  const netSalary = employee =>
    employee.basic + employee.allowance - employee.deduction;

  const totalPayroll = employees.reduce(
    (sum, employee) => sum + netSalary(employee), 0
  );

  const paidEmployees = employees.filter(
    employee => employee.status === "Paid"
  );

  const pendingEmployees = employees.filter(
    employee => employee.status === "Pending"
  );

  const paidAmount = paidEmployees.reduce(
    (sum, employee) => sum + netSalary(employee), 0
  );

  const pendingAmount = pendingEmployees.reduce(
    (sum, employee) => sum + netSalary(employee), 0
  );

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || employee.status === filter;

    return matchesSearch && matchesFilter;
  });

  const formatCurrency = amount =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  function markAsPaid(id) {
    setEmployees(previous =>
      previous.map(employee =>
        employee.id === id
          ? { ...employee, status: "Paid" }
          : employee
      )
    );
  }

  function generatePayroll() {
    if (window.confirm(`Generate payroll for ${month}?`)) {
      setEmployees(previous =>
        previous.map(employee => ({
          ...employee,
          status: "Pending"
        }))
      );

      alert("Payroll generated successfully!");
    }
  }

  return (
    <div className="payroll-page">

      {/* HEADER */}

      <div className="payroll-header">
        <div>
          <h2>Salary & Payroll Management</h2>
          <p>Manage employee salaries and monthly payroll.</p>
        </div>

        <div className="payroll-header-actions">
          <input
            type="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
          />

          <button
            className="generate-payroll-btn"
            onClick={generatePayroll}
          >
            + Generate Payroll
          </button>
        </div>
      </div>

      {/* STATISTICS */}

      <div className="payroll-stats">

        <div className="payroll-stat-card">
          <span>Total Payroll</span>
          <h2>{formatCurrency(totalPayroll)}</h2>
          <small>Monthly salary expense</small>
        </div>

        <div className="payroll-stat-card">
          <span>Employees</span>
          <h2>{employees.length}</h2>
          <small>Employees on payroll</small>
        </div>

        <div className="payroll-stat-card paid-payroll">
          <span>Paid Salary</span>
          <h2>{formatCurrency(paidAmount)}</h2>
          <small>{paidEmployees.length} employees paid</small>
        </div>

        <div className="payroll-stat-card pending-payroll">
          <span>Pending Salary</span>
          <h2>{formatCurrency(pendingAmount)}</h2>
          <small>{pendingEmployees.length} payments pending</small>
        </div>

      </div>

      {/* PAYMENT SUMMARY */}

      <div className="payroll-summary">

        <div>
          <h3>Payroll Payment Summary</h3>
          <p>Salary payment progress for {month}</p>
        </div>

        <div className="payroll-progress">
          <div className="progress-label">
            <span>Paid Employees</span>
            <strong>
              {employees.length
                ? Math.round(paidEmployees.length / employees.length * 100)
                : 0}%
            </strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${employees.length
                  ? paidEmployees.length / employees.length * 100
                  : 0}%`
              }}
            />
          </div>
        </div>

      </div>

      {/* EMPLOYEE SALARY TABLE */}

      <div className="payroll-table-container">

        <div className="payroll-table-heading">
          <div>
            <h3>Employee Salary Records</h3>
            <p>Monthly salary breakdown and payment status.</p>
          </div>
        </div>

        <div className="payroll-filters">

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
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>

        </div>

        <div className="payroll-table-scroll">

          <table className="payroll-table">

            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Basic Salary</th>
                <th>Allowance</th>
                <th>Deduction</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredEmployees.length > 0 ? (

                filteredEmployees.map(employee => (

                  <tr key={employee.id}>

                    <td>{employee.id}</td>

                    <td>
                      <strong>{employee.name}</strong>
                    </td>

                    <td>{employee.department}</td>

                    <td>{formatCurrency(employee.basic)}</td>

                    <td>{formatCurrency(employee.allowance)}</td>

                    <td>{formatCurrency(employee.deduction)}</td>

                    <td>
                      <strong>{formatCurrency(netSalary(employee))}</strong>
                    </td>

                    <td>
                      <span className={`payroll-badge ${employee.status.toLowerCase()}`}>
                        {employee.status}
                      </span>
                    </td>

                    <td>
                      {employee.status === "Pending" ? (

                        <button
                          className="mark-paid-btn"
                          onClick={() => markAsPaid(employee.id)}
                        >
                          Mark as Paid
                        </button>

                      ) : (
                        <span className="paid-label">Completed</span>
                      )}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="9" className="no-payroll">
                    No salary records found.
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

export default Payroll;
