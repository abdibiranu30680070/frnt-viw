import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Pages and Components
import AddPatient from "./AddPatient";
import ViewAllPatients from "./ViewHistory";
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

// Import Styles
import "../styles/home.css";
import LogNavbar from "./lognavbar";

// Welcome Section
const WelcomeSection = ({ onLogout }) => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`welcome-section ${isVisible ? "fade-in" : ""}`}>
      <div className="container">
        <div className="text-content">
          <h1 className="title">Welcome to SiiqoPredict</h1>
          <p className="subtitle">Your Personal Diabetes Prediction Assistant.</p>
          <p className="description">
            We use advanced algorithms to help you predict the likelihood of diabetes and take the necessary steps to prevent it.
          </p>
          <div className="mt-4">
<button
  className="btn btn-primary me-2"
  onClick={() => navigate("/add-patient")}
>
  Add Patient
</button>


  <button
    className="btn btn-outline-secondary me-2"
    onClick={() =>
      setActiveComponent(activeComponent === "viewHistory" ? null : "viewHistory")
    }
  >
    {activeComponent === "viewHistory" ? "Close Browse History" : "Browse History"}
  </button>

  <button className="btn btn-danger" onClick={onLogout}>
    Logout
  </button>
</div>


          {activeComponent === "addPatient" && (
            <AddPatient onClose={() => setActiveComponent(null)} />
          )}
          {activeComponent === "viewHistory" && (
            <ViewAllPatients onClose={() => setActiveComponent(null)} />
          )}
        </div>
      </div>
    </section>
  );
};

// Main Component
const Home = () => {
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
            <LogNavbar/>
            <WelcomeSection onLogout={handleLogout} />
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

export default Home;
