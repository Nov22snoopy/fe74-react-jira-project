import { configureStore } from "@reduxjs/toolkit";
import { UserServiceReducer } from "./user/slice";

export const store = configureStore({
  reducer:{
    UserService: UserServiceReducer,
  },
})