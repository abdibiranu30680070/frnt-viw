import React, { useState, useEffect, useRef } from "react";
import './testimonial-slider.css';

const testimonials = [
  {
    text: "Diabetes affects how the body processes blood sugar. Managing it early prevents serious health issues.",
    name: "Step 1",
    role: "Understanding the Condition",
    bgColor: "#000",
  },
  {
    text: "A healthy diet, regular exercise, and medication help control blood sugar levels effectively.",
    name: "Step 2",
    role: "Management and Lifestyle",
    bgColor: "#1a1a1a",
  },
  {
    text: "Regular check-ups and monitoring are key to living a healthy life with diabetes.",
    name: "Step 3",
    role: "Ongoing Care and Support",
    bgColor: "#333",
  }
];

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [animationState, setAnimationState] = useState("entering");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setAnimationState("leaving");
      timeoutRef.current = setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setAnimationState("entering");
      }, 500);
    }, 4000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovered]);

  return (
    <div className="testimonial-container">
      {/* Left Side: Static Text & Progress Bar */}
      <div className="testimonial-info1">
      <h2>Understanding Diabetes in 3 Steps</h2>
<p>
  Diabetes is a chronic condition that affects millions worldwide. By breaking it down into simple steps, we help you better understand, manage, and live well with it—empowering you to take control of your health.
</p>
        <div className="progress-bar" role="progressbar" aria-label="Testimonial progress">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <div key={index} className="progress-bar-wrapper">
                <span
                  className={`progress-bar-label ${index === activeIndex ? "active" : ""}`}
                  aria-current={index === activeIndex ? "true" : "false"}
                >
                  {testimonial.name}
                </span>
                <span
                  className={`progress-bar-item ${index === activeIndex ? "active" : ""}`}
                  aria-current={index === activeIndex ? "true" : "false"}
                >
                  <span
                    className="progress-fill"
                    style={{ animationPlayState: isHovered ? "paused" : "running" }}
                  />
                </span>
              </div>
            ))
          ) : (
            <p>No testimonials available</p>
          )}
        </div>
      </div>

      {/* Right Side: Testimonial Card */}
      <div
        className="testimonial-slider"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`testimonial-card ${animationState}`}
          style={{ backgroundColor: testimonials[activeIndex].bgColor }}
          key={activeIndex}
        >
          <p className="author">
            <strong>{testimonials[activeIndex].name}</strong>
            <br />            <br />
            {testimonials[activeIndex].role}
          </p>

          <p className="quote">"{testimonials[activeIndex].text}"</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;