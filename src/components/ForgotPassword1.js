import React, { useState } from "react";
import Navbar from "../component/UI/Navbar/navbar";
import Footer from "../component/UI/Navbar/footer";
import { requestPasswordReset } from "../api/api";
 // Make sure to define this API call
import "../styles/ForgotPassword.css"; // Link your CSS

const ForgotPassword1 = () => {
  const [formData, setFormData] = useState({ email: "", username: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await requestPasswordReset(formData);
      // API call
      if (response.success) {
        setMessage("✅ Reset instructions have been sent to your email.");
      } else {
        setError("❌ Could not find user. Please check your email or username.");
      }
    } catch (err) {
      setError("⚠️ Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="forgot-container container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow p-4 forgot-card">
          <h3 className="text-center mb-3">Forgot Password</h3>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
          </form>

          <div className="text-center mt-3">
            <a href="/login" className="text-decoration-none">Back to Login</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword1;
