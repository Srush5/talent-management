import React from "react";

const getStatusClass = (status) => {
  switch (status) {
    case "Screening":
      return "status-screening";
    case "Interview":
      return "status-interview";
    case "Offer":
      return "status-offer";
    case "Rejected":
      return "status-rejected";
    default:
      return "";
  }
};

const StatusBadge = ({ status }) => {
  return <span className={`status-badge ${getStatusClass(status)}`}>{status}</span>;
};

export default StatusBadge;