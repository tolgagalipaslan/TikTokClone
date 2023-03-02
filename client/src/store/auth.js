import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import axios from "axios"
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
    },//googleauth
    createOrGetUser: (state, action) => {
      const decode = jwt_decode(action.payload.credential);
      const newUser = {
        name: decode.name,
        picture: decode.picture,
        sub: decode.sub,
      };
      state.user = newUser;
      axios.post(
        `https://${
          import.meta.env.VITE_PROJECT_ID
        }.api.sanity.io/v1/data/mutate/production`,
        {//sanity add user  connection
          mutations: [
            {
              createIfNotExists: {
                _id: decode.sub,
                _type: "user",
                userName: decode.name,
                picture: decode.picture,
                subId: decode.sub,
                follows: [],
                followers: [],
                likes: [],
              },
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SANITY_TOKEN}`,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(newUser));
    },
  },
});

// Action creators are generated for each case reducer function
export const {logout,  createOrGetUser } = authSlice.actions;

export default authSlice.reducer;