import React, { useState } from "react";
import "./loginForm.css";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LawyerLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login data:", data);

    try {
      const response = await axios.post(
        "http://localhost:5000/lawyer/logininlawyer",
        data
      );

      console.log(response.data.data.accessToken);

      // Store token
      localStorage.setItem("accessToken", response.data.data.accessToken);

      // Store lawyer id
      localStorage.setItem("lawyerId", response.data.data.loggedInLawyer._id);
      localStorage.setItem("role", "lawyer");

      const id = response.data.data.loggedInLawyer._id;

      setMessage({ type: "success", text: "Login successful! Redirecting..." });
      setTimeout(() => navigate(`/profile/${id}`), 1000);
    } catch (error) {
      console.log(error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Invalid email or password. Please try again.",
      });
    }
  };

  const lawyer = () => {
    navigate("/lawyer");
  };

  const customer = () => {
    navigate("/customer");
  };

  const clientLogin = () => {
    navigate("/");
  };

  return (
    <>
      <div className="form-bodyLogin">
        <div className="bodyContainerLogin">
          <div className="containerLogin">
            <h1 className="MainTextLogin">
              Login <span className="HireLogin">HireALawyer.pk</span>
            </h1>

            {message.text && (
              <p
                className={
                  message.type === "success"
                    ? "success-message"
                    : "error-message"
                }
              >
                {message.text}
              </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-containerLogin">
                <div className="form-controlLogin">
                  <label className="TextLogin">Email Address</label>
                  <div></div>
                  <input
                    type="text"
                    name="email"
                    {...register("email", { required: "Email is required" })}
                    className="FieldLogin"
                  />
                  {errors.email && (
                    <p className="error">{errors.email.message}</p>
                  )}
                </div>

                <div className="form-controlLogin">
                  <label className="TextLogin">Password</label>
                  <div></div>
                  <input
                    type="password"
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="FieldLogin"
                  />
                  {errors.password && (
                    <p className="error">{errors.password.message}</p>
                  )}
                </div>

                <div className="container-btn-textLogin">
                  {/* Add forgot password link or other actions if needed */}
                </div>

                <button type="submit" className="submit-btnLogin">
                  Submit
                </button>
                <Button className="Register-btnLogin" onClick={clientLogin}>
                  Login as Client
                </Button>
                <div className="registerLogin">
                  <h6 className="text-accountLogin">Don't have an account?</h6>
                  <ul>
                    <li className="Register-btnLogin-Control">
                      <Button className="Register-btnLogin" onClick={lawyer}>
                        Register as Lawyer
                      </Button>
                      <Button className="Register-btnLogin" onClick={customer}>
                        Register as Customer
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerLogin;