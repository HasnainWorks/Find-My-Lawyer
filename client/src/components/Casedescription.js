import React, { useEffect, useState } from "react";
import "./Casedescription.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Casedescription = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/casestudy/getallcasestudies"
        );
        const all = response.data.data || [];
        const found = all.find((cs) => cs._id === id);
        setData(found || null);
      } catch (error) {
        console.log("Error fetching case study:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p>Loading case study...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2>Case study not found.</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="case-paper-container">
        <div className="case-paper">
          <img
            src={data.image}
            alt={data.name}
            className="case-paper-image"
          />

          <div className="case-paper-body">
            <h1 className="case-paper-title">{data.name}</h1>
            <p className="case-paper-meta">
              Case No: {data.caseno} &nbsp;|&nbsp; Expertise: {data.expertise}
            </p>
            <p className="case-paper-meta">
              Lawyer: Adv. {data.lawyerID?.name} — {data.lawyerID?.city}
            </p>

            <hr />

            <p className="case-paper-description">{data.description}</p>

            
            <a
              href={data.image}
              download
              target="_blank"
              rel="noreferrer"
              className="case-paper-download"
            >
              Download original file
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Casedescription;