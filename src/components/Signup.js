import React, { useState, useEffect } from "react";
import { signup } from "../api/api";
import { useNavigate } from "react-router-dom";
import ".././component/UI/pages/log.css";
import IsLoading from "../component/UI/Navbar/IsLoading";
import Navbar from "../component/UI/Navbar/navbar";
import Footer from "../component/UI/Navbar/footer";

const Signup = () => {
   const [isLoading, setIsLoading] = useState(true);
     useEffect(() => {
       // Simulate loading delay
       const timer = setTimeout(() => {
         setIsLoading(false);
       }, 1000);
       return () => clearTimeout(timer);
     }, []);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role is "user"
  });


  const [errorMessage, setErrorMessage] = useState("");

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await signup(formData);
      console.log("Signup Successful:", response);
      navigate("/login"); // Redirect to login page after signup
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Signup Error:", error.message);
    }
  };

  return (
     <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <Navbar />
    <div className="container d-flex log min-vh-100">
      
     
       <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
         <h2 className=" sign mb-4">Sign up</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} method="post">
        
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
          <span></span>
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
                  />
                </div>
        

        <input type="submit" className="btn btn-primary w-100 mb-3" value="Signup" />

        <div className="signup_link"> 
          I have an account <a href="/login">Login</a>
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


export default Signup;
