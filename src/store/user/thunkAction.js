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