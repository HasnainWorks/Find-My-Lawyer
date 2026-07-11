import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './customerRegistration.css';
import Navbar from './Navbar';
import axios from 'axios';

const CustomerRegistration = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch } = useForm()


  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://find-my-lawyer.onrender.com/client/registerclient',data)
      console.log(response.data);
      navigate('/home')
    } catch (error) {
      console.log(error);
    } 

  };

  return (
    <>
      <div className='customer-register-container'>
        <div className='textLogoContainer'>
          <h1> <span className='logoText'>FindMyLawyer.pk</span>  Customer Registration</h1>
        </div>
        <div className='customer-details-container'>
          <form onSubmit={handleSubmit(onSubmit)} className='form-container-registration-customer'>
            <div className='customer-details-control'>
              <label htmlFor="name">Name </label>
              <input
                type="text"
                name="name"
                {...register('name', { required: 'Name is required' })}
                className='inputControl-customer'
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

            <div className='customer-details-control'>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                {...register('email', { required: 'Email is required' })}
                className='inputControl-customer'
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className='customer-details-control'>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                name="phone"
                {...register('phone', { required: 'Phone number is required' })}
                className='inputControl-customer'
              />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>

            <div className='customer-details-control'>
              <label htmlFor="state">Choose State</label>
              <select
                name="state"
                {...register('state', { required: 'State is required' })}
                className='inputControl-customer'
              >
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="Balochistan">Balochistan</option>
                <option value="Islamabad">Islamabad</option>
              </select>
              {errors.state && <p className="error">{errors.state.message}</p>}
            </div>

            <div className='customer-details-control'>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                {...register('city', { required: 'City is required' })}
                className='inputControl-customer'
              />
              {errors.city && <p className="error">{errors.city.message}</p>}
            </div>

            <div className='customer-details-control'>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                {...register('password', { required: 'Password is required' })}
                className='inputControl-customer'
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>

            <div className='customer-details-control'>
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                {...register('cpassword', {
                  required: 'Confirm Password is required',
                  validate: (value) => value === watch('password') || 'Passwords do not match'
                })}
                className='inputControl-customer'
              />
              {errors.cpassword && <p className="error">{errors.cpassword.message}</p>}
            </div>

            <button type="submit" className='create-customer-account'>Create Account</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerRegistration;
