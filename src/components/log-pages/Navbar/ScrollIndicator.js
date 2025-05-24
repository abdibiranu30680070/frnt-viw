import React, { useEffect, useState } from "react";
import "./scroll.css"; // Ensure the correct CSS file is used

const ScrollIndicator = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / windowHeight) * 100;
      setScrollWidth(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-indicator-container">
      <div className="scroll-indicator" style={{ width: `${scrollWidth}%` }}></div>
    </div>
  );
};

export default ScrollIndicator;
