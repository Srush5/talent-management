import React from "react";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiDollarSign,
  FiEdit2,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import StatusBadge from "./StatusBadge";

const CandidateProfileCard = ({ candidate }) => {
  return (
    <div className="card candidate-profile-card">
      <div className="candidate-profile-top">
        <div className="candidate-profile-left">
          <div className="profile-avatar-large">
            {candidate.name.slice(0, 2).toUpperCase()}
          </div>

          <div className="candidate-profile-text">
            <div className="candidate-name-row">
              <h2>{candidate.name}</h2>
              <StatusBadge status={candidate.status} />
            </div>

            <p className="candidate-role-line">
              <FiBriefcase />
              <span>{candidate.role}</span>
            </p>

            <div className="candidate-contact-grid">
              <div className="contact-chip">
                <FiMail />
                <span>{candidate.email}</span>
              </div>

              <div className="contact-chip">
                <FiPhone />
                <span>{candidate.phone}</span>
              </div>

              <div className="contact-chip">
                <FiMapPin />
                <span>{candidate.location}</span>
              </div>

              <div className="contact-chip">
                <FiDollarSign />
                <span>{candidate.expectedSalary}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="candidate-profile-actions">
          <Link
            to={`/candidates/edit/${candidate.id}`}
            className="primary-btn profile-edit-btn"
          >
            <FiEdit2 />
            <span>Edit Candidate</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileCard;