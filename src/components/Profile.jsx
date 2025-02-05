import React from "react";
import { useOutletContext } from "react-router-dom";


const Profile = () => {
  const { currentUser } = useOutletContext();

  return (
    <div className="container">
      <header className="jumbotron">
        <div>
          <strong> Profile </strong>
          <p>Login: {currentUser?.login}</p>
          <p>Full Name: {currentUser?.full_name}</p>
          <p>Role: {currentUser?.role}</p>
          <p>Organization: {currentUser?.organization.name}</p>
        </div>
      </header>
    </div>
  );
};

export default Profile;
