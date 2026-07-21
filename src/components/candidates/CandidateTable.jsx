import React from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../../utils/formatters";

const CandidateTable = ({ candidates, onDelete }) => {
  if (!candidates.length) {
    return (
      <div className="card empty-candidate-state">
        <h3>No candidates found</h3>
        <p>Try changing the search, filters, or sort options.</p>
      </div>
    );
  }

  return (
    <div className="card candidate-table-card">
      <div className="table-wrapper">
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Role</th>
              <th>Location</th>
              <th>Experience</th>
              <th>Score</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Interview</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <div className="candidate-cell">
                    <div className="table-avatar">
                      {candidate.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4>{candidate.name}</h4>
                      <p>{candidate.email}</p>
                    </div>
                  </div>
                </td>

                <td>{candidate.role}</td>
                <td>{candidate.location}</td>
                <td>{candidate.experience}</td>
                <td>{candidate.score}%</td>
                <td>
                  <StatusBadge status={candidate.status} />
                </td>
                <td>{formatDate(candidate.appliedDate)}</td>
                <td>{formatDate(candidate.interviewDate)}</td>

                <td>
                  <div className="table-actions">
                    <Link
                      to={`/candidates/${candidate.id}`}
                      className="table-action-btn view-btn"
                      title="View"
                    >
                      <FiEye />
                    </Link>

                    <Link
                      to={`/candidates/edit/${candidate.id}`}
                      className="table-action-btn edit-btn"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </Link>

                    <button
                      className="table-action-btn delete-btn"
                      title="Delete"
                      onClick={() => onDelete(candidate.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateTable;