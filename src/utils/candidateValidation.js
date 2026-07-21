export const validateCandidate = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Candidate name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = "Phone number must be 10 digits";
  }

  if (!values.role.trim()) {
    errors.role = "Role is required";
  }

  if (!values.location.trim()) {
    errors.location = "Location is required";
  }

  if (!values.experience.trim()) {
    errors.experience = "Experience is required";
  }

  if (!values.expectedSalary.trim()) {
    errors.expectedSalary = "Expected salary is required";
  }

  if (!values.interviewDate.trim()) {
    errors.interviewDate = "Interview date is required";
  }

  if (!values.status.trim()) {
    errors.status = "Status is required";
  }

  if (!values.skills.trim()) {
    errors.skills = "At least one skill is required";
  }

  return errors;
};