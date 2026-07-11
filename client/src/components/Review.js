import React, { useState, useEffect } from 'react';
import './review.css';
import ReviewForm from './ReviewForm';
import axios from 'axios';

import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

function Review() {
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(0);


  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/review/getreviews');
        const data = response.data.data; // Assuming response structure has a `data` field containing the array
        console.log(data);
        setReviews(data || []); // Ensure it defaults to an empty array if data is undefined
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReviews();
  }, []);

  const prevReview = () => {
    setCurrentReview((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex < 0) {
        newIndex = reviews.length - 1;
      }
      return newIndex;
    });
  };

  const nextReview = () => {
    setCurrentReview((prevIndex) => {
      let newIndex = prevIndex + 1;
      if (newIndex >= reviews.length) {
        newIndex = 0;
      }
      return newIndex;
    });
  };


  return (
    <>
      <ReviewForm />
      <main className='main-review'>
       <section className='container-review'>
           <div className='title-review'>
             <h1 className='heading1'>User Reviews</h1>
             <div className='underline-review'></div>
           </div>

          {reviews.length > 0 ? (
            <article className='article-review'>
              <div className='image-container-review'>
                {/* <img src={reviews[currentReview].image} alt={reviews[currentReview].name} className='person-img-review' /> */}
                {/* <span className='quote-icon-review'>
                  <FaQuoteRight />
                </span> */}
              </div>
              <h4 className='author-review'>{reviews[currentReview].name}</h4>
              <p className='author-review-comment'>"{reviews[currentReview].comment}"</p>
              <p className='info-review'>Rating: {reviews[currentReview].rating}/10</p>
              <div className='button-container-review'>
                <button className='prev-btn-review' onClick={prevReview}>
                  <FaChevronLeft />
                </button>
                <button className='next-btn-review' onClick={nextReview}>
                  <FaChevronRight />
                </button>
              </div>
            </article>
          ) : (
            <p>Loading reviews...</p>
          )}
        </section>
      </main>
    </>
  );
}

export default Review;
