import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import CandidateForm from "../components/candidates/CandidateForm";
import BackButton from "../components/common/BackButton";
import {
  getCandidateById,
  updateCandidateInStorage,
} from "../utils/candidateStorage";

const EditCandidate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const candidate = useMemo(() => getCandidateById(id), [id]);

  const handleUpdateCandidate = (formData) => {
    if (!candidate) return;

    const updatedCandidate = {
      ...candidate,
      ...formData,
    };

    updateCandidateInStorage(updatedCandidate);
    navigate("/candidates");
  };

  if (!candidate) {
    return (
      <div className="placeholder-card">
        <h3>Candidate not found</h3>
        <p>The candidate you are trying to edit does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Edit Candidate"
        subtitle="Update candidate details, interview schedule, status, and notes."
      />

      <BackButton label="Back" />

      <div className="section-spacing">
        <CandidateForm
          initialValues={candidate}
          onSubmit={handleUpdateCandidate}
          submitButtonText="Update Candidate"
          formTitle="Edit Candidate Information"
          formSubtitle="Modify candidate details and keep the hiring workflow up to date."
        />
      </div>
    </div>
  );
};

export default EditCandidate;