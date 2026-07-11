import React from 'react';
import { useForm } from 'react-hook-form';
import './contact.css';
import axios from 'axios';

function ReviewForm({ handleReviewSubmit }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/review/postreviews',data)
      console.log(response);
    } catch (error) {
      console.log(error); 
    }
  };

  return (
    <div className='contact-main'>
      <div className="container-cnc">
        <div className="content">
          <div className="right-side">
            <div className="topic-text">Please tell us about your experience</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-box">
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  {...register('name')} 
                />
              </div>
              <div className="input-box">
                <textarea 
                  className='text-field' 
                  placeholder='Your comment' 
                  {...register('comment')} 
                ></textarea>
              </div>
              <div className="input-box">
                <input 
                  type="number" 
                  placeholder="Rate out 10(poor-good)" 
                  {...register('rating')} 
                />
              </div>
              <div>
                <button type="submit" className='submit-btnContact'>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
