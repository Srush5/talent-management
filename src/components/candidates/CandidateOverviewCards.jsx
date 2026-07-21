import React from "react";
import { FiAward, FiCalendar, FiClock, FiTrendingUp } from "react-icons/fi";
import { formatDate } from "../../utils/formatters";

const CandidateOverviewCards = ({ candidate }) => {
  const overviewItems = [
    {
      id: 1,
      label: "Experience",
      value: candidate.experience || "-",
      icon: <FiClock />,
      className: "overview-icon-purple",
    },
    {
      id: 2,
      label: "Candidate Score",
      value:
        candidate.score || candidate.score === 0 ? `${candidate.score}%` : "-",
      icon: <FiAward />,
      className: "overview-icon-green",
    },
    {
      id: 3,
      label: "Applied On",
      value: formatDate(candidate.appliedDate),
      icon: <FiCalendar />,
      className: "overview-icon-blue",
    },
    {
      id: 4,
      label: "Interview Date",
      value: formatDate(candidate.interviewDate),
      icon: <FiTrendingUp />,
      className: "overview-icon-orange",
    },
  ];

  return (
    <div className="candidate-overview-grid">
      {overviewItems.map((item) => (
        <div className="card overview-card" key={item.id}>
          <div className="overview-card-top">
            <div>
              <p className="overview-label">{item.label}</p>
              <h3 className="overview-value">{item.value}</h3>
            </div>
            <div className={`overview-icon ${item.className}`}>{item.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateOverviewCards;