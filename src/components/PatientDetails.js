// PatientDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/patientDetails.css";
import { getPatientDetails } from "../api/api"; // Import the API function

const PatientDetails = () => {
  const { patientId } = useParams(); // Get patient ID from URL
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await getPatientDetails(patientId); // Use the imported function
        setPatientData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  if (loading) return <h2>Loading patient details...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!patientData) return <h2>Patient not found</h2>;

  return (
    <div className="patient-details-container">
      <h2>Patient Details</h2>
      <div className="patient-info">
        <p><strong>Name:</strong> {patientData.name}</p>
        <p><strong>Age:</strong> {patientData.Age}</p>
        <p><strong>BMI:</strong> {patientData.BMI}</p>
        <p><strong>Insulin:</strong> {patientData.Insulin}</p>
        <p><strong>Blood Pressure:</strong> {patientData.BloodPressure}</p>
        <p><strong>Glucose Level:</strong> {patientData.Glucose}</p>
        <p><strong>Skin Thickness:</strong> {patientData.SkinThickness}</p>
        <p><strong>Diabetes Pedigree Function:</strong> {patientData.DiabetesPedigreeFunction}</p>
        <p><strong>Pregnancies:</strong> {patientData.pregnancies}</p>
        <p><strong>Prediction:</strong> {patientData.prediction ? "Diabetic" : "Non-Diabetic"}</p>
        <p><strong>Prediction Percentage:</strong> {patientData.precentage}%</p>
        <p><strong>Prediction Date:</strong> {patientData.CreatedAt}%</p>
        <p><strong>riskLevel:</strong> {patientData.riskLevel}%</p>
        <p><strong>recommendation:</strong> {patientData.recommendation}%</p>
      </div>

      {/* Print Button */}
      <button className="print-button" onClick={handlePrint}>
        Print
      </button>
    </div>
  );
};

export default PatientDetails;
