
import React, { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState("Public");
  const [autoLogout, setAutoLogout] = useState(15); // Default to 15 minutes
  const [emailNotifications, setEmailNotifications] = useState(true); // Email notifications
  const [twoFactorAuth, setTwoFactorAuth] = useState(false); // Two-Factor Authentication
  const [backupFrequency, setBackupFrequency] = useState("Daily"); // Data Backup Frequency

  const handleSave = () => {
    alert("Settings saved!");
    // Here, we would typically call an API to save these preferences
    // For this demo, we'll simply log the settings
    console.log("Settings saved:", { notifications, privacy, autoLogout, emailNotifications, twoFactorAuth, backupFrequency });
  };

  const handleDeleteAccount = () => {
    const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmation) {
      alert("Account deleted!");
      // Add actual account deletion logic here
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Settings</h1>

      {/* Notification Toggle */}
      <div style={styles.settingItem}>
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            style={styles.checkbox}
          />
          <span style={styles.checkboxLabel}>Enable Notifications</span>
        </label>
      </div>

      {/* Account Privacy */}
      <div style={styles.settingItem}>
        <label style={styles.label}>
          Account Privacy:
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            style={styles.select}
          >
            <option value="Public">Public</option>
            <option value="Friends Only">Friends Only</option>
            <option value="Private">Private</option>
          </select>
        </label>
      </div>

      {/* Auto-Logout Timer */}
      <div style={styles.settingItem}>
        <label style={styles.label}>
          Auto-Logout After:
          <input
            type="number"
            value={autoLogout}
            onChange={(e) => setAutoLogout(e.target.value)}
            style={styles.numberInput}
            min="1"
            max="120"
          />{" "}
          minutes
        </label>
      </div>

      {/* Email Notifications Toggle */}
      <div style={styles.settingItem}>
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
            style={styles.checkbox}
          />
          <span style={styles.checkboxLabel}>Enable Email Notifications</span>
        </label>
      </div>

      {/* Two-Factor Authentication Toggle */}
      <div style={styles.settingItem}>
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={twoFactorAuth}
            onChange={() => setTwoFactorAuth(!twoFactorAuth)}
            style={styles.checkbox}
          />
          <span style={styles.checkboxLabel}>Enable Two-Factor Authentication</span>
        </label>
      </div>

      {/* Data Backup Frequency */}
      <div style={styles.settingItem}>
        <label style={styles.label}>
          Data Backup Frequency:
          <select
            value={backupFrequency}
            onChange={(e) => setBackupFrequency(e.target.value)}
            style={styles.select}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </label>
      </div>

      {/* Save Button */}
      <button onClick={handleSave} style={styles.saveButton}>
        Save Settings
      </button>

      {/* Account Deletion Button */}
      <button onClick={handleDeleteAccount} style={styles.deleteButton}>
        Delete Account
      </button>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: "30px",
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "24px",
    color: "#333",
  },
  settingItem: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "16px",
    color: "#555",
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    marginRight: "10px",
    transform: "scale(1.2)",
  },
  checkboxLabel: {
    marginLeft: "10px",
  },
  select: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    marginLeft: "10px",
    width: "60%",
  },
  numberInput: {
    padding: "8px",
    fontSize: "16px",
    width: "80px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    marginLeft: "10px",
  },
  saveButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  deleteButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#FF5733",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "15px",
  },
};

export default Settings;

