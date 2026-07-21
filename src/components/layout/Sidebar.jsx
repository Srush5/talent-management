import React from "react";
import { NavLink } from "react-router-dom";
import { FiCalendar, FiColumns, FiHome, FiUsers, FiX } from "react-icons/fi";
import { getAuthUser } from "../../utils/authStorage";

const Sidebar = ({ sidebarOpen, setSidebarOpen, sidebarCollapsed }) => {
  const authUser = getAuthUser();
  const role = authUser?.role || "recruiter";
  const email = authUser?.email || "user@company.com";
  const emailInitial = email.charAt(0).toUpperCase();

  const recruiterNavItems = [
    { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    {
      label: "Application Status",
      path: "/application-status",
      icon: <FiColumns />,
    },
    { label: "Candidates", path: "/candidates", icon: <FiUsers /> },
    { label: "Interviews", path: "/interviews", icon: <FiCalendar /> },
  ];

  const interviewerNavItems = [
    { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { label: "Interviews", path: "/interviews", icon: <FiCalendar /> },
  ];

  const navItems =
    role === "interviewer" ? interviewerNavItems : recruiterNavItems;

  return (
    <>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show-overlay" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`sidebar ${sidebarOpen ? "show-sidebar" : ""} ${
          sidebarCollapsed ? "collapsed-sidebar" : ""
        }`}
      >
        <div className="sidebar-top">
          <div className="sidebar-brand-wrap">
            <h2 className="brand-title">
              {sidebarCollapsed ? "TM" : "Talent Management"}
            </h2>
            {!sidebarCollapsed && (
              <p className="brand-subtitle">
                {role === "interviewer" ? "Interview Panel" : "Recruiter Panel"}
              </p>
            )}
          </div>

          <button
            className="mobile-close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-item active-nav" : "nav-item"
              }
              onClick={() => setSidebarOpen(false)}
              title={sidebarCollapsed ? item.label : ""}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="recruiter-card">
            <div className="avatar-circle">{emailInitial}</div>

            {!sidebarCollapsed && (
              <div className="sidebar-user-text">
                <h4>{email}</h4>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;