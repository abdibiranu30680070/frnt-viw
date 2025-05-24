import React, { useState, useEffect } from "react";
import { getAllFeedback } from "../api/api"; 
import "../styles/feedback.css";
const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  const fetchAllFeedback = async () => {
    try {
      const response = await getAllFeedback();
      setFeedbacks(response); // Changed from response.data to just response
    } catch (error) {
      setError("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading feedback...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="analytics-container-a">
            <h2 className="mb-4 text-primary fw-bold text-center">User Feedback</h2>
            {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
              <div className="row g-3">
                {feedbacks.map((feedback) => (
                  <div key={feedback.id} className="col-md-6 col-lg-4 text-primary">
                    <div className="card feedback-card shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title">
                          {feedback.user?.name || "Anonymous"}
                        </h5>
                        <p className="card-text">{feedback.message}</p>
                        <small>
                          {feedback.createdAt 
                            ? new Date(feedback.createdAt).toLocaleString() 
                            : "No date"}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No feedback available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDashboard;