import React, { useEffect, useState } from "react";
import "./profileLawyers.css";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";

const GetLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const expertise = location.state?.expertise;

  // ✅ ADDED: read role once at render time
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchLawyers = async () => {
      // ✅ ADDED: skip the fetch entirely for lawyers
      if (role === "lawyer") {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          `http://localhost:5000/lawyer/expertise/${expertise}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const allLawyers = response.data.data;
        
        const filteredLawyers = allLawyers.filter(
          (lawyer) => lawyer.expertise === expertise
        );
        setLawyers(filteredLawyers);
        setError(null);
      } catch (error) {
        console.error("Error fetching lawyers data:", error);
        setError("Failed to load lawyers. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLawyers();
  }, [expertise, role]);

  const navigate = useNavigate();

  const handleLawyerClick = (id) => {
    navigate(`/lawyerprofile/${id}`);
  };

  // ✅ ADDED: block the whole page for lawyers
  if (role === "lawyer") {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2>This page is for clients only.</h2>
          <p>Lawyers don't browse other lawyers here.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page-header">
        <div className="container">
          <h1 className="page-title">{expertise} Lawyers</h1>
          <p className="page-subtitle">
            Find experienced lawyers specializing in {expertise}
          </p>
        </div>
      </div>

      <div className="container" style={{ minHeight: "50vh" }}>
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="no-results">
            <p className="no-results-message">{error}</p>
          </div>
        ) : lawyers.length === 0 ? (
          <div className="no-results">
            <p className="no-results-message">
              No lawyers found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="lawyers-grid">
            {lawyers.map((lawyer) => (
              <div
                className="lawyer-card"
                key={lawyer._id}
                onClick={() => handleLawyerClick(lawyer._id)}
              >
                <div className="lawyer-card-inner">
                  <div className="lawyer-info">
                    <div className="lawyer-image">
                      <img
                        src={`${lawyer.image}`}
                        alt={`Lawyer ${lawyer.name}`}
                      />
                    </div>
                    <div className="lawyer-details">
                      <h3 className="lawyer-name">
                        Adv. {lawyer.name || "Unknown"}
                      </h3>
                      <p className="lawyer-specialization">
                        {lawyer.expertise}
                      </p>
                    </div>
                  </div>

                  <div className="lawyer-stats">
                    <div className="stat-item">
                      <span className="stat-label">Wins</span>
                      <span className="stat-value">
                        {lawyer.statistics?.wins || 5}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Cases</span>
                      <span className="stat-value">
                        {lawyer.statistics?.cases || 10}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">losses</span>
                      <span className="stat-value">{lawyer.rating || 5}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default GetLawyers;