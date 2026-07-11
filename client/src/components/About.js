import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Hasnain from "../images/Hasnain.jpeg";
import sarmad from "../images/Sarmad.jpeg";
import Ahmer from "../images/Ahmer.jpeg";
import sheraz from "../images/sheraz.jpeg";
import Navbar from "./Navbar";

function About() {
  const navigate = useNavigate();
  function onClickOpen() {
    navigate("/contact");
  }
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-section">
          <h1>About Us</h1>
          {/* <p>Some text about who we are and what we do.</p> */}
        </div>
        <div className="abt_con">
          <div className="abt-para-con">
            <p className="abt_para">
              {" "}
              <span className="HireText">FindMyLawyer.pk </span> is a leading
              online platform that aims to revolutionize the way individuals and
              businesses access legal services. With a strong focus on
              convenience, transparency, and efficiency, we provide a seamless
              experience for clients seeking legal assistance and empower
              lawyers to deliver exceptional services. <br />
              Our platform connects clients with a diverse network of skilled
              lawyers specializing in various practice areas. <br /> Whether you
              need assistance with personal injury claims, business contracts,
              family law matters, or any other legal issue, we have a qualified
              and experienced lawyer to meet your needs. We understand that
              every legal situation is unique, and we strive to match clients
              with lawyers who have the right expertise and approach to handle
              their specific case. <br />
              At <span className="HireText">FindMyLawyer.pk </span> we are
              committed to leveraging technology to make the legal process more
              accessible and efficient. Our user-friendly website allows clients
              to browse lawyer profiles, compare reviews and ratings, and
              schedule consultations at their convenience. We believe in
              providing transparent and upfront information, including pricing
              structures and timelines, enabling clients to make informed
              decisions about their legal matters.
            </p>
          </div>

          <h2 className="main-text">Our Vision</h2>

          <div className="abt-para-con-1">
            <p className="abt_para">
              "Transforming the legal industry through innovation and
              accessibility. We connect individuals and businesses with
              top-notch lawyers who understand their needs, providing efficient
              solutions. <br />
              We break barriers to justice by making the legal process
              affordable, transparent, and efficient for all. Our platform
              serves as a knowledge hub, empowering lawyers with valuable
              insights from previous court rulings. <br />
              At <span className="HireText">FindMyLawyer.pk,</span> excellence,
              integrity, and client satisfaction drive us. We aim to be the
              go-to platform for legal services, offering exceptional customer
              service and a reliable network of lawyers. Together, let's
              redefine the legal experience, empowering individuals and
              businesses to navigate with confidence and ease".
            </p>
          </div>
        </div>
        <div className="row">
          <div className="card_abt">
            <div className="column">
              <img src={Hasnain} alt="Jane" className="img1_abt" />
              <div className="container-aboutus">
                <h2>Hasnain Qurban</h2>
                <p className="title">CEO & Founder</p>

                <p>
                  "As the founder and CEO, I am dedicated to driving the success
                  of our company. With a passion for innovation and a strong
                  leadership mindset, I strive to guide our team towards
                  achieving our goals and delivering exceptional services to our
                  clients".
                </p>
                <p>hasnainqurban284@gmail.com</p>
                <p>
                  <button className="button" onClick={onClickOpen}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="card_abt">
            <div className="column">
              <img src={sarmad} alt="John" className="img3_abt" />
              <div className="container-aboutus">
                <h2>Sarmad Ahmad khan </h2>
                <p className="title">Co-Founder & CEO</p>
                <p>
                  "As Sarmad, I am proud to be a co-founder and CEO of our
                  company. With a shared vision and relentless determination, my
                  fellow co-founder and I have built a successful organization.
                  Together, we lead our team with passion and drive, constantly
                  striving for excellence and innovation. It is a privilege to
                  contribute to our company's growth and make a positive impact
                  in the industry we serve".
                </p>
                <p>sarmadahmadkhan2@gmail.com</p>
                <p>
                  <button className="button" onClick={onClickOpen}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card_abt">
            <div className="column">
              <img src={Ahmer} alt="Mike" className="img2_abt" />
              <div className="container-aboutus">
                <h2>Ahmer Taimoor</h2>
                <p className="title">Chief Operating Officer</p>
                <p>
                  "As Ahmer, I am honored to serve as the operational director
                  of our organization. With a passion for efficiency and a
                  meticulous approach, I strive to optimize our operations and
                  drive our company towards success. By implementing streamlined
                  processes and effective resource management, I aim to maximize
                  productivity and enhance overall performance. It is a
                  privilege to be part of a dynamic team and contribute to our
                  collective growth and achievements."
                </p>
                <p>ahmerbaloch475@gmail.com</p>
                <p>
                  <button className="button" onClick={onClickOpen}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card_abt">
            <div className="column">
              <img src={sheraz} alt="John" className="img3_abt" />
              <div className="container-aboutus">
                <h2>Muhammad Sheraz</h2>
                <p className="title">Chief Technology Officer</p>
                <p>
                  "As Sheraz, I am honored to serve as the Chief Technology Officer of our organization.
                   With a passion for innovation and a deep commitment to technical excellence, 
                   I strive to build robust, scalable systems that power our company's growth.
                    By staying ahead of emerging technologies and fostering a culture of continuous learning,
                     I aim to drive engineering excellence and turn our product vision into reality. 
                     It is a privilege to lead a talented team and shape the technical foundation of our collective success."
                </p>
                <p>sherazahmadkhan06@gmail.com</p>
                <p>
                  <button className="button" onClick={onClickOpen}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Footer/>
    </>
  );
}

export default About;
