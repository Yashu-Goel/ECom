import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const API_BASE = "http://localhost:5000";

export const addedToCart = async (itemId, count, user, cart, setCart) => {
  if (!user) {
    toast.error("Please login !", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2500,
      className: "toast-message",
    });
    return;
  }
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  var ind = -1;
  if (user !== null) ind = cart.findIndex((element) => element._id === itemId);

  if (ind === -1) {
    const updatedItems = {
      _id: itemId,
      count: count,
    };
    await axios
      .post(API_BASE + "/cart/additem", updatedItems, config)
      .then(function (response) {
        localStorage.setItem("profile", JSON.stringify(response.data));
        setCart([...cart, updatedItems]);
      })
      .catch(function (error) {
        toast.error(`${error}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          className: "toast-message",
        });
        return;
      });
    toast.success("Product added succesfully !!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2500,
      className: "toast-message",
    });
  } else {
    if (count !== cart[ind].count) {
      await axios
        .post(
          API_BASE + "/cart/upitem",
          { _id: cart[ind]._id, count: count },
          config
        )
        .then(function (response) {
          const updatedItem = { ...cart[ind], count: count };
          cart[ind] = updatedItem;
          setCart(cart);
          localStorage.setItem("profile", JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

      toast.info("Cart updated successfully !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
        className: "toast-message",
      });
    } else {
      toast.warning("Product already added in cart!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
        className: "toast-message",
      });
    }
  }
};

export const removeItem = async (
  itemId,
  user,
  cart,
  setCart,
  clearAll = false
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  let updatedItems;
  if (!clearAll) {
    updatedItems = cart.filter((item) => item._id !== itemId);
  } else {
    updatedItems = [];
  }
  await axios
    .post(API_BASE + "/cart/removeItem", { updatedItems }, config)
    .then(function (response) {
      setCart(updatedItems);
      localStorage.setItem("profile", JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
