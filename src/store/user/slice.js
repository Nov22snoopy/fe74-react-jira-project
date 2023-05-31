import { createSlice } from "@reduxjs/toolkit";
import { editUser, getALLUser, getUser, login } from "./thunkAction";
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
        .addCase(login.fulfilled, (state, actions) => {
          state.user = actions.payload;
          localStorage.setItem("user", JSON.stringify(actions.payload));
        })
        .addCase(getUser.fulfilled,(state,actions)=>{
          state.searchUser = actions.payload
        })
        .addCase(getALLUser.fulfilled,(state, actions)=>{
          state.allUser =actions.payload.slice(500)
        })
        .addCase(editUser.fulfilled,(state,actions)=>{
          state.user = actions.payload
          localStorage.setItem("user", JSON.stringify(actions.payload));
        })
    },
  });
