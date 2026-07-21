import React from "react";

const CandidateFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
  roleOptions,
}) => {
  return (
  <div className="candidate-filters card">

    <div className="filter-item filter-search">
      <label>Search</label>
      <input
        type="text"
        placeholder="Search by name, role or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    <div className="filter-item">
      <label>Status</label>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="Screening">Screening</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>

    <div className="filter-item">
      <label>Role</label>
      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="All">All Roles</option>

        {roleOptions.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>

    <div className="filter-item">
      <label>Sort By</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="latest">Latest Applied</option>
        <option value="scoreHigh">Highest Score</option>
        <option value="nameAsc">Candidate Name (A-Z)</option>
      </select>
    </div>

  </div>
);
};

export default CandidateFilters;