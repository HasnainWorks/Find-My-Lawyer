import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";
import HireForm from "./HireForm";

const LawyerPublicProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [caseStudies, setCaseStudies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          `http://localhost:5000/lawyer/lawyerprofile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data.data);
      } catch (error) {
        console.log("Error fetching lawyer profile:", error);
      }
    };

    const fetchCaseStudies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/casestudy/getallcasestudies"
        );
        const all = response.data.data || [];
        const filtered = all.filter((cs) => cs.lawyerID?._id === id);
        setCaseStudies(filtered);
      } catch (error) {
        console.log("Error fetching case studies:", error);
      }
    };

    fetchLawyer();
    fetchCaseStudies();
  }, [id]);

  function handleHireClick() {
    setShowForm(!showForm);
  }

  const handleCaseClick = (caseId) => {
    navigate(`/casedescription/${caseId}`);
  };

  return (
    <>
      <Navbar />

      <div className="mainDiv">
        <div className="container-profile">

          {/* ✅ ADDED: lawyer photo */}
          {data?.image && (
            <img
              src={data.image}
              alt={data.name}
              style={{
                width: "160px",
                height: "160px",
                objectFit: "cover",
                borderRadius: "50%",
                display: "block",
                margin: "0 auto 20px",
              }}
            />
          )}

          <h2 className="h2">
            Adv. {data?.name}
          </h2>

          <h4 className="h4">
            Experience
            <p>{data?.experience}</p>
          </h4>

          <h4 className="h5">
            City
            <p>{data?.city}</p>
          </h4>

          <h4 className="h6">
            Description
            <p>{data?.description}</p>
          </h4>

          <button className="button-5" onClick={handleHireClick}>
            Hire Lawyer
          </button>

        </div>
      </div>

      {showForm && (
        <HireForm selectedProfileEmail={data?.email} />
      )}

      <div className="mainDiv" style={{ marginTop: "20px" }}>
        <div className="container-profile">
          <h3 style={{ marginBottom: "15px" }}>Case Studies</h3>

          {caseStudies.length === 0 ? (
            <p>This lawyer hasn't uploaded any case studies yet.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {caseStudies.map((cs) => (
                <div
                  key={cs._id}
                  onClick={() => handleCaseClick(cs._id)}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={cs.image}
                    alt={cs.name}
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "cover",
                      objectPosition: "top center",
                      borderRadius: "6px",
                    }}
                  />
                  <h4 style={{ marginTop: "8px" }}>{cs.name}</h4>
                  <p style={{ fontSize: "0.9rem", color: "#555" }}>
                    {cs.expertise}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LawyerPublicProfile;