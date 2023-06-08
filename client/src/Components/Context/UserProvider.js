import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("Allen Benny");
  const [cart, setCart] = useState([
  ]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("profile"));
    setUser(userInfo);

    // if (!userInfo) {
    //   navigate("/auth");
    // }
  }, [navigate]);

  return (
    <UserContext.Provider
      value={{ user, setUser, cart, setCart, address, setAddress }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const UserState = () => {
  return useContext(UserContext);
};
export default UserProvider;
