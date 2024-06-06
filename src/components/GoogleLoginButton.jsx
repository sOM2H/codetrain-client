import React, { useContext } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLoginSuccess = async (response) => {
    const googleData = response.credential;
    try {
      const result = await axios.post('http://localhost:3000/auth/google_oauth2/callback', {}, {
        headers: {
          Authorization: `Bearer ${googleData}`,
        },
      });

      login(result.data.data, result.headers['access-token']);
      navigate('/profile');
    } catch (error) {
      console.error('Google login failed', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Google login failed', error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;