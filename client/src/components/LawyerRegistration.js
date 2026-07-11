import React from "react";
import { useForm } from "react-hook-form";
import "./lawyerRegistration.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LawyerRegistration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append all text fields
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("cpassword", data.cpassword);
      formData.append("cnic", data.cnic);
      formData.append("phone", data.phone);
      formData.append("city", data.city);
      formData.append("experience", data.experience);
      formData.append("qualification", data.qualification);
      formData.append("expertise", data.expertise);
      formData.append("description", data.description);


      // Append the file (image[0] because it's an array of files)
      formData.append("image", data.image[0]);

      const response = await axios.post(
        "https://find-my-lawyer.onrender.com/lawyer/registerlawyer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lawyer-register-container">
      <div className="textLogoContainer">
        <h1>
          <span className="logoText">FindMyLawyer.pk</span> Lawyer Registration
        </h1>
      </div>
      <div className="lawyer-details-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-container-registration"
        >
          <div className="lawyer-details-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="inputControl"
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div className="lawyer-details-control">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="inputControl"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="lawyer-details-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="inputControl"
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          <div className="lawyer-details-control">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              {...register("cpassword", {
                required: "Confirm Password is required",
              })}
              className="inputControl"
            />
            {errors.cpassword && (
              <p className="error">{errors.cpassword.message}</p>
            )}
          </div>

          <div className="lawyer-details-control">
            <label htmlFor="cnic">CNIC</label>
            <input
              type="number"
              {...register("cnic", { required: "CNIC is required" })}
              className="inputControl"
            />
            {errors.cnic && <p className="error">{errors.cnic.message}</p>}
          </div>

          <div className="lawyer-details-control">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              {...register("phone", { required: "Phone Number is required" })}
              className="inputControl"
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>

          <div className="lawyer-details-control">
            <label htmlFor="city">City</label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="inputControl"
            />
            {errors.city && <p className="error">{errors.city.message}</p>}
          </div>

          <div className="lawyer-details-control">
            <label htmlFor="experience">Experience</label>
            <input
              type="text"
              {...register("experience", {
                required: "Experience is required",
              })}
              className="inputControl"
            />
            {errors.experience && (
              <p className="error">{errors.experience.message}</p>
            )}
          </div>

          <div className="lawyer-details-control">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              {...register("qualification", {
                required: "Qualification is required",
              })}
              className="inputControl"
            />
            {errors.qualification && (
              <p className="error">{errors.qualification.message}</p>
            )}
          </div>

          <div className="lawyer-details-control">
            <label htmlFor="expertise">Area of Expertise</label>
            <select
              {...register("expertise", { required: "Expertise is required" })}
              className="inputControl"
            >
              <option value="">Select Expertise</option>
              <option value="Legal notice">Legal notice</option>
              <option value="Criminal matter">Criminal matter</option>
              <option value="Divorce">Divorce</option>
              <option value="Family matter">Family matter</option>
              <option value="Mediation">Mediation</option>
              <option value="Company Reg.">Company Reg.</option>
              <option value="Trademark">Trademark</option>
              <option value="Tax filing">Tax filing</option>
              <option value="Recovery matter">Recovery matter</option>
              <option value="Immigration">Immigration</option>
              <option value="Service matter">Service matter</option>
              <option value="Civil matter">Civil matter</option>
            </select>
            {errors.expertise && (
              <p className="error">{errors.expertise.message}</p>
            )}
          </div>

          <div className="lawyer-details-control">
            <label htmlFor="description">Description</label>
            <textarea
              {...register("description", { maxLength: 320 })}
              className="inputControl"
              placeholder="Max length up to 320 words"
            />
          </div>

          <div className="lawyer-details-control">
            <label htmlFor="image">Profile Picture</label>
            <input
              type="file"
              {...register("image", {
                required: "Profile Picture is required",
              })}
              className="inputControl"
            />
            {errors.profilePicture && (
              <p className="error">{errors.image.message}</p>
            )}
          </div>

          <button type="submit" className="create-lawyer-account">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default LawyerRegistration;
