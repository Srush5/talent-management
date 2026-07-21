import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import CandidateForm from "../components/candidates/CandidateForm";
import { addCandidateToStorage } from "../utils/candidateStorage";
import BackButton from "../components/common/BackButton";

const AddCandidate = () => {
  const navigate = useNavigate();

  const handleAddCandidate = (formData) => {
    const newCandidate = {
      ...formData,
      id: Date.now(),
      appliedDate: new Date().toISOString().split("T")[0],
    };

    addCandidateToStorage(newCandidate);
    navigate("/candidates");
  };

  return (
    <div>
      <PageHeader
        title="Add Candidate"
        subtitle="Create a new candidate profile and add them to the hiring pipeline."
      />

      <BackButton label="Back" />

      <CandidateForm
        onSubmit={handleAddCandidate}
        submitButtonText="Add Candidate"
        formTitle="Candidate Information"
        formSubtitle="Fill in the candidate details, role, skills, interview schedule, and notes."
      />
    </div>
  );
};

export default AddCandidate;