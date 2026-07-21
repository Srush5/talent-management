import React, { useEffect, useRef, useState } from "react";
import {
  FiBell,
  FiChevronsLeft,
  FiChevronsRight,
  FiMenu,
} from "react-icons/fi";
import { getAuthUser } from "../../utils/authStorage";
import TopbarMenu from "../common/TopbarMenu";
import { getCandidatesFromStorage } from "../../utils/candidateStorage";
import { formatDate } from "../../utils/formatters";

const Topbar = ({
  setSidebarOpen,
  sidebarCollapsed,
  toggleSidebarCollapsed,
}) => {
  const authUser = getAuthUser();
  const role = authUser?.role || "recruiter";

  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const candidates = getCandidatesFromStorage();

  const notifications = candidates
    .filter((candidate) => candidate.status === "Interview" && formatDate(candidate.interviewDate))
    .slice(0, 5)
    .map((candidate) => ({
      id: candidate.id,
      text: `${candidate.name} interview scheduled on ${candidate.interviewDate}`,
    }));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <FiMenu />
        </button>

        {!isMobile && (
          <button className="collapse-sidebar-btn" onClick={toggleSidebarCollapsed}>
            {sidebarCollapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
          </button>
        )}

        <div>
          <h1 className="topbar-title">Talent Management</h1>
          <p className="topbar-subtitle">
            {role === "interviewer" ? "Interviewer workspace" : "Recruiter workspace"}
          </p>
        </div>
      </div>

      <div className="topbar-right">

        <div className={`role-pill ${role === "interviewer" ? "role-pill-alt" : ""}`}>
          {role === "interviewer" ? "Interviewer" : "Recruiter"}
        </div>

        <div className="notification-wrap" ref={notificationRef}>
          <button
            className="icon-btn"
            onClick={() => setShowNotifications((prev) => !prev)}
            title="Notifications"
          >
            <FiBell />
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h4>Notifications</h4>
              </div>

              <div className="notification-list">
                {notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div className="notification-item" key={item.id}>
                      <p>{item.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="notification-item">
                    <p>No notifications available.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <TopbarMenu />
      </div>
    </header>
  );
};

export default Topbar;