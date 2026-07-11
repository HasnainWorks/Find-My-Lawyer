import React, { useEffect, useState } from 'react';
import './profileLawyers.css';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';

const CriminalMatterLawyer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dataLawyer, setDataLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://find-my-lawyer.onrender.com/lawyer/getcriminalmatterlawyers');
        const data = response.data.data;
        setDataLawyers(data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load lawyers. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <>
      <Navbar />

      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Criminal Matter Lawyers</h1>
          <p className="page-subtitle">Find top lawyers for criminal defense and litigation</p>
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
        ) : dataLawyer.length === 0 ? (
          <div className="no-results">
            <p className="no-results-message">No lawyers found matching your criteria.</p>
          </div>
        ) : (
          <div className="lawyers-grid">
            {dataLawyer.map((lawyer) => (
              <div className="lawyer-card" key={lawyer._id} onClick={() => handleClick(lawyer._id)}>
                <div className="lawyer-card-inner">
                  <div className="lawyer-info">
                    <div className="lawyer-image">
                      <img
                        src={`http://localhost:6003/public/images/${lawyer.image}`}
                        alt={`Lawyer ${lawyer.name}`}
                      />
                    </div>
                    <div className="lawyer-details">
                      <h3 className="lawyer-name">Adv. {lawyer.name || 'Unknown'}</h3>
                      <p className="lawyer-specialization">{lawyer.specialization || 'Criminal Law Expert'}</p>
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

export default CriminalMatterLawyer;
