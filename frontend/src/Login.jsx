
import React, { useState } from "react";
import {
  Users,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  BriefcaseBusiness,
  UserRound
} from "lucide-react";
import { loginUser } from "./api";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // Call Spring Boot login API
      const data = await loginUser(email.trim(), password);

      // Prepare authenticated user details
      const user = {
        name: data.email.split("@")[0],
        email: data.email,
        role: data.role,
        token: data.token
      };

      // Send user details to App.jsx
      onLogin(user);

    } catch (err) {
      setError(
        err.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left-panel">
        <div className="login-brand">
          <div className="login-brand-icon">
            <Users size={25} />
          </div>
          <span>EMS Portal</span>
        </div>

        <div className="login-welcome-content">
          <span className="login-welcome-label">
            EMPLOYEE MANAGEMENT SYSTEM
          </span>

          <h1>
            Manage your workforce
            <br />
            <span>with confidence.</span>
          </h1>

          <p>
            A centralized platform to manage employees, attendance,
            payroll, performance and company operations.
          </p>

          <div className="login-feature-list">
            <div>
              <ShieldCheck size={19} />
              <span>Secure account access</span>
            </div>

            <div>
              <BriefcaseBusiness size={19} />
              <span>Organized employee management</span>
            </div>

            <div>
              <UserRound size={19} />
              <span>Role-based user experience</span>
            </div>
          </div>
        </div>

        <div className="login-left-footer">
          © 2026 Employee Management System
        </div>
      </div>

      <div className="login-right-panel">
        <div className="login-form-container">
          <div className="login-mobile-brand">
            <div className="login-brand-icon">
              <Users size={23} />
            </div>
            <span>EMS Portal</span>
          </div>

          <div className="login-heading">
            <span className="login-small-label">WELCOME BACK</span>
            <h2>Sign in to your account</h2>
            <p>Enter your account details to continue.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="login-email">Email Address</label>

              <div className="login-input-wrapper">
                <Mail size={18} />
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="login-input-group">
              <label htmlFor="login-password">Password</label>

              <div className="login-input-wrapper">
                <LockKeyhole size={18} />

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="login-eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="login-security-note">
            <ShieldCheck size={15} />
            Your account is authenticated through the EMS server.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
