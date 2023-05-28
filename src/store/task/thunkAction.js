import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskService } from "../../service/Task.Service";

export const getTaskType = createAsyncThunk(
  'TaskService/getTaskType',
  async(_,{rejectWithValue})=>{
    try {
      const res = await TaskService.getTaskType()
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const getPiority = createAsyncThunk(
  'TaskService/getPiority',
  async(_, {rejectWithValue})=>{
    try {
      const res = await TaskService.getPiority();
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const createTask = createAsyncThunk(
  'TaskService/createTask',
  async(payload, {rejectWithValue})=>{
    try {
      const res = await TaskService.createTask(payload);
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)