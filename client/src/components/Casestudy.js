import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import Navbar from './Navbar';
import Footer from './Footer';

import criminal_matter from '../images/criminal_matter.svg';
import legal_notice from '../images/legal_notice.svg';
import divorce from '../images/divorce.svg';
import family_matter from '../images/family_matter.svg';
import mediation from '../images/mediation.svg';
import company_reg from '../images/company_reg.svg';
import trade_mark from '../images/trade_mark.svg';
import tax_filing from '../images/tax_filling.svg';
import recovery_matter from '../images/recovery_matter.svg';
import immigration from '../images/immigration.svg';
import service_matter from '../images/service_matter.svg';
import civil_matter from '../images/civil_matter.svg';

function Casestudy() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // ✅ ADDED

  const profilesFunc = (expertise) => {
    navigate('/cases', {
      state: { expertise },
    });
  };

  //  block lawyers
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
      <div className="hero-main">
        <div className="hero-h1">
          <h1>Case Study</h1>
        </div>
        <div className="hero-services-container">

          <div className="hero-block" onClick={() => profilesFunc('Legal notice')}>
            <img className="img_services" src={legal_notice} alt="Legal notice" />
            <p>Legal notice</p>
          </div>

          <div className="hero-block" onClick={() => profilesFunc('Criminal matter')}>
            <img className="img_services" src={criminal_matter} alt="Criminal matter" />
            <p>Criminal Matter</p>
          </div>

          <div className="hero-block" onClick={() => profilesFunc('Divorce')}>
            <img className="img_services" src={divorce} alt="Divorce" />
            <p>Divorce</p>
          </div>

          <div className="hero-block" onClick={() => profilesFunc('family matter')}>
            <img className="img_services" src={family_matter} alt="Family matter" />
            <p>Family Matter</p>
          </div>

          <div className="hero-block" onClick={() => profilesFunc('Meditation')}>
            <img className="img_services" src={mediation} alt="Mediation" />
            <p>Mediation</p>
          </div>

          <div className="hero-block" onClick={() => profilesFunc('Company Reg.')}>
            <img className="img_services" src={company_reg} alt="Company Reg." />
            <p>Company Reg.</p>
          </div>

          <div className="hero-block" onClick={() => profilesFunc('Trade mark')}>
            <img className="img_services" src={trade_mark} alt="Trade mark" />
            <p>Trade Mark</p>
          </div>

          <div className="hero-block" onClick={() => profilesFunc('Tax filling')}>
            <img className="img_services" src={tax_filing} alt="Tax filling" />
            <p>Tax Filing</p>
          </div>

          <div className="hero-block" onClick={() => profilesFunc('Recovery matter')}>
            <img className="img_services" src={recovery_matter} alt="Recovery matter" />
            <p>Recovery Matter</p>
          </div>

          <div className="hero-block" onClick={() => profilesFunc('Immigration')}>
            <img className="img_services" src={immigration} alt="Immigration" />
            <p>Immigration</p>
          </div>

          <div className="hero-block" onClick={() => profilesFunc('Service matter')}>
            <img className="img_services" src={service_matter} alt="Service matter" />
            <p>Service Matter</p>
          </div>

          <div className="hero-block" onClick={() => profilesFunc('civil matter')}>
            <img className="img_services" src={civil_matter} alt="Civil matter" />
            <p>Civil Matter</p>
          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Casestudy;