import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import Pages and Components
import IsLoading from "../component/UI/Navbar/IsLoading";
import Footer from "../component/UI/Navbar/footer";
import ScrollProgressBar from "../component/UI/Navbar/ScrollProgressBar";
import ScrollToTopButton from "../component/UI/Navbar/ScrollToTopButton";
import ScrollIndicator from "../component/UI/Navbar/ScrollIndicator";
import ImageMarquee from "../component/UI/pages/imageanimate/ImageMarquee";
import Animate from "../component/UI/pages/Diabetes/animate";

// Import Images
import headerBackground from "../component/UI/pages/images/pexels-artempodrez-6823568.jpg";
import doctor1 from "../component/UI/pages/images/doctor1.jpg";
import doctor2 from "../component/UI/pages/images/doctor2.jpg";
import doctor3 from "../component/UI/pages/images/doctor3.jpg";

// Import API and Patient Card
import { getAllPatients } from "../api/api";
import PatientCard from "./PatientCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/history.css";

// Import Styles
import "../styles/home.css";
import LogNavbar from "./lognavbar";

// ViewAllPatients Component
const ViewAllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true); // Adding isVisible state to handle fade-in

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
    <section className={`welcome-section ${isVisible ? "fade-in" : ""}`}>
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
    </section>
  );
};

// Main Component
const ViewHistoryfull = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (userRole === "admin") {
      navigate("/admin/dashboard");
    }
  }, [navigate, userRole]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <ScrollProgressBar />
          <header className="header" style={{ backgroundImage: `url(${headerBackground})` }}>
            <ScrollIndicator />
            <LogNavbar />
            <ViewAllPatients />
          </header>

          <section className="marquee-section">
            <ImageMarquee />
          </section>

          <section className="marquee">
            <Animate />
          </section>

          <div className="testimonials">
            <h1>What Our Patients Are Saying</h1>
            <p>We’re proud to share feedback from patients who have experienced our commitment to personalized and compassionate healthcare.</p>
            <div className="testimonial-container">
              <div className="testimonial">
                <img src={doctor1} alt="Dr. Warren" className="doctor-photo" />
                <h2>“A Truly Supportive Team”</h2>
                <p>From my first consultation, I felt like I was in great hands...</p>
                <p><strong>Sarah M.</strong> <em>May 10, 2024</em></p>
              </div>
              <div className="testimonial">
                <img src={doctor2} alt="Dr. Reed" className="doctor-photo" />
                <h2>“Life-Changing Health Advice”</h2>
                <p>Dr. Reed helped me understand my health in ways no one ever has...</p>
                <p><strong>Thomas J.</strong> <em>August 22, 2024</em></p>
              </div>
              <div className="testimonial">
                <img src={doctor3} alt="Dr. Chen" className="doctor-photo" />
                <h2>“Personalized Care”</h2>
                <p>The staff here goes above and beyond...</p>
                <p><strong>Emily R.</strong> <em>September 15, 2024</em></p>
              </div>
            </div>
          </div>

          <Footer />
          <ScrollToTopButton />
        </>
      )}
    </>
  );
};

export default ViewHistoryfull;
