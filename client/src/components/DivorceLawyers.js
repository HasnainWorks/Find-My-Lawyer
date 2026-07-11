import React, { useEffect, useState } from 'react';
import './profileLawyers.css';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';

const DivorceLawyers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dataLawyer, setDataLawyers] = useState([]);
  console.log('location.state', location.state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/lawyer/getdivorceLawyer');
        const data = response.data.data; // Assuming response structure has a `data` field containing the array
        console.log(data);
        setDataLawyers(data || []); // Ensure it defaults to an empty array if data is undefined
      } catch (error) {
        console.error('Error fetching data:', error);
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
      <div className="filter">
        Sort by:
        <select id="sortby" name="sortby">
          <option value="bumped_at-desc" selected="selected">
            Updated Date: Recent First
          </option>
          <option value="bumped_at-asc">Highest Win</option>
          <option value="price-asc">Highest Rating</option>
          <option value="price-desc">Most Cases</option>
          <option value="model_year-desc">Lowest Win</option>
          <option value="model_year-asc">Lowest Rating</option>
        </select>
      </div>

      <div className="container-fluid mt-5">
        <div className="scroll">
          <h2>Latest News</h2>
          <marquee behavior="scroll" direction="up" onMouseOver={(e) => e.target.stop()} onMouseOut={(e) => e.target.start()}>
            <ul className="timeline">
              <li>
                <a href="https://portals.au.edu.pk/qec/">
                  <b>
                    Feedback from customers
                    <img src="new.gif" alt="New" />
                  </b>
                </a>
                <a href="#" className="float-right">
                  <b>1<sup>st</sup> December, 2022</b>
                </a>
                <p>Click here to view details</p>
              </li>
              <li>
                <a href="https://au.edu.pk/Pages/Examination/Date_Sheet_MBBS_Examination.aspx">
                  <b>
                    Revised Law Change
                    <img src="new.gif" alt="New" />
                  </b>
                </a>
                <a href="#" className="float-right">
                  <b>22<sup>nd</sup> November, 2022</b>
                </a>
                <p>Click here to view details</p>
              </li>
              <li>
                <a href="https://portals.au.edu.pk/admissions/">
                  <b>
                    Lawyers News
                    <img src="new.gif" alt="New" />
                  </b>
                </a>
                <a href="#" className="float-right">
                  <b>21<sup>st</sup> November, 2022</b>
                </a>
                <p>Click here to view details</p>
              </li>
              <li>
                <a href="https://portals.au.edu.pk/feesystem/">
                  <b>
                    High Court News
                    <img src="new.gif" alt="New" />
                  </b>
                </a>
                <a href="#" className="float-right">
                  <b>6<sup>th</sup> October, 2022</b>
                </a>
                <p>Click here to view details</p>
              </li>
            </ul>
          </marquee>
        </div>

        <div className="row text-center">
          {dataLawyer.map((post) => (
            <div className="col-10 col-md-5 mt-5" key={post._id}>
              <div className="profilecards card p-1" onClick={() => handleClick(post._id)}>
                <div className="d-flex align-items-center">
                  <div className="image">
                    <img
                      src={`http://localhost:6003/public/images/${post.image}`}
                      className="rounded"
                      alt={post.name}
                      width="160"
                      height="100"
                    />
                  </div>
                  <div className="ml-3 w-100">
                    <h4 className="mb-0 mt-0 textLeft">Adv. {post.name}</h4>
                    <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                      <div className="d-flex flex-column">
                        <span className="articles">Win</span>
                        <span className="number1">5</span>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="followers">Cases</span>
                        <span className="number2">10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DivorceLawyers;
