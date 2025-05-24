import React, { useState, useEffect } from "react";
import "./contact.css";
import IsLoading from "../Navbar/IsLoading";
import Footer from "../Navbar/footer";
import ScrollProgressBar from "../Navbar/ScrollProgressBar";
import ScrollToTopButton from "../Navbar/ScrollToTopButton";
import ScrollIndicator from "../Navbar/ScrollIndicator";
import Navbar from "../Navbar/navbar";
import Team from "./team";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading with cleanup
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="contact-page">
          <ScrollProgressBar />
          <ScrollIndicator />
          <Navbar />
          <br></br>
          <section
            id="mre"
            className="project-more-detail"
            aria-labelledby="project-heading" // Accessibility improvement
          >
            <h2 id="project-heading">Why This Project Matters</h2>
            <p>
              Diabetes is a chronic condition affecting millions worldwide, and its silent progression often goes unnoticed
              until severe symptoms appear. By leveraging modern AI tools, our project helps users assess risk factors
              early—using medical data such as glucose levels, BMI, age, and more.
            </p>
            <p>
              The website features a clean and interactive interface where users can enter basic health indicators and
              instantly get a prediction powered by a trained machine learning model. Our aim is to raise awareness,
              encourage regular health checkups, and ultimately support healthier living through tech-driven solutions.
            </p>
            <p>
              We believe in the power of data to prevent disease rather than just treat it. This project reflects our
              dedication to innovation, accessibility, and community health.
            </p>
          
          </section>
          <Team />
          <Footer />
          <ScrollToTopButton />
        </div>
      )}
    </>
  );
};

export default Contact;