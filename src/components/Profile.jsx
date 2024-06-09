import React from "react";
import { useAuth } from '../hooks/AuthProvider';

const Profile = () => {
  const currentUser = useAuth();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong> Profile </strong>
          Token: {currentUser?.token}
          Email: {currentUser?.email}
        </h3>
      </header>
    </div>
  );
};

export default Profile;
