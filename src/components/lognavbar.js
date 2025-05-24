import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../component/UI/Navbar/header.css";
import "./lognavbar.css";
import { FaUserCircle } from "react-icons/fa";
import { fetchUserInfo } from "../api/api" // adjust path if needed
import ViewAllPatients from "./ViewHistory";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [hideToggler, setHideToggler] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    fetchUserInfo()
      .then((data) => {
        console.log("User data received:", data);
        setUserName(data.username || data.name || "User");
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);
  
  
  const [activeComponent, setActiveComponent] = useState(null);
  // Menu toggle
  const handleToggle = () => {
    setIsToggled((prev) => !prev);
    setHideToggler(true);
    setTimeout(() => setHideToggler(false), 500);
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const closeMenu = () => setShowDropdown(false);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${isScrolled ? "scrolled" : ""}`} id="navbar">
      <div className="container">
        <div className="logo">
          <NavLink className="logo" to="/home" end onClick={handleToggle}>
            SiiqoPredict
          </NavLink>
        </div>
        <div className="metasebiya">
                  <div className="profile-icon" onClick={toggleDropdown}>
                    <FaUserCircle size={24} />
                  </div>
                  {showDropdown && (
                    <div className="dropdown-menu show">
                      <div className="dropdown-header">
                        <span>{userName}</span>
                      </div>
                      <NavLink className="dropdown-item" to="/dashboard" onClick={closeMenu}>
                        Dashboard
                      </NavLink>
                      <NavLink className="dropdown-item" to="/settings" onClick={closeMenu}>
                        Settings
                      </NavLink>
                      <NavLink className="dropdown-item" to="/" onClick={closeMenu}>
                        Logout
                      </NavLink>
                    </div>
                  )}
                </div>
        <button
          className={`navbar-toggler custom-toggler ${hideToggler ? "hide-toggler" : ""}`}
          type="button"
          onClick={handleToggle}
          aria-expanded={isToggled}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse-wrapper ${isToggled ? "show navbar-open" : "navbar-close"}`} id="navbarNav">
          <div className="navbar-collapse-content">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home" end onClick={handleToggle}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/how-it-works-log" onClick={handleToggle}>
                  How It Works
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/health-wellness-log" onClick={handleToggle}>
                  Health & Wellness Blog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact-log" onClick={handleToggle}>
                  Contact Us
                </NavLink>
              </li>

              {/* User Dropdown */}
              <li className="nav-item dropdown">
                <div className="profile-dropdown-container">
                  <div className="profile-icon" onClick={toggleDropdown}>
                    <FaUserCircle size={24} />
                  </div>
                  {showDropdown && (
                    <div className="dropdown-menu show">
                      <div className="dropdown-header">
                        <span>{userName}</span>
                      </div>
                      <NavLink className="dropdown-item" to="/dashboard" onClick={closeMenu}>
                        Dashboard
                      </NavLink>
                      <NavLink className="dropdown-item" to="/ViewHistoryfull" onClick={closeMenu}>
                 viewHistory
                      </NavLink>
                      <NavLink className="dropdown-item" to="/" onClick={closeMenu}>
                        Logout
                      </NavLink>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
 
          {activeComponent === "viewHistory" && (
            <ViewAllPatients onClose={() => setActiveComponent(null)} />
          )}
    </nav>
  );
};

export default Navbar;
