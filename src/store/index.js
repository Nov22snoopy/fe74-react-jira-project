import { configureStore } from "@reduxjs/toolkit";
import { UserServiceActions, UserServiceReducer } from "./user/slice";
import {projectServiceReducer } from "./project/slice";

export const store = configureStore({
  reducer:{
    UserService: UserServiceReducer,
    ProjectService: projectServiceReducer,
  },
});
store.dispatch(UserServiceActions.getUser())