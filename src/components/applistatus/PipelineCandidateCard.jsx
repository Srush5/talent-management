import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiEye, FiXCircle } from "react-icons/fi";

const PipelineCandidateCard = ({
  candidate,
  onMoveNext,
  onMovePrevious,
  onReject,
  isFirstStage,
  isLastStage,
  isRejectedColumn,
}) => {
  return (
    <div className="pipeline-candidate-card">
      <div className="pipeline-card-top">
        <div className="table-avatar">
          {candidate.name.slice(0, 2).toUpperCase()}
        </div>

        <div className="pipeline-card-text">
          <h4>{candidate.name}</h4>
          <p>{candidate.role}</p>
        </div>
      </div>

      <div className="pipeline-card-meta">
        <span>{candidate.location}</span>
        <span>{candidate.experience}</span>
      </div>

      <div className="pipeline-card-skills">
        {candidate.skills?.slice(0, 3).map((skill, index) => (
          <span className="pipeline-skill-tag" key={`${skill}-${index}`}>
            {skill}
          </span>
        ))}
      </div>

      <div className="pipeline-card-footer">
        <div className="pipeline-score-pill">Score: {candidate.score || 0}%</div>
        <Link to={`/candidates/${candidate.id}`} className="pipeline-view-link">
          <FiEye />
          <span>View</span>
        </Link>
      </div>

      {!isRejectedColumn && (
        <div className="pipeline-action-row">
          {!isFirstStage && (
            <button
              className="pipeline-action-btn secondary-stage-btn"
              onClick={() => onMovePrevious(candidate)}
            >
              <FiArrowLeft />
            </button>
          )}

          {!isLastStage && (
            <button
              className="pipeline-action-btn primary-stage-btn"
              onClick={() => onMoveNext(candidate)}
            >
              <FiArrowRight />
            </button>
          )}

          <button
            className="pipeline-action-btn reject-stage-btn"
            onClick={() => onReject(candidate)}
            title="Reject candidate"
          >
            <FiXCircle />
          </button>
        </div>
      )}
    </div>
  );
};

export default PipelineCandidateCard;