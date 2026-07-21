import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/authStorage";

const Login = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    role: "recruiter",
  });

  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    return hasUppercase && hasNumber && hasSpecialChar;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues.email.trim() || !formValues.password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    if (!validatePassword(formValues.password)) {
      setError(
        "Password must include at least 1 uppercase letter, 1 number, and 1 special character."
      );
      return;
    }

    loginUser({
      email: formValues.email.trim(),
      role: formValues.role,
    });

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card login-card-compact">
        <div className="login-left-panel compact-login-left">
          <div className="login-brand-badge">TM</div>
          <h1>Talent Management</h1>
          <p>Manage candidate profiles, interview schedules and hiring progress.</p>
        </div>

        <div className="login-form-panel">
          <div className="login-form-header">
            <h2>Login</h2>
            <p>Choose your role and continue.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your work email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Login As</label>
              <select
                name="role"
                value={formValues.role}
                onChange={handleChange}
              >
                <option value="recruiter">Recruiter / HR</option>
                <option value="interviewer">Interviewer</option>
              </select>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="primary-btn login-submit-btn">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;