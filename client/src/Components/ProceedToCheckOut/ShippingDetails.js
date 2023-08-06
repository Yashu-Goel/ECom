import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ShippingDetails.css";
import { UserState } from "../Context/UserProvider";
import { API_BASE } from "../functions/functions";
import axios from "axios";

function ShippingDetails() {
  const { selectedAddress, setSelectedAddress } = UserState();

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({});
  const [addNew, setAddnew] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profile"));
    setAddresses(data.addresses);
    setSelectedAddress({});
  }, []);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleAddAddress = async (event) => {
    event.preventDefault();
    const updatedAddresses = [
      ...addresses,
      {
        ...newAddress,
      },
    ];

    try {
      const user = JSON.parse(localStorage.getItem("profile"));
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        API_BASE + "/updateAddress/add",
        updatedAddresses,
        config
      );
      localStorage.setItem("profile", JSON.stringify(data));
      setAddresses(data.addresses);
    } catch (error) {
      return;
    }
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });
    setAddnew(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleEditAddress = (id) => {
  //   console.log("Edit address with ID:", id);
  // };

  const handleDeleteAddress = async (_id) => {
    const updatedAddresses = addresses.filter((address) => address._id !== _id);

    try {
      const user = JSON.parse(localStorage.getItem("profile"));
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        API_BASE + "/updateAddress/add",
        updatedAddresses,
        config
      );
      localStorage.setItem("profile", JSON.stringify(data));
      setAddresses(data.addresses);
    } catch (error) {
      return;
    }
    setSelectedAddress({});
  };
  console.log(selectedAddress)
  return (
    <div className="container-shipping">
      <div className="shipping-page">
        <h2>Shipping Address</h2>
        {addresses.length > 0 ? (
          <>
            <div className="address-list">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className={`address-item ${
                    address === selectedAddress ? "selected" : ""
                  }`}
                  onClick={() => handleAddressSelect(address)}
                >
                  <input
                    type="radio"
                    name="selected-address"
                    checked={address === selectedAddress}
                    onChange={() => handleAddressSelect(address)}
                  />
                  <div className="inner-div">
                    <span>{address.name} </span>
                    <span>{address.street} </span>
                    <span>
                      {address.city}, {address.state}, {address.zip}, Phone:{" "}
                      {address.phone}
                    </span>
                  </div>
                  <div className="address-item-actions">
                    <button
                      className="address-item-edit"
                      // onClick={() => handleEditAddress(address._id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="address-item-delete"
                      onClick={() => {
                        handleDeleteAddress(address._id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h1>No address Found</h1>
        )}
        <div className="shop-procceed">
          <button
            onClick={() => setAddnew(!addNew)}
            className="add-address-button"
          >
            <FaPlus className="add-icon" />
            <span>Add New Address</span>
          </button>
          {!selectedAddress ? (
            <></>
          ) : (
            <Link className="add-address-button" to={"/order-confirmation"}>
              <span>Proceed</span>&nbsp;
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          )}
        </div>

        {addNew && (
          <div className="add-address-form">
            <h3>Add New Address</h3>
            <form onSubmit={handleAddAddress}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newAddress.name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                name="street"
                value={newAddress.street}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={newAddress.state}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="zip">ZIP:</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={newAddress.zip}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={newAddress.phone}
                onChange={handleInputChange}
                required
              />

              <button type="submit">Save Address</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShippingDetails;
