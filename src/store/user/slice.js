import { createSlice } from "@reduxjs/toolkit";
import { getALLUser, getUser, login } from "./thunkAction";
const initialState = {
  user: undefined,
  allUser: null,
  searchUser: null
};
export const { reducer: UserServiceReducer, actions: UserServiceActions } =
  createSlice({
    name: "UserService",
    initialState,
    reducers: {
      signOout: (state, action) => {
        localStorage.removeItem("user");
        state.user = undefined;
      },
      getUser: (state, action) => {
        const data = localStorage.getItem("user");
        if (data) {
          state.user = JSON.parse(data);
        }
      },
    },

    extraReducers: (builder) => {
      builder
        .addCase(login.fulfilled, (state, action) => {
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        })
        .addCase(getUser.fulfilled,(state,action)=>{
          state.searchUser = action.payload
        })
        .addCase(getALLUser.fulfilled,(state, action)=>{
          state.allUser =action.payload.slice(500)
        })
    },
  });
