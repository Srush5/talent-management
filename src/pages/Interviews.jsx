import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiEdit2,
  FiExternalLink,
  FiMapPin,
} from "react-icons/fi";
import PageHeader from "../components/common/PageHeader";
import StatusBadge from "../components/candidates/StatusBadge";
import { formatDate } from "../utils/formatters";
import {
  getCandidatesFromStorage,
  updateCandidateInStorage,
} from "../utils/candidateStorage";
import { getAuthUser } from "../utils/authStorage";

const Interviews = () => {
  const authUser = getAuthUser();
  const role = authUser?.role || "recruiter";

  const [candidates, setCandidates] = useState([]);

  const [editingRecruiterNotesId, setEditingRecruiterNotesId] = useState(null);
  const [recruiterNotesDraft, setRecruiterNotesDraft] = useState("");

  const [editingRemarksId, setEditingRemarksId] = useState(null);
  const [remarksDraft, setRemarksDraft] = useState("");

  const cardRefs = useRef({});

  useEffect(() => {
    const storedCandidates = getCandidatesFromStorage();
    setCandidates(storedCandidates);
  }, []);

  const interviewCandidates = useMemo(() => {
  return [...candidates]
    .filter(
      (candidate) =>
        candidate.status === "Interview" &&
        candidate.interviewDate
    )
    .sort(
      (a, b) =>
        new Date(a.interviewDate).getTime() -
        new Date(b.interviewDate).getTime()
    );
}, [candidates]);

  const interviewSchedule = useMemo(() => {
  return [...candidates]
    .filter(
      (candidate) =>
        candidate.status === "Interview" &&
        candidate.interviewDate
    )
    .sort(
      (a, b) =>
        new Date(a.interviewDate).getTime() -
        new Date(b.interviewDate).getTime()
    );
}, [candidates]);

  const scrollToCandidateCard = (candidateId) => {
    const node = cardRefs.current[candidateId];
    if (node) {
      const topPosition =
        node.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
    }
  };

  const startEditingRecruiterNotes = (candidate) => {
    setEditingRecruiterNotesId(candidate.id);
    setRecruiterNotesDraft(candidate.notes || "");
  };

  const saveRecruiterNotes = (candidate) => {
    const updatedCandidate = {
      ...candidate,
      notes: recruiterNotesDraft.trim(),
    };

    updateCandidateInStorage(updatedCandidate);

    setCandidates((prev) =>
      prev.map((item) => (item.id === candidate.id ? updatedCandidate : item))
    );

    setEditingRecruiterNotesId(null);
    setRecruiterNotesDraft("");
  };

  const startEditingRemarks = (candidate) => {
    setEditingRemarksId(candidate.id);
    setRemarksDraft(candidate.interviewerRemarks || "");
  };

  const saveRemarks = (candidate) => {
    const updatedCandidate = {
      ...candidate,
      interviewerRemarks: remarksDraft.trim(),
    };

    updateCandidateInStorage(updatedCandidate);

    setCandidates((prev) =>
      prev.map((item) => (item.id === candidate.id ? updatedCandidate : item))
    );

    setEditingRemarksId(null);
    setRemarksDraft("");
  };

  return (
    <div>
      <PageHeader
        title="Interviews"
        subtitle={
          role === "interviewer"
            ? "Review scheduled interviews and add remarks."
            : "Track scheduled interviews and manage recruiter notes."
        }
      />

      {interviewSchedule.length > 0 && (
        <div className="card interview-schedule-strip">
          <div className="section-header-compact">
            <div>
              <h3 className="card-title">Interview Calendar</h3>
            </div>
          </div>

          <div className="schedule-chip-row">
            {interviewSchedule.map((candidate) => (
              <button
                key={candidate.id}
                className="schedule-chip"
                onClick={() => scrollToCandidateCard(candidate.id)}
              >
                <span>{formatDate(candidate.interviewDate)}</span>
                <strong>{candidate.name}</strong>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="interview-cards-grid section-spacing">
        {interviewCandidates.length > 0 ? (
          interviewCandidates.map((candidate) => (
            <div
              className="card interview-card"
              key={candidate.id}
              ref={(el) => {
                cardRefs.current[candidate.id] = el;
              }}
            >
              <div className="interview-card-top">
                <div className="candidate-cell">
                  <div className="table-avatar">
                    {candidate.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4>{candidate.name}</h4>
                    <p>{candidate.role}</p>
                  </div>
                </div>

                <StatusBadge status={candidate.status} />
              </div>

              <div className="interview-card-details">
                <div className="interview-detail-row">
                  <FiCalendar />
                  <span>{formatDate(candidate.interviewDate)}</span>
                </div>

                <div className="interview-detail-row">
                  <FiMapPin />
                  <span>{candidate.location}</span>
                </div>

                <div className="interview-detail-row">
                  <FiClock />
                  <span>{candidate.experience}</span>
                </div>
              </div>

              <div className="interview-card-skills">
                {candidate.skills?.slice(0, 3).map((skill, index) => (
                  <span key={`${skill}-${index}`} className="pipeline-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>

              {candidate.meetingLink && (
                <div className="meeting-link-box">
                  <p className="meeting-link-label">Meeting Link</p>
                  <a
                    href={candidate.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="meeting-link-anchor"
                  >
                    <FiExternalLink />
                    <span>Open interview meeting</span>
                  </a>
                </div>
              )}

              
              <div className="interviewer-remarks-card">
                <div className="interviewer-remarks-header">
                  <h4>Recruiter Notes</h4>

                  {role === "recruiter" &&
                    editingRecruiterNotesId !== candidate.id && (
                      <button
                        className="remarks-edit-btn"
                        onClick={() => startEditingRecruiterNotes(candidate)}
                      >
                        <FiEdit2 />
                        <span>Edit</span>
                      </button>
                    )}
                </div>

                {role === "recruiter" &&
                editingRecruiterNotesId === candidate.id ? (
                  <div className="remarks-editor">
                    <textarea
                      rows="4"
                      value={recruiterNotesDraft}
                      onChange={(e) => setRecruiterNotesDraft(e.target.value)}
                      placeholder="Add recruiter notes"
                    />
                    <div className="remarks-editor-actions">
                      <button
                        className="secondary-btn"
                        onClick={() => {
                          setEditingRecruiterNotesId(null);
                          setRecruiterNotesDraft("");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="primary-btn"
                        onClick={() => saveRecruiterNotes(candidate)}
                      >
                        Save Notes
                      </button>
                    </div>
                  </div>
                ) : candidate.notes ? (
                  <p className="remarks-text">{candidate.notes}</p>
                ) : (
                  <p className="muted-text">No recruiter notes added yet.</p>
                )}
              </div>

              
              <div className="interviewer-remarks-card">
                <div className="interviewer-remarks-header">
                  <h4>Interviewer Remarks</h4>

                  {role === "interviewer" && editingRemarksId !== candidate.id && (
                    <button
                      className="remarks-edit-btn"
                      onClick={() => startEditingRemarks(candidate)}
                    >
                      <FiEdit2 />
                      <span>Edit</span>
                    </button>
                  )}
                </div>

                {role === "interviewer" && editingRemarksId === candidate.id ? (
                  <div className="remarks-editor">
                    <textarea
                      rows="4"
                      value={remarksDraft}
                      onChange={(e) => setRemarksDraft(e.target.value)}
                      placeholder="Add interview feedback"
                    />
                    <div className="remarks-editor-actions">
                      <button
                        className="secondary-btn"
                        onClick={() => {
                          setEditingRemarksId(null);
                          setRemarksDraft("");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="primary-btn"
                        onClick={() => saveRemarks(candidate)}
                      >
                        Save Remarks
                      </button>
                    </div>
                  </div>
                ) : candidate.interviewerRemarks ? (
                  <p className="remarks-text">{candidate.interviewerRemarks}</p>
                ) : (
                  <p className="muted-text">No interviewer remarks added yet.</p>
                )}
              </div>

              <div className="interview-card-actions">
                <Link to={`/candidates/${candidate.id}`} className="secondary-btn">
                  View Profile
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="card empty-candidate-state">
            <h3>No interviews found</h3>
            <p>No interview-stage candidates are scheduled yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviews;