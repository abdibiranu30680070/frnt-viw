import React, { useState, useEffect } from "react";
import { login } from "../api/api";
import ".././component/UI/pages/log.css";
import IsLoading from "../component/UI/Navbar/IsLoading";
import Navbar from "../component/UI/Navbar/navbar";
import Footer from "../component/UI/Navbar/footer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await login(formData);

      if (!response.token) {
        setError("Invalid credentials. Please try again.");
        return;
      }

      localStorage.setItem("token", response.token);

      const decodedToken = JSON.parse(atob(response.token.split(".")[1]));
      localStorage.setItem("role", decodedToken.role);

      if (decodedToken.role === "admin") {
        navigate("/AdminDashboards");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      setError("An error occurred during login. Please try again later.");
    }
  };

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <Navbar />
          <div className="container d-flex log justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
              <h2 className="text-center mb-4">Login</h2>

              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
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
                  />
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <a href="/forgot-password" className="text-decoration-none">
                    Forgot Password?
                  </a>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Login
                </button>

                <div className="text-center">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-decoration-none">
                    Signup
                  </a>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Login;
