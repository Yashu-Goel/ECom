import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const customReducer = createReducer(initialState, {
  SET_USER: (state, action) => {
    state.user = action.payload;
  },
});
