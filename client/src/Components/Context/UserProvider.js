import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("profile"));
        if (userInfo !== null) {
          setUser(userInfo);
          setCart(userInfo.cart);
        }
      } catch (error) {
        console.error(error);
        // toast.error("");
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
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
