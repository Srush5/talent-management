import React, { useState } from "react";
import { validateCandidate } from "../../utils/candidateValidation";

const defaultFormValues = {
  name: "",
  email: "",
  phone: "",
  role: "",
  location: "",
  experience: "",
  skills: "",
  expectedSalary: "",
  interviewDate: "",
  score: "",
  notes: "",
  meetingLink: "",
};

const CandidateForm = ({
  initialValues = defaultFormValues,
  onSubmit,
  submitButtonText = "Save Candidate",
  formTitle,
  formSubtitle,
}) => {
  const [formValues, setFormValues] = useState({
    ...defaultFormValues,
    ...initialValues,
    skills: Array.isArray(initialValues.skills)
      ? initialValues.skills.join(", ")
      : initialValues.skills || "",
    score:
      initialValues.score !== undefined && initialValues.score !== null
        ? initialValues.score
        : "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateCandidate(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...formValues,
      score: formValues.score ? Number(formValues.score) : 0,
      skills: formValues.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    onSubmit(payload);
  };

  return (
    <div className="candidate-form-wrapper">
      <div className="page-form-header">
        <h3>{formTitle}</h3>
        <p>{formSubtitle}</p>
      </div>

      <form className="candidate-form card" onSubmit={handleSubmit}>
        <div className="candidate-form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter candidate full name"
              value={formValues.name}
              onChange={handleChange}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formValues.email}
              onChange={handleChange}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter 10-digit phone number"
              value={formValues.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Role Applied</label>
            <input
              type="text"
              name="role"
              placeholder="e.g. Frontend Developer"
              value={formValues.role}
              onChange={handleChange}
            />
            {errors.role && <span className="field-error">{errors.role}</span>}
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Pune"
              value={formValues.location}
              onChange={handleChange}
            />
            {errors.location && (
              <span className="field-error">{errors.location}</span>
            )}
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              placeholder="e.g. Fresher / 1 Year"
              value={formValues.experience}
              onChange={handleChange}
            />
            {errors.experience && (
              <span className="field-error">{errors.experience}</span>
            )}
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              placeholder="React, JavaScript, CSS"
              value={formValues.skills}
              onChange={handleChange}
            />
            {errors.skills && <span className="field-error">{errors.skills}</span>}
          </div>

          <div className="form-group">
            <label>Expected Salary</label>
            <input
              type="text"
              name="expectedSalary"
              placeholder="e.g. 5 LPA"
              value={formValues.expectedSalary}
              onChange={handleChange}
            />
            {errors.expectedSalary && (
              <span className="field-error">{errors.expectedSalary}</span>
            )}
          </div>

          <div className="form-group">
            <label>Interview Date</label>
            <input
              type="date"
              name="interviewDate"
              value={formValues.interviewDate}
              onChange={handleChange}
            />
            {errors.interviewDate && (
              <span className="field-error">{errors.interviewDate}</span>
            )}
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formValues.status}
              onChange={handleChange}
            >
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            </select>
            {errors.status && <span className="field-error">{errors.status}</span>}
          </div>

          <div className="form-group">
            <label>Candidate Score</label>
            <input
              type="number"
              name="score"
              placeholder="e.g. 82"
              value={formValues.score}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Meeting Link</label>
            <input
              type="text"
              name="meetingLink"
              placeholder="Paste interview meeting link"
              value={formValues.meetingLink}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Recruiter Notes</label>
            <textarea
              name="notes"
              rows="5"
              placeholder="Add observations, interview feedback, strengths, or concerns"
              value={formValues.notes}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="candidate-form-actions">
          <button type="submit" className="primary-btn">
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandidateForm;