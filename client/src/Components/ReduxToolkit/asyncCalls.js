import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "../functions/functions";

export const fetchInitialState = createAsyncThunk(
  "cart/fetchInitialState",
  async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("profile"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(API_BASE + "/user/userid", config);

      return { user: data, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  }
);
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ itemId, count }, { getState }) => {
    try {
      const token = getState().carts.user?.token;
      if (!getState().carts.user || !token) {
        return "Please login !!";
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        API_BASE + "/cart/additem",
        { itemId, count },
        config
      );
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteItemAsync = createAsyncThunk(
  "cart/deleteFromCart",
  async (params, { getState }) => {
    try {
      const token = getState().carts.user?.token;
      if (!getState().carts.user || !token) {
        return "Please login !!";
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        API_BASE + "/cart/removeItem",
        params,
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);
