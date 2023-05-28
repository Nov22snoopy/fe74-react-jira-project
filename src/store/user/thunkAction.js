import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../service/User.service";

export const login = createAsyncThunk(
  "UserService/login",
  async(payload, {rejectWithValue}) =>{
    try {
      const res = await UserService.login(payload)
      if (res.data.statusCode === 200){
        return res.data.content
      }
    } catch (error) {
      return rejectWithValue(error)  
    }
  }
)
export const getUser = createAsyncThunk(
  "UserService/getUser",
  async(query,{rejectWithValue})=>{
    try {
      const res = await UserService.getUser(query);
      return res.data.content
    } catch (error) {
      return rejectWithValue(error) 
    }
  }
)
export const getALLUser = createAsyncThunk(
  "UserService/getAllUser",
  async(_,{rejectWithValue})=>{
    try {
      const res = await UserService.getAllUser();
      return res.data.content
    } catch (error) {
      return rejectWithValue(error) 
    }
  }
)