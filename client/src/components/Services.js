import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Services.css';

// Import SVG images
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
import Footer from './Footer';

function Services() {
  const navigate = useNavigate();

  const servicesData = [
    { id: 1, name: 'Legal notice', imgSrc: legal_notice, expertise: 'Legal notice' },
    { id: 2, name: 'Criminal matter', imgSrc: criminal_matter, expertise: 'Criminal matter' },
    { id: 3, name: 'Divorce', imgSrc: divorce, expertise: 'Divorce' },
    { id: 4, name: 'Family matter', imgSrc: family_matter, expertise: 'Family matter' },
    { id: 5, name: 'Mediation', imgSrc: mediation, expertise: 'Mediation' },
    { id: 6, name: 'Company Reg', imgSrc: company_reg, expertise: 'Company Reg' },
    { id: 7, name: 'Trade mark', imgSrc: trade_mark, expertise: 'Trade mark' },
    { id: 8, name: 'Tax filling', imgSrc: tax_filing, expertise: 'Tax filling' },
    { id: 9, name: 'Recovery matter', imgSrc: recovery_matter, expertise: 'Recovery matter' },
    { id: 10, name: 'Immigration', imgSrc: immigration, expertise: 'Immigration' },
    { id: 11, name: 'Service matter', imgSrc: service_matter, expertise: 'Service matter' },
    { id: 12, name: 'Civil matter', imgSrc: civil_matter, expertise: 'Civil matter' },
  ];

  const handleClick = (expertise) => {
    console.log(expertise);
    
    navigate('/getlawyers', { state: { expertise } });
  };

  return (
    <>
      <Navbar />
      <div className="hero-main">
        <div className="hero-h1">
          <h1>Services provided by us</h1>
        </div>
        <div className="hero-services-container">
          {servicesData.map((service, index) => (
            <div
              key={index}
              data-key={index}
              className={`hero-block ${service.name.toLowerCase().replace(' ', '_')}`}
              onClick={() => {
                handleClick(service.expertise);
              }}
            >
              <div className="hero-block-content">
                <img className="img_services" src={service.imgSrc} alt={service.name} />
                <p className="service-name">{service.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Services;