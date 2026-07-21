import React, { useEffect, useRef, useState } from "react";
import { FiLogOut, FiMoreVertical, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../utils/authStorage";

const TopbarMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="topbar-menu-wrap" ref={menuRef}>
      <button
        className="icon-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        title="Menu"
      >
        <FiMoreVertical />
      </button>

      {isOpen && (
        <div className="topbar-dropdown-menu">
          <button
            className="topbar-dropdown-item"
            onClick={() => {
              navigate("/settings");
              setIsOpen(false);
            }}
          >
            <FiSettings />
            <span>Settings</span>
          </button>

          <button className="topbar-dropdown-item" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TopbarMenu;