import React, { useState, useEffect } from "react";
import { getAllPatientsForAdmin, deletePatient } from "../api/api";
import PatientCard from "./PatientCard";
import "../styles/history.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
const AdminViewAllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = async () => {
    try {
      const response = await getAllPatientsForAdmin();
      setPatients(response);
    } catch (error) {
      console.error("Failed to fetch patients:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = async (Id) => {
    if (!Id) {
      console.error("Patient ID is undefined!");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      await deletePatient(Id);
      setPatients(patients.filter((patient) => patient.Id !== Id));
    } catch (error) {
      console.error("Failed to delete patient:", error.message);
    }
  };



  return (
    <div className="container-fluid">
      <div className="row " >
        {/* Sidebar */}
        {/* Sidebar */}
       
   <Navbar/>
       

        {/* Main Content */}
        <div className="col  ">
           <div className="analytics-container-a m-5">
          <h2 className="mb-4 text-center text-primary">Admin - View All Patients</h2>
          {loading ? (
            <div className="text-center">Loading patients...</div>
          ) : patients.length > 0 ? (
            <div className="row g-3">
              {patients.map((patient) => (
                <div key={patient.Id} className="col-md-6 col-lg-4">
                  <div className="card patient-card shadow-sm">
                    <div className="card-body">
                      <PatientCard patientData={patient} />
                      <button
                        className="btn btn-sm btn-danger mt-3 w-100"
                        onClick={() => handleDeletePatient(patient.Id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No patients found.</p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminViewAllPatients;
