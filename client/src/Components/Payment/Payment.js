import React from "react";
import { UserState } from "../Context/UserProvider";

const Payment = () => {
  const { user, setUser, cart, setCart, selectedAddress, setSelectedAddress } =
    UserState();
    
    console.log(cart);
  return <div>Payment Page</div>;
};

export default Payment;
