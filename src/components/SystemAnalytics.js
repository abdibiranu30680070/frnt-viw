import React, { useState, useEffect } from 'react';
import { fetchSystemStats } from '../api/api';
import { Tooltip, PieChart, Pie } from 'recharts';
import '../styles/adminanalytcs.css'; // Custom styles
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import "../styles/history.css";

const SystemAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchSystemStats();
        console.log("Fetched stats:", data);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch system stats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) return <div className="text-center p-4">Loading statistics...</div>;
  if (!stats) return <div className="text-danger text-center p-4">Error loading statistics.</div>;

  const roleDistribution = stats.roleDistribution?.map(entry => ({
    role: entry.role,
    count: entry._count?.role || 0,
  })) || [];

  return (
    <div className="container-fluid">

      
      {/* Sidebar Navigation */}
      <div className="row">
      
   <Navbar/>
        
 <div className="col">
          
          <div className="container p-5" >
            <h2 className="mb-4 text-primary fw-bold">System Analytics</h2>

            <div className="row mb-3 m-4 ">
              <div className="col-md-6">
                <div className="stat-card bg-light shadow-sm p-3 rounded text-center">
                  <h5>Total Users</h5>
                  <p className="fs-3 fw-semibold text-success">{stats.totalUsers ?? 0}</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="stat-card bg-light shadow-sm p-3 rounded text-center">
                  <h5>Active Patients</h5>
                  <p className="fs-3 fw-semibold text-info">{stats.activePatients ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="chart bg-white p-4 shadow rounded text-center">
              <h4 className="mb-3 text-secondary">User Roles</h4>
              {roleDistribution.length > 0 ? (
                <PieChart width={500} height={400}>
                  <Pie
                    data={roleDistribution}
                    dataKey="count"
                    nameKey="role"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#0d6efd"
                    label
                  />
                  <Tooltip />
                </PieChart>
              ) : (
                <p className="text-muted">No role data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
