import React from "react";
import "./footer.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Footer = () => {

  const lawyerId = localStorage.getItem("lawyerId");

  return (
    <>
      <footer className="footer-container">
        <div className="footer-row">

          <div className="footer-col"></div>

          <div className="footer-col">
            <h3>Office</h3>
            <p>NFC IET boys hostel Quaid-e-Azam hall, Multan</p>
            <h4>03434018761</h4>
          </div>

          <div className="footer-col">
            <h3>Links</h3>

            <ul className="footer-ul">

              <li>
                <NavLink to="/home">Home</NavLink>
              </li>

              <li>
                <NavLink to="/about">About</NavLink>
              </li>

              <li>
                <NavLink to="/service">Services</NavLink>
              </li>

              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>

              {/* 🔥 Dynamic Profile Route */}
              {lawyerId && (
                <li>
                  <NavLink to={`/profile/${lawyerId}`}>
                    Profile
                  </NavLink>
                </li>
              )}

            </ul>
          </div>

          <div className="footer-col">
            <h3>Newsletter</h3>

            <form className="footer-form">
              <input
                type="email"
                placeholder="Enter your email id"
                required
              />

              <button type="submit">
                Submit
              </button>
            </form>

            <div className="social-icons">
              <FaFacebookSquare />
              <FaInstagramSquare />
              <FaYoutubeSquare />
            </div>
          </div>
        </div>

        <hr />

        <p className="copyright">
        Find My Lawyer &copy; 2024 - All rights reserved
        </p>
      </footer>
    </>
  );
};

export default Footer;