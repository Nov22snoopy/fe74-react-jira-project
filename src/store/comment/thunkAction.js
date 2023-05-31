import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentService } from "../../service/Comment.Service";

// get all comment 
export const getAllComment = createAsyncThunk(
  'CommentService/getAllComment',
  async(query, {rejectWithValue})=>{
    try {
      const res = await CommentService.getAllComment(query);
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// insert comment
export const insertComment = createAsyncThunk(
  'CommentService/insertComment',
  async(payload,{rejectWithValue})=>{
    try {
      const res = await CommentService.insertComment(payload)
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//delete comment
export const deleteComment = createAsyncThunk(
  'CommentService/deleteComment',
  async(query, {rejectWithValue})=>{
    try {
      const res = await CommentService.deleteComment(query)
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//edit comment
export const editComment = createAsyncThunk(
  'CommentService/editComment',
  async(payload,{rejectWithValue})=>{
    try {
      const res = await CommentService.editComment(payload.id,payload.contentComment)
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)