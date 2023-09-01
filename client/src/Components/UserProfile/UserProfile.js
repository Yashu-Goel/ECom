import React from "react";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import "./UserProfile.css"; // Import your CSS file here

const UserProfile = () => {
  return (
    <div className="user-profile-app">
      <h1>Account</h1>
      <div className="profile-section">
        <h2>Update Profile:</h2>
        <ProfileForm />
      </div>
      <div className="section-deelimitters"></div>
      <div className="password-section">
        <h2>Change Password:</h2>
        <ChangePasswordForm />
      </div>
      <div className="section-deelimitters"></div>
    </div>
  );
};

export default UserProfile;
