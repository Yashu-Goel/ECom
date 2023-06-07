import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("Allen Benny");
  const [cart, setCart] = useState([
    { id: "sasafdfdfvsf5246fe", cnt: 5 },
    { id: "sasafdfdfvsf52juhgjuh46fe", cnt: 2 },
    { id: "sasafdfdfvskjsjn6fe", cnt: 1 },
    { id: "8954223698855415Ghu", cnt: 5 },
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
