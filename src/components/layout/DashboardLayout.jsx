import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { getUIPreferences, saveUIPreferences } from "../../utils/authStorage";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const prefs = getUIPreferences();
    setSidebarCollapsed(Boolean(prefs.sidebarCollapsed));
  }, []);

  const toggleSidebarCollapsed = () => {
    const nextValue = !sidebarCollapsed;
    setSidebarCollapsed(nextValue);

    const currentPrefs = getUIPreferences();
    saveUIPreferences({
      ...currentPrefs,
      sidebarCollapsed: nextValue,
    });
  };

  return (
    <div className={`app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
      />

      <div className="main-content">
        <Topbar
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebarCollapsed={toggleSidebarCollapsed}
        />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;