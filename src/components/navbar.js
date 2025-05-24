import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

const Navbar = () => {
  const navigate = useNavigate(); // ✅ Fix: initialize navigate

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Redirect to login/home page
  };

  return (
    <nav className="admin-sidebar bg-dark text-white p-3 shadow-sm min-vh-100">
      <h2 className="mb-4">Admin Panel</h2>
      <div className="d-flex flex-column gap-2">
        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/admin/dashboard1")}
        >
          Dashboard
        </button>
        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/admin/users")}
        >
          Manage Users
        </button>
        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/admin/analytics")}
        >
          System Analytics
        </button>
        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/admin/getAllPatientsForAdmin")}
        >
          View All Patients
        </button>
        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/admin/reports")}
        >
          Download Reports
        </button>
 <button
          className="btn btn-outline-light"
          onClick={() => navigate("/admin/FeedbackDashboard1")}
        >
         Feedback
        </button>

        <button className="btn btn-danger mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
