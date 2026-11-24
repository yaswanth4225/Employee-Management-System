
import React, { useState } from "react";

import Dashboard from "./Dashboard";
import EmployeeManagement from "./EmployeeManagement";
import Departments from "./Departments";
import Attendance from "./Attendance";
import LeaveManagement from "./LeaveManagement";
import Payroll from "./Payroll";
import Performance from "./Performance";
import Documents from "./Documents";
import Reports from "./Reports";
import Profile from "./Profile";
import Login from "./Login";

import { LogOut, UserRound } from "lucide-react";

import "./App.css";

function App() {

  // Current page
  const [page, setPage] = useState("dashboard");

  // Logged-in user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem("emsUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      sessionStorage.removeItem("emsUser");
      return null;
    }
  });

  // Login function
 
const handleLogin = (user) => {
  sessionStorage.setItem("emsUser", JSON.stringify(user));
  sessionStorage.setItem("jwtToken", user.token);

  setCurrentUser(user);
  setPage("dashboard");
};


  // Logout function
 
const handleLogout = () => {
  sessionStorage.removeItem("emsUser");
  sessionStorage.removeItem("jwtToken");

  setCurrentUser(null);
  setPage("dashboard");
};


  // Role-based page access
  const pageAccess = {
    dashboard: ["Admin", "HR", "Employee"],
    employees: ["Admin", "HR"],
    departments: ["Admin", "HR"],
    attendance: ["Admin", "HR", "Employee"],
    leave: ["Admin", "HR", "Employee"],
    payroll: ["Admin", "HR"],
    performance: ["Admin", "HR"],
    documents: ["Admin", "HR"],
    reports: ["Admin", "HR"],
    profile: ["Admin", "HR", "Employee"]
  };

  // Check whether the current user can access a page
  const canAccess = (pageName) => {
    return pageAccess[pageName]?.includes(currentUser?.role) ?? false;
  };

  // Navigation function
  const navigateTo = (pageName) => {
    if (canAccess(pageName)) {
      setPage(pageName);
    }
  };

  // Show login page if user is not logged in
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  // Page title
  const pageTitles = {
    dashboard: "Dashboard",
    employees: "Employee Management",
    departments: "Department Management",
    attendance: "Attendance Management",
    leave: "Leave Management",
    payroll: "Salary & Payroll",
    performance: "Performance Management",
    documents: "Employee Documents",
    reports: "Reports & Analytics",
    profile: "Profile & Settings"
  };

  return (
    <div className="app-layout">

      {/* Sidebar */}
      <aside className="sidebar">

        <h2 className="logo">EMS</h2>

        <p className="menu-title">MAIN MENU</p>

        {/* Logged-in user */}
        <div className="logged-in-user">
          <UserRound size={17} />

          <div>
            <strong>{currentUser.name}</strong>
            <small>{currentUser.role}</small>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="logout-button"
        >
          <LogOut size={17} />
          Logout
        </button>

        {/* Dashboard */}
        {canAccess("dashboard") && (
          <button
            className={page === "dashboard" ? "active-menu" : ""}
            onClick={() => navigateTo("dashboard")}
          >
            ▦ Dashboard
          </button>
        )}

        {/* Employees */}
        {canAccess("employees") && (
          <button
            className={page === "employees" ? "active-menu" : ""}
            onClick={() => navigateTo("employees")}
          >
            ♙ Employees
          </button>
        )}

        {/* Departments */}
        {canAccess("departments") && (
          <button
            className={page === "departments" ? "active-menu" : ""}
            onClick={() => navigateTo("departments")}
          >
            🏢 Departments
          </button>
        )}

        {/* Attendance */}
        {canAccess("attendance") && (
          <button
            className={page === "attendance" ? "active-menu" : ""}
            onClick={() => navigateTo("attendance")}
          >
            📅 Attendance
          </button>
        )}

        {/* Leave Management */}
        {canAccess("leave") && (
          <button
            className={page === "leave" ? "active-menu" : ""}
            onClick={() => navigateTo("leave")}
          >
            📝 Leave Management
          </button>
        )}

        {/* Payroll */}
        {canAccess("payroll") && (
          <button
            className={page === "payroll" ? "active-menu" : ""}
            onClick={() => navigateTo("payroll")}
          >
            💰 Salary & Payroll
          </button>
        )}

        {/* Performance */}
        {canAccess("performance") && (
          <button
            className={page === "performance" ? "active-menu" : ""}
            onClick={() => navigateTo("performance")}
          >
            📊 Performance
          </button>
        )}

        {/* Documents */}
        {canAccess("documents") && (
          <button
            className={page === "documents" ? "active-menu" : ""}
            onClick={() => navigateTo("documents")}
          >
            📁 Employee Documents
          </button>
        )}

        {/* Reports */}
        {canAccess("reports") && (
          <button
            className={page === "reports" ? "active-menu" : ""}
            onClick={() => navigateTo("reports")}
          >
            📈 Reports & Analytics
          </button>
        )}

        {/* Profile */}
        {canAccess("profile") && (
          <button
            className={page === "profile" ? "active-menu" : ""}
            onClick={() => navigateTo("profile")}
          >
            ⚙️ Profile & Settings
          </button>
        )}

      </aside>

      {/* Main Content */}
      <main className="app-content">

        {/* Top Header */}
        <header className="topbar">

          <h3>
            {pageTitles[page] || "Employee Management"}
          </h3>

          <div className="topbar-user">
            <UserRound size={17} />

            <div>
              <strong>{currentUser.name}</strong>
              <small>{currentUser.role}</small>
            </div>
          </div>

        </header>

        {/* Dashboard */}
        {page === "dashboard" &&
          canAccess("dashboard") && <Dashboard />}

        {/* Employee Management */}
        {page === "employees" &&
          canAccess("employees") && <EmployeeManagement />}

        {/* Departments */}
        {page === "departments" &&
          canAccess("departments") && <Departments />}

        {/* Attendance */}
        {page === "attendance" &&
          canAccess("attendance") && <Attendance />}

        {/* Leave Management */}
        {page === "leave" &&
          canAccess("leave") && <LeaveManagement />}

        {/* Payroll */}
        {page === "payroll" &&
          canAccess("payroll") && <Payroll />}

        {/* Performance */}
        {page === "performance" &&
          canAccess("performance") && <Performance />}

        {/* Documents */}
        {page === "documents" &&
          canAccess("documents") && <Documents />}

        {/* Reports */}
        {page === "reports" &&
          canAccess("reports") && <Reports />}

        {/* Profile */}
        {page === "profile" &&
          canAccess("profile") && <Profile />}

      </main>

    </div>
  );
}

export default App;
