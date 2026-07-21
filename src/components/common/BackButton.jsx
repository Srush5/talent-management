import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = ({ label = "Back" }) => {
  const navigate = useNavigate();

  return (
    <button className="back-btn" onClick={() => navigate(-1)}>
      <FiArrowLeft />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;