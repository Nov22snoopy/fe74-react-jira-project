import { configureStore } from "@reduxjs/toolkit";
import { UserServiceActions, UserServiceReducer } from "./user/slice";
import {projectServiceReducer } from "./project/slice";
import { openDrawerReducer } from "./drawer/slice";
import { openModalReducer } from "./taskModal/slice";
import { taskServiceReducer } from "./task/slice";

export const store = configureStore({
  reducer:{
    UserService: UserServiceReducer,
    ProjectService: projectServiceReducer,
    OpenDrawer: openDrawerReducer,
    OpenModal: openModalReducer,
    TaskService: taskServiceReducer,
  },
});
store.dispatch(UserServiceActions.getUser())