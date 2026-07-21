import React, { useEffect, useState } from "react";
import PageHeader from "../components/common/PageHeader";

const Settings = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("talent_management_theme") || "light";
    setTheme(storedTheme);
    document.body.setAttribute("data-theme", storedTheme);
  }, []);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("talent_management_theme", selectedTheme);
    document.body.setAttribute("data-theme", selectedTheme);
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Workspace preferences" />

      <div className="settings-grid">
        <div className="card settings-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Theme</h3>
            </div>
          </div>

          <div className="theme-toggle-group">
            <button
              className={`theme-toggle-btn ${theme === "light" ? "active-theme-btn" : ""}`}
              onClick={() => handleThemeChange("light")}
            >
              Light
            </button>

            <button
              className={`theme-toggle-btn ${theme === "dark" ? "active-theme-btn" : ""}`}
              onClick={() => handleThemeChange("dark")}
            >
              Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;