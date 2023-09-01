import React, { useState } from "react";
import { UserState } from "../Context/UserProvider";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const { user } = UserState();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    Phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission to update the profile on the server

    //api call for updating the profile details

    toast.success("Profile Updated", { autoClose: 3000 });

    console.log("Profile data submitted:", profileData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="user-profile-label">Name:</label>
        <input
          className="user-profile-input"
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="user-profile-label">Email:</label>
        <input
          className="user-profile-input"
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="user-profile-label">Contact:</label>
        <input
          className="user-profile-input"
          type="text"
          name="contact"
          value={user.Phone}
          onChange={handleChange}
        />
      </div>
      <button className="user-profile-button" type="submit">
        Update Profile
      </button>
    </form>
  );
};

export default ProfileForm;
