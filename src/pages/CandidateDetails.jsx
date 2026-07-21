import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit2, FiExternalLink } from "react-icons/fi";
import PageHeader from "../components/common/PageHeader";
import CandidateProfileCard from "../components/candidates/CandidateProfileCard";
import CandidateOverviewCards from "../components/candidates/CandidateOverviewCards";
import CandidateTimeline from "../components/candidates/CandidateTimeline";
import BackButton from "../components/common/BackButton";
import {
  getCandidateById,
  updateCandidateInStorage,
} from "../utils/candidateStorage";
import { getAuthUser } from "../utils/authStorage";

const CandidateDetails = () => {
  const { id } = useParams();
  const authUser = getAuthUser();
  const role = authUser?.role || "recruiter";

  const candidate = useMemo(() => getCandidateById(id), [id]);

  const [isEditingRemarks, setIsEditingRemarks] = useState(false);
  const [remarksDraft, setRemarksDraft] = useState(
    candidate?.interviewerRemarks || ""
  );

  const [isEditingRecruiterNotes, setIsEditingRecruiterNotes] = useState(false);
  const [recruiterNotesDraft, setRecruiterNotesDraft] = useState(
    candidate?.notes || ""
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  if (!candidate) {
    return (
      <div>
        <PageHeader
          title="Candidate Details"
          subtitle="Candidate profile could not be found."
        />

        <BackButton label="Back" />

        <div className="placeholder-card section-spacing">
          <h3>Candidate not found</h3>
          <p>The candidate profile you are trying to access does not exist.</p>
          <div className="section-spacing">
            <Link to="/dashboard" className="primary-btn">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveRemarks = () => {
    const updatedCandidate = {
      ...candidate,
      interviewerRemarks: remarksDraft.trim(),
    };

    updateCandidateInStorage(updatedCandidate);
    setIsEditingRemarks(false);
    window.location.reload();
  };

  const handleSaveRecruiterNotes = () => {
    const updatedCandidate = {
      ...candidate,
      notes: recruiterNotesDraft.trim(),
    };

    updateCandidateInStorage(updatedCandidate);
    setIsEditingRecruiterNotes(false);
    window.location.reload();
  };

  return (
    <div>
      <PageHeader
        title="Candidate Details"
        subtitle="Complete candidate profile"
      />

      <BackButton label="Back" />

      <div className="section-spacing">
        <CandidateProfileCard candidate={candidate} />
      </div>

      <div className="section-spacing">
        <CandidateOverviewCards candidate={candidate} />
      </div>

      <div className="candidate-details-grid section-spacing">
        <div className="candidate-details-left">
          <div className="card">
            <div className="card-header-row">
              <h3 className="card-title">Skills</h3>
            </div>

            <div className="skills-tag-list">
              {candidate.skills && candidate.skills.length > 0 ? (
                candidate.skills.map((skill, index) => (
                  <span className="skill-tag" key={`${skill}-${index}`}>
                    {skill}
                  </span>
                ))
              ) : (
                <p className="muted-text">No skills added yet.</p>
              )}
            </div>
          </div>

          {candidate.meetingLink && (
            <div className="card section-spacing">
              <div className="card-header-row">
                <h3 className="card-title">Meeting Link</h3>
              </div>

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

          <div className="card section-spacing">
            <div className="card-header-row">
              <h3 className="card-title">Recruiter Notes</h3>

              {role === "recruiter" && !isEditingRecruiterNotes && (
                <button
                  className="remarks-edit-btn"
                  onClick={() => setIsEditingRecruiterNotes(true)}
                >
                  <FiEdit2 />
                  <span>Edit</span>
                </button>
              )}
            </div>

            <div className="candidate-notes-box">
              {role === "recruiter" && isEditingRecruiterNotes ? (
                <div className="remarks-editor">
                  <textarea
                    rows="5"
                    value={recruiterNotesDraft}
                    onChange={(e) => setRecruiterNotesDraft(e.target.value)}
                    placeholder="Add recruiter notes"
                  />
                  <div className="remarks-editor-actions">
                    <button
                      className="secondary-btn"
                      onClick={() => {
                        setIsEditingRecruiterNotes(false);
                        setRecruiterNotesDraft(candidate.notes || "");
                      }}
                    >
                      Cancel
                    </button>
                    <button className="primary-btn" onClick={handleSaveRecruiterNotes}>
                      Save Notes
                    </button>
                  </div>
                </div>
              ) : candidate.notes ? (
                <p>{candidate.notes}</p>
              ) : (
                <p className="muted-text">No recruiter notes added yet.</p>
              )}
            </div>
          </div>

          <div className="card section-spacing">
            <div className="card-header-row">
              <h3 className="card-title">Interviewer Remarks</h3>

              {role === "interviewer" && !isEditingRemarks && (
                <button
                  className="remarks-edit-btn"
                  onClick={() => setIsEditingRemarks(true)}
                >
                  <FiEdit2 />
                  <span>Edit</span>
                </button>
              )}
            </div>

            <div className="candidate-notes-box">
              {role === "interviewer" && isEditingRemarks ? (
                <div className="remarks-editor">
                  <textarea
                    rows="5"
                    value={remarksDraft}
                    onChange={(e) => setRemarksDraft(e.target.value)}
                    placeholder="Add interview feedback"
                  />
                  <div className="remarks-editor-actions">
                    <button
                      className="secondary-btn"
                      onClick={() => {
                        setIsEditingRemarks(false);
                        setRemarksDraft(candidate.interviewerRemarks || "");
                      }}
                    >
                      Cancel
                    </button>
                    <button className="primary-btn" onClick={handleSaveRemarks}>
                      Save Remarks
                    </button>
                  </div>
                </div>
              ) : candidate.interviewerRemarks ? (
                <p>{candidate.interviewerRemarks}</p>
              ) : (
                <p className="muted-text">No interviewer remarks added yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="candidate-details-right">
          <CandidateTimeline candidate={candidate} />
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;