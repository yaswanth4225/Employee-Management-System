
import React, { useRef, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Building2,
  BriefcaseBusiness,
  Camera,
  LockKeyhole,
  Bell,
  Settings,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import "./Profile.css";

function Profile() {
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@company.com",
    phone: "9876543210",
    employeeId: "EMP001",
    department: "Administration",
    designation: "System Administrator",
    location: "Hyderabad",
    bio: "Managing employee operations and company administration."
  });

  const [photo, setPhoto] = useState("");
  const [saved, setSaved] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: ""
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPassword: false,
    confirm: false
  });

  const [notifications, setNotifications] = useState({
    email: true,
    leave: true,
    payroll: true,
    announcements: false
  });

  const [preferences, setPreferences] = useState({
    language: "English",
    theme: "Light",
    timezone: "Asia/Kolkata"
  });

  const [passwordMessage, setPasswordMessage] = useState("");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile(previous => ({
      ...previous,
      [name]: value
    }));

    setSaved(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setSaved(true);
    alert("Profile details saved in this demo.");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (passwords.newPassword.length < 8) {
      setPasswordMessage("New password must contain at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      setPasswordMessage("New password and confirmation do not match.");
      return;
    }

    if (!passwords.current) {
      setPasswordMessage("Please enter your current password.");
      return;
    }

    setPasswordMessage(
      "Password validation passed. Connect the backend to securely update it."
    );

    setPasswords({
      current: "",
      newPassword: "",
      confirm: ""
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(previous => ({
      ...previous,
      [field]: !previous[field]
    }));
  };

  const resetProfile = () => {
    setProfile({
      name: "Admin User",
      email: "admin@company.com",
      phone: "9876543210",
      employeeId: "EMP001",
      department: "Administration",
      designation: "System Administrator",
      location: "Hyderabad",
      bio: "Managing employee operations and company administration."
    });

    setPhoto("");
    setSaved(false);
  };

  return (
    <div className="profile-page">

      {/* Page Header */}
      <div className="profile-page-header">
        <div>
          <h1>Profile & Settings</h1>
          <p>Manage your personal information and account preferences.</p>
        </div>

        <div className="profile-account-status">
          <ShieldCheck size={17} />
          Account Settings
        </div>
      </div>

      {/* Profile Overview */}
      <div className="profile-overview-card">
        <div className="profile-avatar-area">
          <div className="profile-avatar">
            {photo ? (
              <img src={photo} alt="Profile" />
            ) : (
              <UserRound size={38} />
            )}
          </div>

          <button
            type="button"
            className="profile-camera-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Change profile picture"
          >
            <Camera size={15} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhotoChange}
          />
        </div>

        <div className="profile-overview-info">
          <h2>{profile.name}</h2>
          <p>{profile.designation}</p>
          <span>
            <Building2 size={14} />
            {profile.department}
          </span>
        </div>

        <div className="profile-overview-id">
          <small>Employee ID</small>
          <strong>{profile.employeeId}</strong>
        </div>
      </div>

      {/* Main Layout */}
      <div className="profile-content-grid">

        {/* Left Column */}
        <div className="profile-main-column">

          {/* Personal Information */}
          <form
            className="profile-section-card"
            onSubmit={handleProfileSave}
          >
            <div className="profile-section-title">
              <div className="profile-title-icon">
                <UserRound size={18} />
              </div>
              <div>
                <h2>Personal Information</h2>
                <p>Update your personal and work details.</p>
              </div>
            </div>

            <div className="profile-fields-grid">

              <div className="profile-field">
                <label>
                  <UserRound size={14} /> Full Name
                </label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label>
                  <Mail size={14} /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label>
                  <Phone size={14} /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label>
                  <Building2 size={14} /> Department
                </label>
                <input
                  name="department"
                  value={profile.department}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="profile-field">
                <label>
                  <BriefcaseBusiness size={14} /> Designation
                </label>
                <input
                  name="designation"
                  value={profile.designation}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="profile-field">
                <label>
                  <Building2 size={14} /> Location
                </label>
                <input
                  name="location"
                  value={profile.location}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="profile-field full-width">
                <label>About Me</label>
                <textarea
                  name="bio"
                  rows="3"
                  value={profile.bio}
                  onChange={handleProfileChange}
                />
              </div>

            </div>

            <div className="profile-form-actions">
              <button type="button" className="profile-reset-btn" onClick={resetProfile}>
                <RotateCcw size={15} />
                Reset
              </button>

              <button type="submit" className="profile-save-btn">
                <Save size={16} />
                Save Changes
              </button>
            </div>

            {saved && (
              <p className="profile-success-message">
                <CheckCircle2 size={15} />
                Profile changes saved in this demo.
              </p>
            )}
          </form>

          {/* Password Settings */}
          <form
            className="profile-section-card"
            onSubmit={handlePasswordChange}
          >
            <div className="profile-section-title">
              <div className="profile-title-icon">
                <LockKeyhole size={18} />
              </div>
              <div>
                <h2>Change Password</h2>
                <p>Keep your account secure with a strong password.</p>
              </div>
            </div>

            {[
              { key: "current", label: "Current Password" },
              { key: "newPassword", label: "New Password" },
              { key: "confirm", label: "Confirm New Password" }
            ].map(field => (
              <div className="profile-field password-field" key={field.key}>
                <label>{field.label}</label>

                <div className="password-input-wrapper">
                  <input
                    type={showPasswords[field.key] ? "text" : "password"}
                    value={passwords[field.key]}
                    onChange={e => {
                      setPasswords(previous => ({
                        ...previous,
                        [field.key]: e.target.value
                      }));
                      setPasswordMessage("");
                    }}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(field.key)}
                    aria-label="Toggle password visibility"
                  >
                    {showPasswords[field.key] ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>
            ))}

            <button type="submit" className="profile-save-btn">
              <LockKeyhole size={15} />
              Update Password
            </button>

            {passwordMessage && (
              <p className="profile-password-message">
                {passwordMessage}
              </p>
            )}
          </form>

        </div>

        {/* Right Column */}
        <div className="profile-side-column">

          {/* Notifications */}
          <div className="profile-section-card">
            <div className="profile-section-title">
              <div className="profile-title-icon">
                <Bell size={18} />
              </div>
              <div>
                <h2>Notifications</h2>
                <p>Choose which alerts you receive.</p>
              </div>
            </div>

            {[
              { key: "email", title: "Email Notifications", desc: "Receive updates by email." },
              { key: "leave", title: "Leave Updates", desc: "Get leave request notifications." },
              { key: "payroll", title: "Payroll Alerts", desc: "Receive salary-related alerts." },
              { key: "announcements", title: "Announcements", desc: "Get company news and notices." }
            ].map(item => (
              <div className="profile-toggle-row" key={item.key}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>

                <label className="profile-switch">
                  <input
                    type="checkbox"
                    checked={notifications[item.key]}
                    onChange={e =>
                      setNotifications(previous => ({
                        ...previous,
                        [item.key]: e.target.checked
                      }))
                    }
                  />
                  <span className="profile-slider"></span>
                </label>
              </div>
            ))}

          </div>

          {/* Preferences */}
          <div className="profile-section-card">
            <div className="profile-section-title">
              <div className="profile-title-icon">
                <Settings size={18} />
              </div>
              <div>
                <h2>Preferences</h2>
                <p>Customize your application experience.</p>
              </div>
            </div>

            <div className="profile-field">
              <label>Language</label>
              <select
                value={preferences.language}
                onChange={e =>
                  setPreferences(previous => ({
                    ...previous,
                    language: e.target.value
                  }))
                }
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Telugu</option>
              </select>
            </div>

            <div className="profile-field">
              <label>Theme</label>
              <select
                value={preferences.theme}
                onChange={e =>
                  setPreferences(previous => ({
                    ...previous,
                    theme: e.target.value
                  }))
                }
              >
                <option>Light</option>
                <option>Dark</option>
                <option>System Default</option>
              </select>
            </div>

            <div className="profile-field">
              <label>Time Zone</label>
              <select
                value={preferences.timezone}
                onChange={e =>
                  setPreferences(previous => ({
                    ...previous,
                    timezone: e.target.value
                  }))
                }
              >
                <option value="Asia/Kolkata">India Standard Time</option>
                <option value="UTC">UTC</option>
                <option value="Europe/London">London</option>
                <option value="America/New_York">New York</option>
              </select>
            </div>

            <button
              className="profile-save-btn preference-save-btn"
              onClick={() => alert("Preferences saved in this demo.")}
            >
              <Save size={15} />
              Save Preferences
            </button>
          </div>

          {/* Account Information */}
          <div className="profile-section-card profile-account-card">
            <div className="profile-section-title">
              <div className="profile-title-icon">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h2>Account Information</h2>
                <p>Your account details.</p>
              </div>
            </div>

            <div className="profile-account-row">
              <span>Account Type</span>
              <strong>Administrator</strong>
            </div>

            <div className="profile-account-row">
              <span>Employee ID</span>
              <strong>{profile.employeeId}</strong>
            </div>

            <div className="profile-account-row">
              <span>Account Status</span>
              <span className="profile-active-status">Active</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
