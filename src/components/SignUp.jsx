import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import GoogleLoginButton from './GoogleLoginButton';

import { AuthContext } from '../contexts/AuthContext';

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/auth', data);

      login(response.data.data, response.headers['access-token']);

      setErrorMessage(null);
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      setErrorMessage('This email address has been already taken by another user');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="form-control"
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password_confirmation">Password Confirmation:</label>
          <input
            className="form-control"
            id="password_confirmation"
            type="password"
            {...register('password_confirmation', { required: 'Password confirmation is required' })}
          />
          {errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}
        </div>

        {loading ? (
          <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">Sign Up</button>
        )}
        <GoogleLoginButton />
      </form>
    </div>
  );
}

export default SignUp;
