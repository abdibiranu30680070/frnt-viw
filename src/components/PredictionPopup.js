import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/predictionPopup.css";

const PredictionPopup = ({ prediction, percentage, onClose, recommendation, riskLevel }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  const handlePopupClose = useCallback(() => {
    onClose();
    navigate("/home");
  }, [onClose, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      handlePopupClose();
    }
  }, [countdown, handlePopupClose]);

  return (
    <div className="popup-container d-flex justify-content-center align-items-center">
      <div className="popup-content p-4 bg-white rounded shadow-lg w-75 w-md-50 w-lg-40">
        <div className="countdown-timer text-center mb-3">
          <span className="display-4">{countdown}</span>
        </div>

        <div className="prediction-header text-center mb-4">
          <span className="prediction-result display-6 text-primary">
            {prediction ? "Diabetic" : "Non Diabetic"}
          </span>
          <div className={`risk-level mt-2 p-2 rounded text-white risk-${riskLevel?.toLowerCase()}`}>
            {riskLevel} Risk
          </div>
        </div>

        <div className="prediction-circle d-flex justify-content-center mb-4">
          <div className="percentage-circle text-center p-4 rounded-circle border">
            <span className="fs-2">{(percentage ?? 0).toFixed(2)}%</span>
          </div>
        </div>

        {recommendation && (
          <div className="recommendation-section text-center mb-3">
            <h4>Recommendations:</h4>
            <p>{recommendation}</p>
          </div>
        )}

        <div className="text-center">
          <button className="btn btn-danger" onClick={handlePopupClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PredictionPopup;