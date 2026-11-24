
import React from "react";
import "./App.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <div className="welcome">
        <div>
          <h2>Welcome Back, Admin!</h2>
          <p>Here is your employee management overview.</p>
        </div>
      </div>

      <div className="stats-container">

        <div className="stat-card">
          <h3>Total Employees</h3>
          <h1>120</h1>
          <p>Employees registered</p>
        </div>

        <div className="stat-card">
          <h3>Active Employees</h3>
          <h1>105</h1>
          <p>Currently active</p>
        </div>

        <div className="stat-card">
          <h3>Departments</h3>
          <h1>6</h1>
          <p>Available departments</p>
        </div>

        <div className="stat-card">
          <h3>Inactive Employees</h3>
          <h1>15</h1>
          <p>Currently inactive</p>
        </div>

      </div>

      <div className="recent-employees">
        <h2>Recent Employees</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>101</td>
              <td>Rahul</td>
              <td>rahul@gmail.com</td>
              <td>IT</td>
              <td>Active</td>
            </tr>

            <tr>
              <td>102</td>
              <td>Priya</td>
              <td>priya@gmail.com</td>
              <td>HR</td>
              <td>Active</td>
            </tr>

            <tr>
              <td>103</td>
              <td>Arun</td>
              <td>arun@gmail.com</td>
              <td>Finance</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;
