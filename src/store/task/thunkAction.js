import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskService } from "../../service/Task.Service";
import { message } from "antd";
//get task type
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
//get piority
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

//get task status
export const getStatus = createAsyncThunk(
  'TaskService/getStatus',
  async (_,{rejectWithValue})=>{
    try {
      const res = await TaskService.getStatus()
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)


//create task
export const createTask = createAsyncThunk(
  'TaskService/createTask',
  async(payload, {rejectWithValue})=>{
    console.log(payload);
    try {
      const res = await TaskService.createTask(payload);
      if(res.data.statusCode === 200) {
        message.success(res.data.message)
      }
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//get task detail
export const getTaskDetail = createAsyncThunk(
  'TaskService/getTaskDetail',
  async(payload,{rejectWithValue})=>{
    try {
      const res = await TaskService.getTaskDetail(payload)
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
// edit task status
export const editStatus = createAsyncThunk(
  'TaskService/editStatus',
  async(payload, {rejectWithValue})=>{
    try {
      const res = await TaskService.editStatus(payload)
      if(res.data.statusCode === 200) {
        message.success('Update task status successfully')
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);
// edit piority
export const editPriority = createAsyncThunk(
  'TaskService/editPiority',
  async(payload,{rejectWithValue})=>{
    try {
      const res = TaskService.editPiority(payload)
      if(res.data.statusCode === 200) {
        message.success('Update task priority successfully')
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//assign user to task
export const assignUserTask = createAsyncThunk(
  'TaskService/assignUserTask',
  async(payload ,{rejectWithValue})=>{
    try {
      const res = await TaskService.assignUserTask(payload)
      if(res.data.statusCode === 200) {
        message.success('Assign user to task successfully')
      }
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//remove user from task
export const removeUserTask = createAsyncThunk(
  'TaskService',
  async(payload, {rejectWithValue})=>{
    try {
      const res = await TaskService.removeUserTask(payload);
      if(res.data.statusCode === 200) {
        message.success('Remove user from task successfully')
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//edit task description 
export const editDescription = createAsyncThunk(
  'TaskService/editDescription',
  async(payload,{rejectWithValue})=>{
    try {
      const res = await TaskService.editDescription(payload)
      if(res.data.statusCode === 200) {
        message.success('Update task description successfully')
      }
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//edit original estimate
export const editEstimate = createAsyncThunk(
  'TaskService/editEstimate',
  async(payload, {rejectWithValue})=>{
    try {
      const res = await TaskService.editEstimate(payload)
      if(res.data.statusCode === 200) {
        message.success('Update task estimate successfully')
      }
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//edit task time tracking
export const editTimeTracking = createAsyncThunk(
  'TaskService/editTimeTracking',
  async(payload,{rejectWithValue})=>{
    try {
      const res = await TaskService.editTimeTracking(payload)
      if(res.data.statusCode === 200) {
        message.success('Update task time tracking successfully')
      }
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// remove task
export const removeTask = createAsyncThunk(
  'TaskService/removeTask',
  async(payload, {rejectWithValue})=>{
    try {
      const res = await TaskService.removeTask(payload)
      if(res.data.statusCode === 200) {
        message.success('remove task successfully')
      }
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)