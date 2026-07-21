import React, { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import PipelineColumn from "../components/applistatus/PipelineColumn";
import {
  getCandidatesFromStorage,
  saveCandidatesToStorage,
} from "../utils/candidateStorage";
import { formatDate } from "../utils/formatters";

const stages = ["Screening", "Interview", "Offer", "Rejected"];

const Pipeline = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const storedCandidates = getCandidatesFromStorage();
    setCandidates(storedCandidates);
  }, []);

  const groupedCandidates = useMemo(() => {
    return stages.reduce((acc, stage) => {
      acc[stage] = candidates.filter((candidate) => candidate.status === stage);
      return acc;
    }, {});
  }, [candidates]);

  const upcomingEvents = useMemo(() => {
    return candidates
      .filter(
        (candidate) =>
          candidate.status === "Interview" && candidate.interviewDate
      )
      .sort(
        (a, b) =>
          new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime()
      )
      .slice(0, 6)
      .map((candidate) => ({
        id: candidate.id,
        title: `${candidate.name} interview scheduled`,
        date: candidate.interviewDate,
      }));
  }, [candidates]);

  const updateCandidateStatus = (candidateId, newStatus) => {
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate
    );

    setCandidates(updatedCandidates);
    saveCandidatesToStorage(updatedCandidates);
  };

  const handleMoveNext = (candidate) => {
    const currentIndex = stages.indexOf(candidate.status);
    if (currentIndex === -1 || currentIndex >= stages.length - 2) return;
    const nextStage = stages[currentIndex + 1];
    updateCandidateStatus(candidate.id, nextStage);
  };

  const handleMovePrevious = (candidate) => {
    const currentIndex = stages.indexOf(candidate.status);
    if (currentIndex <= 0) return;
    const previousStage = stages[currentIndex - 1];
    updateCandidateStatus(candidate.id, previousStage);
  };

  const handleReject = (candidate) => {
    updateCandidateStatus(candidate.id, "Rejected");
  };

  return (
    <div>
      <PageHeader
        title="Application Status"
        subtitle="Track hiring stages and interview-stage activity."
      />

      {upcomingEvents.length > 0 && (
        <div className="card attention-board">
          <div className="section-header-compact">
            <div>
              <h3 className="card-title">Upcoming Events</h3>
            </div>
          </div>

          <div className="attention-grid">
            {upcomingEvents.map((item) => (
              <div className="attention-card" key={item.id}>
                <span className="attention-tag">Interview</span>
                <p>{item.title}</p>
                <small>{formatDate(item.date)}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="application-status-board section-spacing">
        <PipelineColumn
          title="Screening"
          candidates={groupedCandidates.Screening || []}
          onMoveNext={handleMoveNext}
          onMovePrevious={handleMovePrevious}
          onReject={handleReject}
          isFirstStage={true}
        />

        <PipelineColumn
          title="Interview"
          candidates={groupedCandidates.Interview || []}
          onMoveNext={handleMoveNext}
          onMovePrevious={handleMovePrevious}
          onReject={handleReject}
        />

        <PipelineColumn
          title="Offer"
          candidates={groupedCandidates.Offer || []}
          onMoveNext={handleMoveNext}
          onMovePrevious={handleMovePrevious}
          onReject={handleReject}
          isLastStage={true}
        />

        <PipelineColumn
          title="Rejected"
          candidates={groupedCandidates.Rejected || []}
          onMoveNext={handleMoveNext}
          onMovePrevious={handleMovePrevious}
          onReject={handleReject}
          isRejectedColumn={true}
        />
      </div>
    </div>
  );
};

export default Pipeline;