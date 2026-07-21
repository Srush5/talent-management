import React from "react";
import PipelineCandidateCard from "./PipelineCandidateCard";

const PipelineColumn = ({
  title,
  candidates,
  onMoveNext,
  onMovePrevious,
  onReject,
  isFirstStage,
  isLastStage,
  isRejectedColumn,
}) => {
  return (
    <div className="pipeline-column">
      <div className="pipeline-column-header">
        <div>
          <h3>{title}</h3>
          <p>{candidates.length} candidate{candidates.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="pipeline-column-body">
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <PipelineCandidateCard
              key={candidate.id}
              candidate={candidate}
              onMoveNext={onMoveNext}
              onMovePrevious={onMovePrevious}
              onReject={onReject}
              isFirstStage={isFirstStage}
              isLastStage={isLastStage}
              isRejectedColumn={isRejectedColumn}
            />
          ))
        ) : (
          <div className="pipeline-empty-column">
            <p>No candidates in {title.toLowerCase()} stage.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PipelineColumn;