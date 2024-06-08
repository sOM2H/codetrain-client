import React from "react";
import { useAuth } from '../hooks/AuthProvider';

const Profile = () => {
  const currentUser = useAuth();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong> Profile </strong>
          <h2>Token: {currentUser?.token}</h2>
          <h2>Email: {currentUser?.data?.email}</h2>
        </h3>
      </header>
    </div>
  );
};

export default Profile;
