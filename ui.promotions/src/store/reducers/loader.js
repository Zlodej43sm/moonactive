// node modules
import { createReducer } from "@reduxjs/toolkit";

// local files
import { SET_LOADER, UPDATE_LOADER } from "../types";

const initialState = {
  active: false,
  message: []
};

export const loader = createReducer(initialState, {
  [SET_LOADER]: (state, action) => {
    const {
      payload: { type, message }
    } = action;
    const newState = {
      ...state,
      type,
      message: [...state.message, { message, key: new Date().getTime() }]
    };
    return newState;
  },
  [UPDATE_LOADER]: (state) => ({
    ...state,
    message: state.message.slice(1)
  })
});
