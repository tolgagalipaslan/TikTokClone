import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const hasUser =
  JSON.parse(localStorage.getItem("user")) === null
    ? {}
    : JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: hasUser,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      localStorage.removeItem("user");
    },
    createOrGetUser: (state, action) => {
      const decode = jwt_decode(action.payload.credential);
      const newUser = {
        name: decode.name,
        picture: decode.picture,
        sub: decode.sub,
      };
      state.user = newUser;
      localStorage.setItem("user", JSON.stringify(newUser));
    },
  },
});

// Action creators are generated for each case reducer function
export const {logout,  createOrGetUser } = authSlice.actions;

export default authSlice.reducer;