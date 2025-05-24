import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import "./Testimonials.css";

// Import Images
import headerBackground from "./images/pexels-artempodrez-6823568.jpg";
import doctor1 from "./images/doctor1.jpg";
import doctor2 from "./images/doctor2.jpg";
import doctor3 from "./images/doctor3.jpg";

// Import Components
import IsLoading from "../Navbar/IsLoading";
import Navbar from "../Navbar/navbar"; // Adjusted import path to match provided Navbar
import Footer from "../Navbar/footer"; // Consistent casing
import ScrollProgressBar from "../Navbar/ScrollProgressBar";
import ScrollToTopButton from "../Navbar/ScrollToTopButton";
import ScrollIndicator from "../Navbar/ScrollIndicator"; // Assuming this is correct
import ImageMarquee from "../pages/imageanimate/ImageMarquee";
import Animate from "../pages/Diabetes/animate";




// Welcome Section as a separate component
const WelcomeSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

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
          <button
            className="cta-button"
            onClick={() => navigate("/get-started")}
          >
            Get Started
          </button>
          <button
            className="btn-sign-up"
            onClick={() => navigate("/get-started")} // Adjust to /signup if needed
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <ScrollProgressBar />
          <header className="header" style={{ backgroundImage: `url(${headerBackground})` }}>
            <ScrollIndicator />
            <Navbar />
            <WelcomeSection />
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
                <p>
                  From my first consultation, I felt like I was in great hands. Dr. Warren and the entire team truly listen and make you feel like you’re their priority. I couldn’t be happier with the care received here!
                </p>
                <p><strong>Sarah M.</strong> <em>May 10, 2024</em></p>
              </div>
              <div className="testimonial">
                <img src={doctor2} alt="Dr. Reed" className="doctor-photo" />
                <h2>“Life-Changing Health Advice”</h2>
                <p>
                  Dr. Reed helped me understand my health in ways no one ever has. His insights and practical advice have made a big difference in my well-being. I’m so grateful to have found this clinic!
                </p>
                <p><strong>Thomas J.</strong> <em>August 22, 2024</em></p>
              </div>
              <div className="testimonial">
                <img src={doctor3} alt="Dr. Chen" className="doctor-photo" />
                <h2>“Personalized Care”</h2>
                <p>
                  The staff here goes above and beyond. Each appointment feels like a collaborative discussion, and Dr. Chen has been a fantastic resource for managing my heart health. Highly recommend!
                </p>
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

export default Testimonials;