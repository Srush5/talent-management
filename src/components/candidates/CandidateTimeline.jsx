import React from "react";

const getStageStatus = (currentStatus, stage) => {
  const stageOrder = [ "Screening", "Interview", "Offer"];
  const currentIndex = stageOrder.indexOf(currentStatus);
  const stageIndex = stageOrder.indexOf(stage);

  if (currentStatus === "Rejected") {
    if (stage === "Screening") return "completed";
    return "pending";
  }

  if (stageIndex < currentIndex) return "completed";
  if (stageIndex === currentIndex) return "current";
  return "pending";
};

const CandidateTimeline = ({ candidate }) => {
  const stages = [ "Screening", "Interview", "Offer"];

  return (
    <div className="card">
      <div className="card-header-row">
        <div>
          <h3 className="card-title">Hiring Timeline</h3>
          <p className="card-subtitle">
            Track how the candidate is progressing through the recruitment flow.
          </p>
        </div>
      </div>

      <div className="timeline-list">
        {stages.map((stage, index) => {
          const state = getStageStatus(candidate.status, stage);

          return (
            <div className="timeline-item" key={stage}>
              <div className="timeline-visual">
                <div className={`timeline-dot ${state}`}></div>
                {index !== stages.length - 1 && <div className="timeline-line"></div>}
              </div>

              <div className="timeline-content">
                <h4>{stage}</h4>
                <p>
                  {state === "completed" && "Stage completed successfully."}
                  {state === "current" && "Candidate is currently in this stage."}
                  {state === "pending" && "This stage has not been reached yet."}
                </p>
              </div>
            </div>
          );
        })}

        {candidate.status === "Rejected" && (
          <div className="timeline-item rejected-timeline-row">
            <div className="timeline-visual">
              <div className="timeline-dot rejected-dot"></div>
            </div>

            <div className="timeline-content">
              <h4>Rejected</h4>
              <p>Candidate has been marked as rejected in the current hiring cycle.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateTimeline;