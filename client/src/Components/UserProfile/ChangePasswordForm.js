import React, { useState } from "react";
import { UserState } from "../Context/UserProvider";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const { user } = UserState();

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement password change logic
    toast.success("Password Updated", { autoClose: 3000 });
    console.log("Password data submitted:", passwords);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="user-profile-label">Current Password:</label>
        <input
          className="user-profile-input"
          type="password"
          name="currentPassword"
          value={user.currentPassword}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="user-profile-label">New Password:</label>
        <input
          className="user-profile-input"
          type="password"
          name="newPassword"
          value={user.newPassword}
          placeholder="set a new password"
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="user-profile-label">Confirm Password:</label>
        <input
          className="user-profile-input"
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          placeholder="re-enter the password"
          onChange={handleChange}
        />
      </div>
      <button className="user-profile-button" type="submit">
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
