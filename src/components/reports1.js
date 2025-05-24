import React, { useState } from "react";
import { downloadCSVReport, downloadExcelReport } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/reports.css";
import '../styles/adminanalytcs.css';

const Reports1 = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    prediction: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDownload = async (downloadFunction) => {
    try {
      await downloadFunction(filters.dateFrom, filters.dateTo, filters.prediction);
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <div className="container-fluid">
      <div className="row">
      
        {/* Main Content */}
        <div >
        <div className="analytics-container">
          <h2 className="mb-4 text-center text-primary fw-bold">Download Reports</h2>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label">From Date</label>
              <input
                type="date"
                name="dateFrom"
                className="form-control"
                value={filters.dateFrom}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">To Date</label>
              <input
                type="date"
                name="dateTo"
                className="form-control"
                value={filters.dateTo}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Prediction</label>
              <select
                name="prediction"
                className="form-select"
                value={filters.prediction}
                onChange={handleFilterChange}
              >
                <option value="">All Predictions</option>
                <option value="diabetic">Diabetic</option>
                <option value="non-diabetic">Non-Diabetic</option>
              </select>
            </div>
          </div>

          <div className="d-flex gap-3">
            <button className="btn btn-success" onClick={() => handleDownload(downloadCSVReport)}>
              Download CSV
            </button>
            <button className="btn btn-primary" onClick={() => handleDownload(downloadExcelReport)}>
              Download Excel
            </button>
          </div>
        </div>
      </div></div>
    </div>
  );
};

export default Reports1;
