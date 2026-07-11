import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HireForm({ selectedProfileEmail }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        recipient: selectedProfileEmail,
      };

      const response = await axios.post('http://localhost:5000/contact/sendemailtolawyer', formData);
      console.log(response);

      if (response.status === 200) {
        setStatusMessage('✅ Message sent successfully!');
        setStatusType('success');
        reset();
      } else {
        setStatusMessage('❌ Failed to send message.');
        setStatusType('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatusMessage('⚠️ An error occurred while sending the message.');
      setStatusType('error');
    }

    // Optional: Hide message after 5 seconds
    setTimeout(() => {
      setStatusMessage('');
      setStatusType('');
    }, 5000);
  };

  return (
    <div className='contact-main'>
      <div className="container-cnc">
        <div className="content">
          <div className="right-side">
            <div className="topic-text">Send us a message</div>
            <p>If you have any type of queries, you can send us a message from here. It will be a pleasure for our team to help you.</p>

            {/* ✅ Styled Status Message */}
            {statusMessage && (
              <div
                style={{
                  marginBottom: '1rem',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  backgroundColor: statusType === 'success' ? '#d4edda' : '#f8d7da',
                  color: statusType === 'success' ? '#155724' : '#721c24',
                  border: `1px solid ${statusType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                  fontWeight: '500',
                }}
              >
                {statusMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Enter your name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="error">{errors.name.message}</p>}
              </div>

              <div className="input-box">
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Enter a valid email address',
                    },
                  })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>

              <div className="input-box">
                <input
                  type="text"
                  placeholder="Enter your phone no."
                  {...register('contact', {
                    required: 'Phone number is required',
                    minLength: {
                      value: 10,
                      message: 'Phone number must be at least 10 digits',
                    },
                  })}
                />
                {errors.contact && <p className="error">{errors.contact.message}</p>}
              </div>

              <div className="input-box message-box">
                <textarea
                  className="text-field"
                  placeholder="Your message"
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message should be at least 10 characters',
                    },
                  })}
                />
                {errors.message && <p className="error">{errors.message.message}</p>}
              </div>

              <div>
                <button type="submit" className="submit-btnContact">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HireForm;
