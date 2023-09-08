import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ShippingDetails.css";
import { API_BASE } from "../functions/functions";
import axios from "axios";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import Loader2 from "../Loaders/Loader2";

function ShippingDetails() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({});
  const [addNew, setAddnew] = useState(false);
  const [selected, setSelected] = useState({});
  const [proceed, setProceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const data = JSON.parse(localStorage.getItem("profile"));
      const address = JSON.parse(localStorage.getItem("address"));
      if (address) {
        setSelected(address);
        setProceed(true);
      }
      setAddresses(data.addresses);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddressSelect = (address) => {
    setIsLoading(true);
    try {
      localStorage.setItem("address", JSON.stringify(address));
      setSelected(address);
      setProceed(true);
    } catch (error) {
      console.log({ error });
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAddress = async (event) => {
    setIsLoading(true);
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
      console.log({ error });
      toast.error(error);
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);
    const updatedAddresses = addresses.filter((address) => address._id !== _id);

    const localAddress = addresses.filter((address) => address._id === _id);

    if (localAddress[0] && localAddress[0]._id === selected._id) {
      localStorage.removeItem("address");
      toast.warn("Selected address has been removed");
      setProceed(false);
      setSelected({});
    }
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
      console.log({ error });
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader2 content="Setting up address.." />
      ) : (
        <>
          <ProgressBar />
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
                          address === selected ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="selected-address"
                          checked={address._id === selected._id}
                          onChange={() => handleAddressSelect(address)}
                        />
                        <div className="inner-div">
                          <span>{address.name} </span>
                          <span>{address.street} </span>
                          <span>
                            {address.city}, {address.state}, {address.zip},
                            Phone: {address.phone}
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
                <h1
                  style={{
                    textAlign: "center",
                    padding: "10px 0px",
                  }}
                >
                  No address Found
                </h1>
              )}
              <div className="shop-procceed">
                <button
                  onClick={() => setAddnew(!addNew)}
                  className="add-address-button"
                >
                  <FaPlus className="add-icon" />
                  <span>Add New Address</span>
                </button>
                {proceed && (
                  <Link
                    className="add-address-button"
                    to={"/order-confirmation"}
                  >
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
        </>
      )}
    </>
  );
}

export default ShippingDetails;
