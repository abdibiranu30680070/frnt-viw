import React, { useState, useEffect } from "react";
import { signup } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "../component/UI/pages/log.css";
import IsLoading from "../component/UI/Navbar/IsLoading";
import Navbar from "../component/UI/Navbar/navbar";
import Footer from "../component/UI/Navbar/footer";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errorMessage) setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Email is required");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email");
      return false;
    }
    if (!formData.password) {
      setErrorMessage("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await signup(formData);
      console.log("Signup successful:", response);
      navigate("/Login", { state: { signupSuccess: true } });
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage(
        error.message || "Signup failed. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <IsLoading />;

  return (
    <>
      <Navbar />
      <div className="container d-flex log min-vh-100">
        <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="sign mb-4">Sign up</h2>
          
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength="6"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 mb-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing up...
                </>
              ) : "Sign up"}
            </button>

            <div className="text-center">
              Already have an account?{" "}
              <Link to="/Login" className="text-decoration-none">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
