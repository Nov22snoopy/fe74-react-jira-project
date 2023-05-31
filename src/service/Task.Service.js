import http from "../constant/api";

export const TaskService = {
  getTaskType: () => http.get(`TaskType/getAll`),
  getPiority: () => http.get(`Priority/getAll`),
  getStatus: () => http.get(`Status/getAll`),
  createTask: (payload) => http.post(`Project/createTask`, payload),
  getTaskDetail: (query) => http.get(`Project/getTaskDetail?taskId=${query}`),
  editStatus: (payload) => http.put(`Project/updateStatus`, payload),
  editPiority: (payload) => http.put(`Project/updatePriority`, payload),
  removeTask: (query) => http.delete(`Project/removeTask?taskId=${query}`),
  assignUserTask:(payload)=>http.post(`Project/assignUserTask`,payload),
  removeUserTask:(payload)=>http.post(`Project/removeUserFromTask`,payload),
  editDescription: (payload) =>http.put(`Project/updateDescription`,payload),
  editEstimate: (payload) => http.put(`Project/updateEstimate`, payload),
  editTimeTracking: (payload) => http.put(`Project/updateTimeTracking`, payload),
};
