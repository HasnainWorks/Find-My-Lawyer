import React, { useEffect, useState } from "react";
import "./Cases.css";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Cases = () => {
  const navigate = useNavigate();
  const [dataLawyer, setDataLawyer] = useState([]);
  const location = useLocation();
  const expertise = location.state?.expertise;
  const role = localStorage.getItem("role"); // ✅ ADDED

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://find-my-lawyer.onrender.com/casestudy/getallcasestudies"
        );
        const caseStudies = response.data.data;

        const filteredCaseStudies = caseStudies.filter((caseStudy) => {
          return caseStudy.expertise === expertise;
        });
        setDataLawyer(filteredCaseStudies);
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchData();
  }, [expertise]);

  // ✅ ADDED
  const handleCaseClick = (id) => {
    navigate(`/casedescription/${id}`);
  };

  // // ✅ ADDED: block lawyers
  // if (role === "lawyer") {
  //   return (
  //     <>
  //       <Navbar />
  //       <div style={{ textAlign: "center", padding: "60px 20px" }}>
  //         <h2>This page is for clients only.</h2>
  //         <p>You can find and upload your own case studies from your profile.</p>
  //       </div>
  //       <Footer />
  //     </>
  //   );
  // }

  return (
    <>
      <Navbar />

      <div className="grid_filter_cases">
        <div className="h1-notice">
          <h1>
            Browse verified case studies from lawyers specializing in {expertise || "your area of need"}.
          </h1>
        </div>
        {/* ✅ REMOVED: Submit button — clients only see this page now */}
      </div>

      <div className="case-cards-grid">
        {dataLawyer.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%", padding: "40px" }}>
            No case studies found for this expertise yet.
          </p>
        ) : (
          dataLawyer.map((post) => (
            <div
              className="case-card"
              key={post._id}
              onClick={() => handleCaseClick(post._id)} // ✅ ADDED
              style={{ cursor: "pointer" }} // ✅ ADDED
            >
              <img
                src={post.image}
                alt={post.name}
                className="case-card-image"
                style={{ objectPosition: "top center" }} // ✅ ADDED
              />

              <div className="case-card-body">
                <h3 className="case-card-title">
                  Case Name: {post.name}
                </h3>

                <p className="case-card-description">
                  Case Description: {post.description}
                </p>

                <p className="case-card-description">
                  Lawyer Name: {post.lawyerID?.name}
                </p>

                <p className="case-card-description">
                  Lawyer City: {post.lawyerID?.city}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Cases;