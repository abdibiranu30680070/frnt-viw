import React, { useState, useEffect } from "react"; // Added useEffect
import "./how.css";
import headerBackground from "./images/pexels-n-voitkevich-6942015.jpg";
import IsLoading from "../Navbar/IsLoading";
import Footer from "../Navbar/footer";
import ScrollProgressBar from "../Navbar/ScrollProgressBar";
import ScrollToTopButton from "../Navbar/ScrollToTopButton";
import ScrollIndicator from "../Navbar/ScrollIndicator";
import Navbar from "../Navbar/navbar";

const How = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Moved setTimeout to useEffect to run once
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <ScrollProgressBar />
          <ScrollIndicator />
          <Navbar />
          {/* Introduction Section with Background Image and Animation */}
          <section className="how-section1 intro">
            <div className="header" style={{ backgroundImage: `url(${headerBackground})` }}>
              {/* Background image */}
            </div>
            <div className="intro-content">
              <h1>
                <span className="highlight-text">Predict Your</span> <br />
                <span className="gradient-text">Diabetes Risk</span> Today
              </h1>
              <p>
                Our platform empowers you to proactively manage your health by predicting your risk of diabetes.
                Get personalized insights and take control of the future.
              </p>
            </div>
          </section>

          {/* ------------ Main Content (Story & Right Sidebar) -------------- */}
          <div className="main-container">
            {/* Story Gallery */}
            {/* Step-by-Step Process Section */}
            <section className="how-section fellowship-faqs">
              <div className="container">
                <h2>Step-by-Step Process</h2>
                <div className="faq-list">
                  <details className="faq">
                    <summary>Enter Your Details</summary>
                    <p>Provide basic health details like age,<br/> BMI, and    glucose levels</p>
                  </details>
                  <details className="faq">
                    <summary>AI-Powered Analysis</summary>
                    <p>Our system analyzes your data using<br/> advanced algorithms.</p>
                  </details>
                  <details className="faq">
                    <summary>Get Your Prediction</summary>
                    <p>Receive instant insights on your risk level with <br/>recommendations.</p>
                  </details>
                  {/* <details className="faq">
                    <summary>What activities do you offer?</summary>
                    <p>We offer a variety of activities including Bible studies, prayer<br/> meetings,community service projects, and social events.</p>
                  </details> */}
                </div>
              </div>
            </section>

            {/* Why Trust Us Section */}
            <section className="how-section trust">
              <div className="container">
                <h2>Why Trust SiiqoPredict?</h2>
                <ul>
                  <li>✔ AI-driven accuracy</li>
                  <li>✔ Trusted by healthcare professionals</li>
                  <li>✔ Secure and confidential</li>
                  <li>✔ User-friendly and easy to use</li>
                </ul>
              </div>
            </section>

            {/* SiiqoPredict FAQs Section */}
            <section className="how-section faqs">
              <div className="container">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                  <details className="faq">
                    <summary>Is my data secure?</summary>
                    <p>Yes, we use advanced encryption to keep your <br/>information safe.</p>
                  </details>
                  <details className="faq">
                    <summary>How accurate are the predictions?</summary>
                    <p>Our AI model is trained on medical data for high accuracy.</p>
                  </details>
                  <details className="faq">
                    <summary>Can I use this for free?</summary>
                    <p>Yes, our basic prediction tool is free to use.</p>
                  </details>
                </div>
              </div>
            </section>
          </div>

          <Footer />
          <ScrollToTopButton />
        </>
      )}
    </>
  );
};

export default How;