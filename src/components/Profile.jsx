import React, { useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong> Profile </strong>
          <h3>Email: {currentUser.email}</h3>
        </h3>
      </header>
    </div>
  );
};

export default Profile;
