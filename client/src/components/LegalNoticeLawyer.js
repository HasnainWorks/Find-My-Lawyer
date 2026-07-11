import React, { useEffect, useState } from 'react';
import './profileLawyers.css';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';

const LegalNoticeLawyer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [lawyers, setLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchLawyers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://find-my-lawyer.onrender.com/lawyer/getlegalnoticelawyers');
        const data = response.data.data;
        console.log('Fetched lawyers data:', data);
        setLawyers(data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching lawyers data:', error);
        setError('Failed to load lawyers. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLawyers();
  }, []);
  
  const handleLawyerClick = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <>
      <Navbar />
      
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Legal Notice Lawyers</h1>
          <p className="page-subtitle">Find experienced lawyers specializing in legal notices</p>
        </div>
      </div>
      
      <div className="container">
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
            <p className="no-results-message">No lawyers found matching your criteria.</p>
          </div>
        ) : (
          <div className="lawyers-grid">
            {lawyers.map((lawyer) => (
              <div className="lawyer-card" key={lawyer._id} onClick={() => handleLawyerClick(lawyer._id)}>
                <div className="lawyer-card-inner">
                  <div className="lawyer-info">
                    <div className="lawyer-image">
                      <img
                        src={`${lawyer.image}`}
                        alt={`Lawyer ${lawyer.name}`}
                      />
                    </div>
                    <div className="lawyer-details">
                      <h3 className="lawyer-name">Adv. {lawyer.name || 'Unknown'}</h3>
                      <p className="lawyer-specialization">{lawyer.specialization || 'Legal Notices Specialist'}</p>
                    </div>
                  </div>
                  
                  <div className="lawyer-stats">
                    <div className="stat-item">
                      <span className="stat-label">Wins</span>
                      <span className="stat-value">{lawyer.statistics?.wins || 5}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Cases</span>
                      <span className="stat-value">{lawyer.statistics?.cases || 10}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Rating</span>
                      <span className="stat-value">{lawyer.rating || 4.5}</span>
                    </div>
                  </div>  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LegalNoticeLawyer;