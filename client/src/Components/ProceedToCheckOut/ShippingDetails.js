import React, { useState } from "react";
import "./ShippingDetails.css";
import { UserState } from "../Context/UserProvider";

const ShippingDetails = () => {
  //default or selected address for checout purposes
  const { selectedAddress, setSelectedAddress } = UserState();

  //below is the all address saved in the user Schemea
  const [addresses, setAddresses] = useState([
    {
      name: "John Doe",
      houseNo: "123",
      street: "Main St",
      landmark: "Near Park",
      pincode: "12345",
      country: "USA",
      state: "California",
      phone: "123-456-7890",
    },
    {
      name: "John Doe",
      houseNo: "123",
      street: "Main St",
      landmark: "Near Park",
      pincode: "12345",
      country: "USA",
      state: "California",
      phone: "123-456-7890",
    },
    {
      name: "John Doe",
      houseNo: "123",
      street: "Main St",
      landmark: "Near Park",
      pincode: "12345",
      country: "USA",
      state: "California",
      phone: "123-456-7890",
    },
    {
      name: "John Doe",
      houseNo: "123",
      street: "Main St",
      landmark: "Near Park",
      pincode: "12345",
      country: "USA",
      state: "California",
      phone: "123-456-7890",
    },
    {
      name: "John Doe",
      houseNo: "123",
      street: "Main St",
      landmark: "Near Park",
      pincode: "12345",
      country: "USA",
      state: "California",
      phone: "123-456-7890",
    },
    {
      name: "John Doe",
      houseNo: "123",
      street: "Main St",
      landmark: "Near Park",
      pincode: "12345",
      country: "USA",
      state: "California",
      phone: "123-456-7890",
    },
  ]);

  //state for adding new addresses
  const { newAddress, setNewAddress } = useState({
    name: "",
    houseNo: "",
    street: "",
    landmark: "",
    pincode: "",
    country: "",
    state: "",
    phone: "",
  });

  // function for selecting new addresses
  const handleAddressChange = (item) => {
    setSelectedAddress(item);
  };

  //function which
  const handleAddAddress = () => {
    //add more addresses
    if (isAddressValid(newAddress)) {
      setAddresses([...addresses, newAddress]);
      setNewAddress({
        name: "",
        houseNo: "",
        street: "",
        landmark: "",
        pincode: "",
        country: "",
        state: "",
        phone: "",
      });
    }
  };

  const isAddressValid = (address) => {
    // Perform validation logic here (e.g., checking if required fields are filled)
    return (
      address.name.trim() !== "" &&
      address.houseNo.trim() !== "" &&
      address.street.trim() !== "" &&
      address.pincode.trim() !== "" &&
      address.country.trim() !== "" &&
      address.state.trim() !== "" &&
      address.phone.trim() !== ""
    );
  };

  return (
    <div className="shipping-details">
      <h2 className="shipping-heading">1. Select a Delivery Address</h2>
      <div className="your-address">
        <h3>Your addresses</h3>
        {addresses.map((item, index) => (
          <div className="address-item" key={index}>
            <p className="address-details"> {item.name} {item.houseNo}{" "}
              {item.street} {item.landmark} {item.state} {item.country}{" "}
              {item.pincode} {item.phone}{" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  //   const renderStepTwo = () => (
  //     <div>
  //       <h2>Add New Shipping Address</h2>
  //       <div className="address-form">
  //         <label htmlFor="name">Name:</label>
  //         <input
  //           type="text"
  //           id="name"
  //           name="name"
  //           value={newAddress.name}
  //           onChange={handleNewAddressChange}
  //         />

  //         <label htmlFor="houseNo">House No/Flat No:</label>
  //         <input
  //           type="text"
  //           id="houseNo"
  //           name="houseNo"
  //           value={newAddress.houseNo}
  //           onChange={handleNewAddressChange}
  //         />

  //         <label htmlFor="street">Street/Area:</label>
  //         <input
  //           type="text"
  //           id="street"
  //           name="street"
  //           value={newAddress.street}
  //           onChange={handleNewAddressChange}
  //         />

  //         <label htmlFor="landmark">Landmark:</label>
  //         <input
  //           type="text"
  //           id="landmark"
  //           name="landmark"
  //           value={newAddress.landmark}
  //           onChange={handleNewAddressChange}
  //         />

  //         <label htmlFor="pincode">Pincode:</label>
  //         <input
  //           type="text"
  //           id="pincode"
  //           name="pincode"
  //           value={newAddress.pincode}
  //           onChange={handleNewAddressChange}
  //         />

  //         <label htmlFor="country">Country:</label>
  //         <input
  //           type="text"
  //           id="country"
  //           name="country"
  //           value={newAddress.country}
  //           onChange={handleNewAddressChange}
  //         />

  //         <label htmlFor="state">State:</label>
  //         <input
  //           type="text"
  //           id="state"
  //           name="state"
  //           value={newAddress.state}
  //           onChange={handleNewAddressChange}
  //         />

  //         <label htmlFor="phone">Phone Number:</label>
  //         <input
  //           type="text"
  //           id="phone"
  //           name="phone"
  //           value={newAddress.phone}
  //           onChange={handleNewAddressChange}
  //         />
  //       </div>
  //       <button onClick={handleAddAddress}>Add Address</button>
  //       <button onClick={handlePrevious}>Previous</button>
  //       <button onClick={handleProceed}>Proceed</button>
  //     </div>
  //   );

  //   const renderStepThree = () => (
  //     <div>
  //       <h2>Review Shipping Details</h2>
  //       <p>Selected Address:</p>
  //       <p>Name: {selectedAddress.name}</p>
  //       <p>House No/Flat No: {selectedAddress.houseNo}</p>
  //       <p>Street/Area: {selectedAddress.street}</p>
  //       <p>Landmark: {selectedAddress.landmark}</p>
  //       <p>Pincode: {selectedAddress.pincode}</p>
  //       <p>Country: {selectedAddress.country}</p>
  //       <p>State: {selectedAddress.state}</p>
  //       <p>Phone Number: {selectedAddress.phone}</p>
  //       <button onClick={handlePrevious}>Previous</button>
  //       <button onClick={handleProceed}>Proceed</button>
  //     </div>
  //   );

  //   return (
  //     <div>
  //       {step === 1 && renderStepOne()}
  //       {step === 2 && renderStepTwo()}
  //       {step === 3 && renderStepThree()}
  //     </div>
  //   );
};

export default ShippingDetails;
