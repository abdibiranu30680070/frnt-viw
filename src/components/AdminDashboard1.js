import React from "react";
import Navbar from "./navbar";
// import Reports from "./Reports";
// import UserManagement from "./UserManagement";
// import AdminViewAllPatients from "./AdminViewAllPatients";
import "../styles/admin.css";
import SystemAnalytics1 from "./ystemAnalytics1";
import PredictionChart1 from "./PredictionChart1";
import Reports1 from "./reports1";
import AdminViewAllPatients1 from "./AdminViewAllPatients1";
import UserManagement1 from "./UserManagement1";
import FeedbackDashboard from "./FeedbackDashboard";
const AdminDashboard1 = () => {


  return (
    <div className="admin-container d-flex">
      <Navbar />
      <main className="admin-content p-4 flex-grow-1">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="dashboard-grid">
          <div className="dashboard-item">
            <SystemAnalytics1/>
          </div>
          <br/> <br/>
          <div className="dashboard-item">
        <PredictionChart1/>
          </div>  <br/> <br/>
          <div className="dashboard-item">
        <Reports1/>
          </div>  <br/> <br/>
          <div className="dashboard-item">
        <UserManagement1/>
          </div>  <br/> <br/>
          <div className="dashboard-item">
         <AdminViewAllPatients1/>
          </div>  <br/> <br/>
          <div className="Feedback-Dashboard-item">
            <FeedbackDashboard/>
          </div>  <br/> <br/>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard1;
