import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import "./caseform.css";
import axios from "axios";
import Footer from "./Footer";

const Caseform = () => {
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ ADDED: role check, read once at render time
  const role = localStorage.getItem("role");

  const onSubmit = async (data) => {
    const token = localStorage.getItem("accessToken");
    console.log("TOKEN:", token);

    // ✅ CHANGED: guard now checks role too, not just token presence
    if (!token || role !== "lawyer") {
      setMessage("❌ Only lawyers can post case studies");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("caseno", data.caseno);
    formData.append("expertise", data.expertise);
    formData.append("description", data.description);
    formData.append("myfile2", data.myfile2[0]);

    try {
      const response = await axios.post(
        "https://find-my-lawyer.onrender.com/casestudy/postcasestudies",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 201) {
        setMessage("✅ Case study posted successfully!");
        reset();
      } else {
        setMessage("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log("Error while posting case study:", error);

      if (error.response) {
        if (error.response.status === 401) {
          setMessage("❌ Only lawyers can post case studies");
        } else if (error.response.status === 403) {
          setMessage("❌ Access denied: Lawyers only");
        } else {
          setMessage(
            `❌ ${error.response.data?.message || "Request failed"}`
          );
        }
      } else {
        setMessage("❌ Network or server error. Try again later.");
      }
    }

    setTimeout(() => setMessage(null), 3000);
  };

  // ✅ ADDED: block the entire page for non-lawyers
  if (role !== "lawyer") {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2>Only lawyers can submit case studies.</h2>
          <p>Please log in as a lawyer to access this page.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="lawyer-register-container-cases">
        <div className="textLogoContainer-cases">
          <h1>
            <span className="logoText-cases">FindMyLawyer.pk</span> Submit recent
            Case study
          </h1>
        </div>

        {message && (
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              color: message.startsWith("✅") ? "green" : "red",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}

        <div className="lawyer-details-container-cases">
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="form-container-registration-cases"
          >
            <div className="lawyer-details-control-cases">
              <label>Name of the case</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="inputControl-cases"
              />
              {errors.name && <p>Case name is required</p>}
            </div>

            <div className="lawyer-details-control-cases">
              <label>Case number</label>
              <input
                type="text"
                {...register("caseno", { required: true })}
                className="inputControl-cases"
              />
              {errors.caseno && <p>Case number is required</p>}
            </div>

            <div className="lawyer-details-control-cases">
              <label>Area of Expertise</label>
              <select
                {...register("expertise", { required: true })}
                className="inputControl-cases"
              >
                <option value="">Select Expertise</option>
                <option value="Legal notice">Legal notice</option>
                <option value="Criminal matter">Criminal matter</option>
                <option value="Divorce">Divorce</option>
                <option value="family matter">Family matter</option>
                <option value="Mediation">Mediation</option>
                <option value="Company Reg.">Company Reg.</option>
                <option value="Trade mark">Trade mark</option>
                <option value="Tax filling">Tax filling</option>
                <option value="Recovery matter">Recovery matter</option>
                <option value="Immigration">Immigration</option>
                <option value="Service matter">Service matter</option>
                <option value="Civil matter">Civil matter</option>
              </select>
              {errors.expertise && <p>Expertise is required</p>}
            </div>

            <div className="lawyer-details-control-cases">
              <label>Picture</label>
              <input
                type="file"
                {...register("myfile2", { required: true })}
                className="inputControl-cases"
              />
              {errors.myfile2 && <p>Image is required</p>}
            </div>

            <div className="lawyer-details-control-cases">
              <label>Description</label>
              <textarea
                rows="5"
                maxLength="420"
                placeholder="Max 420 characters"
                {...register("description", { required: true })}
                className="inputControl-cases"
              />
              {errors.description && <p>Description is required</p>}
            </div>

            <button type="submit" className="create-lawyer-account-cases">
              Submit case
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Caseform;