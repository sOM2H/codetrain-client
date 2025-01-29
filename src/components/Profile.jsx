import React from "react";
import { useAuth } from '../hooks/AuthProvider';

const Profile = () => {
  const { refreshToken, accessToken, currentUser } = useAuth();

  return (
    <div className="container">
      <header className="jumbotron">
        <div>
          <strong> Profile </strong>
          <p>Access token: {accessToken}</p>
          <p>Refresh token: {refreshToken}</p>
          <p>Login: {currentUser?.login}</p>
          <p>Full Name: {currentUser?.full_name}</p>
          <p>Roles: {currentUser?.role}</p>
          <p>Organization: {currentUser?.organization.name}</p>
        </div>
      </header>
    </div>
  );
};

export default Profile;
