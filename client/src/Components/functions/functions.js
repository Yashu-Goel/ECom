import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const API_BASE = "http://localhost:5000";

export const addedToCart = async (itemId, count, user) => {
  const data = JSON.parse(localStorage.getItem("profile"));

  if (data === null) {
    toast.error("Please login !", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2500,
      className: "toast-message",
    });
    return;
  }
  const config = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  var ind = -1;
  if (data !== null)
    ind = data.cart.findIndex((element) => element.product_id === itemId);
  if (ind === -1) {
    const updatedItems = {
      product_id: itemId,
      count: count,
    };

    axios
      .post(API_BASE + "/edit/additem", { updatedItems }, config)
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("profile", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    toast.success("Product added succesfully !!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2500,
      className: "toast-message",
    });
  } else {
    if (count !== data.cart[ind].count) {
      axios
        .post(
          API_BASE + "/edit/upitem",
          { product_id: data.cart[ind].product_id, count: count },
          config
        )
        .then(function (response) {
          console.log(response);
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

export const removeItem = (itemId, user) => {
  const data = JSON.parse(localStorage.getItem("profile"));

  const config = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };

  const updatedItems = data.cart.filter((item) => item.id !== itemId);
  axios
    .post(API_BASE + "/edit/removeItem", { updatedItems }, config)
    .then(function (response) {
      console.log(response);
      localStorage.setItem("profile", JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
