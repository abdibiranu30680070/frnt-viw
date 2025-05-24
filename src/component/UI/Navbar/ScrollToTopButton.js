import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "50px",
        height: "50px",
        backgroundColor: "#ffc107",
        color: "white",
        fontSize: "24px",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        display: isVisible ? "block" : "none",
        transition: "all 0.3s ease",
      }}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
