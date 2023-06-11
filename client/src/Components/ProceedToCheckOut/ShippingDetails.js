import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ShippingDetails.css";
import { UserState } from "../Context/UserProvider";

function ShippingDetails() {
  const { user, setUser, cart, setCart, selectedAddress, setSelectedAddress } =
    UserState();

  //the below address will come from the user schema address
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      street: "123 Main St",
      city: "Cityville",
      state: "State",
      zip: "12345",
      phone: 9416510269,
    },
    {
      id: 2,
      name: "Jane Smith",
      street: "456 Elm St",
      city: "Townville",
      state: "State",
      zip: "67890",
      phone: 9354549047,
    },
  ]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const handleAddressSelect = (id) => {
    setSelectedAddress(id);
  };

  const handleAddAddress = (event) => {
    event.preventDefault();
    const updatedAddresses = [
      ...addresses,
      {
        id: addresses.length + 1,
        ...newAddress,
      },
    ];
    setAddresses(updatedAddresses);
    setSelectedAddress(addresses[addresses.length - 1].id);
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleEditAddress = (id) => {
    // Implement the logic to handle editing the address
    console.log("Edit address with ID:", id);
  };

  const handleDeleteAddress = (id) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(updatedAddresses);
    //code for backend also should be implemneted
    if (selectedAddress === id) {
      setSelectedAddress(null);
    }
  };
  return (
    <div className="container">
      <div className="shipping-page">
        <h2>Shipping Address</h2>
        <div className="address-list">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`address-item ${
                address.id === selectedAddress ? "selected" : ""
              }`}
              onClick={() => handleAddressSelect(address.id)}
            >
              <input
                type="radio"
                name="selected-address"
                checked={address.id === selectedAddress}
                onChange={() => handleAddressSelect(address.id)}
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
                  onClick={() => handleEditAddress(address.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="address-item-delete"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="shop-procceed">
          <button
            onClick={() => setSelectedAddress(null)}
            className="add-address-button"
          >
            <FaPlus className="add-icon" />
            <span>Add New Address</span>
          </button>
          <Link className="add-address-button" to={"/order-confirmation"}>
            <span>Proceed</span>&nbsp; <i class="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        {selectedAddress === null && (
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
