import React from "react";
import { useAuth } from '../hooks/AuthProvider';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <header className="jumbotron">
        <div>
          <strong> Profile </strong>
          <p>Login: {currentUser?.login}</p>
          <p>Full Name: {currentUser?.full_name}</p>
          <p>Roles: {currentUser?.roles[0].name}</p>
          <p>Organization: {currentUser?.organization.name}</p>
        </div>
      </header>
    </div>
  );
};

export default Profile;
