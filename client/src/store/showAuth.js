import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  showAuth: false,
};

export const showAuthSlice = createSlice({
  name: "showAuth",
  initialState,
  reducers: {
    show:(state)=>{
        state.showAuth=true
    }
    ,
    hide:(state)=>{
        state.showAuth=false
    },
    toggle: (state) => {
      state.showAuth === true
        ? (state.showAuth = false)
        : (state.showAuth = true);
    },
  
     
    },
  },
);

// Action creators are generated for each case reducer function
export const {show, hide,toggle} = showAuthSlice.actions;

export default showAuthSlice.reducer;