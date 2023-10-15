import { createSlice } from "@reduxjs/toolkit";
import {
  fetchInitialState,
  addToCartAsync,
  deleteItemAsync,
} from "./asyncCalls";
import { toast } from "react-toastify";
const initialState = { user: null, error: null, cartUpdating: false };

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action) => {
      return (state += 1);
    },
    decrement: (state, action) => {
      return (state -= 1);
    },
    incrementByAmount: (state, action) => {
      return (state += action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialState.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = action.payload.error;
      })
      .addCase(fetchInitialState.rejected, (state, action) => {
        state.error = "Something went wrong";
      })
      .addCase(addToCartAsync.pending, (state, action) => {
        state.cartUpdating = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const { cart } = action.payload;
        if (cart) {
          toast.success(`${action.payload.message}`, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2500,
            className: "toast-message",
          });
          state.user.cart = cart;
        } else {
          toast.error(`${action.payload}`, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2500,
            className: "toast-message",
          });
        }
        state.cartUpdating = false;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        console.log("line 53", action);
        toast.error(`${action.payload}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          className: "toast-message",
        });
        state.cartUpdating = false;
      })

      .addCase(deleteItemAsync.pending, (state) => {
        state.cartUpdating = true;
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        const { cart } = action.payload;
        if (cart) {
          toast.success(`${action.payload.message}`, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2500,
            className: "toast-message",
          });
          state.user.cart = cart;
        } else {
          toast.error(`${action.payload}`, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2500,
            className: "toast-message",
          });
        }
        state.cartUpdating = false;
      })
      .addCase(deleteItemAsync.rejected, (state, action) => {
        toast.error(`${action.payload}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          className: "toast-message",
        });
        state.cartUpdating = false;
      });
  },
});

export const { increment, decrement, incrementByAmount } = CartSlice.actions;

export default CartSlice.reducer;
