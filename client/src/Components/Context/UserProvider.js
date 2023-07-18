import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Allen Benny",
    email: "allenbenny@gmail.com",
    Phone: "9354549047",
    currentPassword:"allen123@"
  });
  const [cart, setCart] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  // selectedAddress will be the default user addresss

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("profile"));
    setUser(userInfo);

    // if (!userInfo) {
    //   navigate("/auth");
    // }
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
