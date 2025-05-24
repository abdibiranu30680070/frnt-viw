import React, { useState, useEffect } from 'react';
import { fetchAuditLogs } from '../api/api';
import '../styles/admin.css';

const AuditLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchAuditLogs();
        setLogs(data);
      } finally {
        setLoading(false);
      }
    };
    loadLogs();
  }, []);

  return (
    <div className="audit-container">
      <h2>Audit Log</h2>
      
      {loading ? (
        <div>Loading logs...</div>
      ) : (
        <div className="log-list">
          {logs.map(log => (
            <div key={log.id} className="log-item">
              <div className="log-header">
                <span className="timestamp">{new Date(log.timestamp).toLocaleString()}</span>
                <span className={`action-type ${log.actionType.toLowerCase()}`}>
                  {log.actionType}
                </span>
              </div>
              <div className="log-details">
                {log.details}
              </div>
              <div className="log-user">
                Performed by: {log.performedBy} ({log.userRole})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuditLog;