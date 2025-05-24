import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/patientCard.css"; // Import the CSS file for patient card styles

const PatientCard = ({ patientData }) => {
  const navigate = useNavigate();

  // Function to navigate to patient details page
  const handleViewDetails = () => {
    navigate(`/patient/${patientData.Id}`); // Navigate to patient details page
  };

  return (
    <div className="patient-card-full" >
      <h3 className="patient-name">{patientData.name}</h3>
      <div className="patient-details">
        <div className="detail-item">
          <span>Age:</span> {patientData.Age}
        </div>
        <div className="detail-item">
          <span>BMI:</span> {patientData.BMI}
        </div>
        <div className="detail-item">
          <span>Insulin:</span> {patientData.Insulin}
        </div>
        <div className="detail-item">
          <span>Blood Pressure:</span> {patientData.BloodPressure}
        </div>
        <div className="detail-item">
          <span>Prediction:</span> {patientData.prediction ? "Diabetic" : "Non-Diabetic"}
        </div>
        <div className="detail-item">
          <span>Prediction Percentage:</span> {patientData.precentage}%
        </div>
      </div>

      {/* View Details button */}
      <button className="details-button" onClick={handleViewDetails}>
        View Details
      </button>
    </div>
  );
};

export default PatientCard;
