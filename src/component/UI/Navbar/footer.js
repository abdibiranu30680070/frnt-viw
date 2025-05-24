import React, { useState } from 'react';
import './header.css';
import { sendFeedback } from '../../../api/api'; 

const Footer = () => {
  const [feedback, setFeedback] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    if (!token) {
      setStatusMessage('Please log in first to send feedback.');
      return;
    }
  
    if (!feedback.trim()) {
      setStatusMessage('Please enter your feedback.');
      return;
    }
  
    try {
      await sendFeedback(feedback);
      setStatusMessage('Thank you for your feedback!');
      setFeedback('');
    } catch (error) {
      console.error('Error sending feedback:', error);
      setStatusMessage(error.message);
    }
  };
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Overview */}
          <div className="col-md-4 mb-4">
            <h5 className="fst-italic text-center">Overview</h5>
            <p>
              This project is a Diabetes Prediction Platform designed to raise awareness and support users in managing diabetes.
              The platform allows users to access health tips, research, and success stories to stay informed and inspired.
            </p>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4 text-center">
            <h5 className="fst-italic">Contact</h5>
            <p><i className="bi bi-geo-alt text-start"></i> Jigjiga, Ethiopia</p>
            <p>
              <a href="tel:+251972727963">
                <i className="bi bi-telephone text-start"></i> +251972727963
              </a>
            </p>
            <p>
              <a href="mailto:siiqo@gmail.com">
                <i className="bi bi-envelope text-start"></i> siiqo@gmail.com
              </a>
            </p>
          </div>

          {/* Feedback Form */}
          <div className="col-md-4 mb-4 feedback-form">
      <h5 className="fst-italic text-center">Feedback</h5>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control mb-2"
          rows="3"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        <button type="submit" className="btn btn-primary btn-sm px-3 py-1">
          Submit Feedback
        </button>
        {statusMessage && (
          <p className="mt-2 small text-muted status-message">{statusMessage}</p>
        )}
      </form>
    </div>
        </div>

        <hr className="border-light" />

        {/* Bottom Row */}
        <div id="made" className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">
              Copyright 2025 All Rights Reserved. Made by{' '}
              <a href="https://www.meti-aga.com" target="_blank" rel="noopener noreferrer">siiqo-group</a>
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end socials-icons">
            <a href="https://web.facebook.com/profile.php?id=61551597590852" title="Facebook" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://www.twitter.com" title="Twitter" aria-label="Twitter">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" title="LinkedIn" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
