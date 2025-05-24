import React, { useState, useEffect } from "react";
import { getAllPatients } from "../api/api";
import PatientCard from "./PatientCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/history.css";

const ViewAllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = async () => {
    try {
      setLoading(true);
      const response = await getAllPatients();
      setPatients(response);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch patient history:", error.message);
      setError("Failed to load patients. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4" id="history-container">
      <header className="mb-4 text-center">
        <h2 className="display-5 fw-bold text-primary">All Patients</h2>
        <p className="text-muted">View and manage patient records</p>
      </header>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && patients.length === 0 && (
        <div className="alert alert-info text-center" role="alert">
          No patients found.
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {patients.map((patient) => (
          <div key={patient.id || patient._id} className="col">
            <PatientCard patientData={patient} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllPatients;