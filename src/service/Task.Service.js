import http from "../constant/api";

export const TaskService = {
  getTaskType: () => http.get(`TaskType/getAll`),
  getPiority: () => http.get(`Priority/getAll`),
  createTask:(payload)=> http.post(`Project/createTask`,payload)
}