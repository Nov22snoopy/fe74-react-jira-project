import { createSlice } from "@reduxjs/toolkit";
import { login } from "./thunkAction";
const initialState = {
  user: undefined,
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
      builder.addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      });
    },
  });
