import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import CandidateFilters from "../components/candidates/CandidateFilters";
import CandidateTable from "../components/candidates/CandidateTable";
import {
  deleteCandidateFromStorage,
  getCandidatesFromStorage,
} from "../utils/candidateStorage";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const storedCandidates = getCandidatesFromStorage();
    setCandidates(storedCandidates);
  }, []);

  const roleOptions = useMemo(() => {
    return [...new Set(candidates.map((candidate) => candidate.role))];
  }, [candidates]);

  const filteredCandidates = useMemo(() => {
    let updatedCandidates = [...candidates];

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      updatedCandidates = updatedCandidates.filter((candidate) => {
        return (
          candidate.name.toLowerCase().includes(lowerSearch) ||
          candidate.role.toLowerCase().includes(lowerSearch) ||
          candidate.email.toLowerCase().includes(lowerSearch)
        );
      });
    }

    if (statusFilter !== "All") {
      updatedCandidates = updatedCandidates.filter(
        (candidate) => candidate.status === statusFilter
      );
    }

    if (roleFilter !== "All") {
      updatedCandidates = updatedCandidates.filter(
        (candidate) => candidate.role === roleFilter
      );
    }

    if (sortBy === "latest") {
      updatedCandidates.sort(
        (a, b) =>
          new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
      );
    } else if (sortBy === "scoreHigh") {
      updatedCandidates.sort((a, b) => b.score - a.score);
    } else if (sortBy === "nameAsc") {
      updatedCandidates.sort((a, b) => a.name.localeCompare(b.name));
    }

    return updatedCandidates;
  }, [candidates, searchTerm, statusFilter, roleFilter, sortBy]);

  const handleDeleteCandidate = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this candidate?"
    );

    if (!confirmed) return;

    const updatedCandidates = deleteCandidateFromStorage(id);
    setCandidates(updatedCandidates);
  };

  return (
    <div>
      <PageHeader
        title="Candidates"
        subtitle="Manage candidate profiles, track hiring stages, and review application details in one place."
        action={
          <Link to="/candidates/add" className="primary-btn">
            + Add Candidate
          </Link>
        }
      />

      <CandidateFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        roleOptions={roleOptions}
      />

      <div className="section-spacing">
        <CandidateTable
          candidates={filteredCandidates}
          onDelete={handleDeleteCandidate}
        />
      </div>
    </div>
  );
};

export default Candidates;