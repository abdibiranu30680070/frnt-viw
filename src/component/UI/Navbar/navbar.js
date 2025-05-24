import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active link styling
import "./header.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [hideToggler, setHideToggler] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navbar toggle animation
  const handleToggle = () => {
    setIsToggled((prev) => !prev);
    setHideToggler(true);
    setTimeout(() => setHideToggler(false), 500);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${isScrolled ? "scrolled" : ""}`} id="navbar">
    <div className="container">
      <div className="logo"> 
          <NavLink
             className="logo"
                  to="/"
                  end // Ensures exact match for Home
                  onClick={handleToggle} // Close menu on click for mobile
                >
            SiiqoPredict
                </NavLink></div>

      <button
        className={`navbar-toggler custom-toggler ${hideToggler ? "hide-toggler" : ""}`}
        type="button"
        onClick={handleToggle}
        aria-expanded={isToggled}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`navbar-collapse-wrapper ${isToggled ? "show navbar-open" : "navbar-close"}`}
        id="navbarNav"
      >
        
        <div className="navbar-collapse-content">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  end // Ensures exact match for Home
                  onClick={handleToggle} // Close menu on click for mobile
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/how-it-works"
                  onClick={handleToggle}
                >
                  How It Works
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/health-wellness"
                  onClick={handleToggle}
                >
                  Health & Wellness Blog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/contact"
                  onClick={handleToggle}
                >
                  Contact Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link cta-button"
                  to="/Login"
                  onClick={handleToggle}
                >
                  Get Started
                </NavLink>
              </li>
            </ul>
          </div>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;