import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(user ? user.cart : []);
  const [selectedAddress, setSelectedAddress] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("profile"));
    if (userInfo !== null) setUser(userInfo);
  }, [navigate]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const UserState = () => {
  return useContext(UserContext);
};
export default UserProvider;
