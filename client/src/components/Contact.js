import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './contact.css';
import Navbar from './Navbar';
import Footer from './Footer';

function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/message/send-message', data);
      console.log(response);
      

      if (response.status === 200) {
        setStatusMessage('Message sent successfully!');
        setStatusType('success');
        reset();
      } else {
        setStatusMessage('Failed to send message.');
        setStatusType('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatusMessage('An error occurred while sending the message.');
      setStatusType('error');
    }
  };

  return (
    <>
      <Navbar />
      <div className='contact-main'>
        <div className="container-cnc">
          <div className="content">
            <div className="left-side">
              <div className="address details">
                <i className="fas fa-map-marker-alt"></i>
                <div className="topic">Address</div>
                <div className="text-one">NFC IET university khanewal road, Multan</div>
                <div className="text-two">Multan</div>
              </div>
              <div className="phone details">
                <i className="fas fa-phone-alt"></i>
                <div className="topic">Phone</div>
                <div className="text-one">+923434018761</div>
                {/* <div className="text-two">+923357439192</div> */}
              </div>
              <div className="email details">
                <i className="fas fa-envelope"></i>
                <div className="topic">Email</div>
                <div className="text-one">hasnainqurban284@gmail.com</div>
                {/* <div className="text-two">sarmadahmadkhan2@gmail.com</div> */}
              </div>
            </div>

            <div className="right-side">
              <div className="topic-text">Send us a message</div>
              <p>If you have any type of queries, you can send us a message from here.</p>

              {/* Status Message */}
              {statusMessage && (
                <div className={`status-message ${statusType}`}>
                  {statusMessage}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Enter name"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                <div className="input-box">
                  <input
                    type="email"
                    placeholder="Enter email"
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
                    placeholder="Enter phone"
                    {...register('phone', {
                      required: 'Phone is required',
                      minLength: {
                        value: 10,
                        message: 'Phone number must be at least 10 digits',
                      },
                    })}
                  />
                  {errors.phone && <p className="error">{errors.phone.message}</p>}
                </div>

                <div className="input-box message-box">
                  <textarea
                    className='text-field'
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
                  <button type="submit" className="submit-btnContact">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
