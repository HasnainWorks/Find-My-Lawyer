import React, { useState, useEffect } from "react";
import "./navbar.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Button } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMediaIcons(false);
  }, [location]);

  // Debounce function to prevent multiple rapid clicks
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const navigateWithDebounce = debounce(navigate, 300);

  function handleNavigation(route) {
    navigateWithDebounce(route);
  }

  // Check if the route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Toggle menu function
  const toggleMenu = () => {
    setShowMediaIcons(!showMediaIcons);
  };

  return (
    <>
      <nav className={`main-nav ${scrolled ? "scrolled" : ""}`}>
        {/* 1st logo part */}
        <div className="logo">
          <h2 onClick={() => handleNavigation('/')}>
            <span>F</span>ind    
            <span>M</span>y 
            <span>L</span>awyer 
            
          </h2>
        </div>

        {/* 2nd menu part */}
        <div
          className={`menu-link ${showMediaIcons ? "mobile-menu-link" : ""} ${
            showMediaIcons ? "active" : ""
          }`}
        >
          {/* Close button for mobile menu - positioned at the top right */}
          {showMediaIcons && (
            <button className="close-menu-btn" onClick={toggleMenu} aria-label="Close menu">
              <IoMdClose />
            </button>
          )}
          
          <ul>
            <li className={isActive('/home') ? "active" : ""}>
              <Button 
                className="navbtn" 
                onClick={() => handleNavigation('/home')}
              >
                Home
              </Button>
            </li>
            <li className={isActive('/about') ? "active" : ""}>
              <Button 
                className="navbtn" 
                onClick={() => handleNavigation('/about')}
              >
                About
              </Button>
            </li>
            <li className={isActive('/service') ? "active" : ""}>
              <Button 
                className="navbtn" 
                onClick={() => handleNavigation('/service')}
              >
                Services
              </Button>
            </li>
            <li className={isActive('/Casestudy') ? "active" : ""}>
              <Button 
                className="navbtn" 
                onClick={() => handleNavigation('/Casestudy')}
              >
                Case Study
              </Button>
            </li>
            <li className={isActive('/contact') ? "active" : ""}>
              <Button 
                className="navbtn" 
                onClick={() => handleNavigation('/contact')}
              >
                Contact
              </Button>
            </li>
            <li>
              <Button 
                onClick={() => handleNavigation('/')} 
                className="login-button"
                variant="contained"
              >
                Login
              </Button>
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <FaFacebookSquare className="facebook" />
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <FaInstagramSquare className="instagram" />
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <FaYoutubeSquare className="youtube" />
              </a>
            </li>
          </ul>

          {/* hamburger menu start */}
          <div className="hamburger-menu">
            <button 
              className="menu-toggle" 
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
        
        {/* Overlay for mobile menu */}
        {showMediaIcons && <div className="menu-overlay" onClick={toggleMenu}></div>}
      </nav>
    </>
  );
};

export default Navbar;