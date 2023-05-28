import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetail } from "../../store/project/thunkAction";
import { openModalAction } from "../../store/taskModal/slice";
import EditTask from "./EditTask";

const TaskList = (props) => {
  const {projectDetail} = useSelector((state)=> state.ProjectService)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProjectDetail(props.projectDetail?.id))
  },[dispatch,props.projectDetail?.id])
  console.log(projectDetail);
  return (
    <div className="main-broad flex  ">
      {projectDetail?.lstTask.map((item) => {
        return (
          <div
            key={item.statusId}
            className="w-[25%] mr-2 p-2 bg-gray-100 min-h-[300px] h-auto rounded-md shadow-md"
          >
            <h1>{item.statusName}</h1>
            <div>
              {item?.lstTaskDeTail.map((task, i) => {
                return (
                  <div
                    key={i}
                    className=" bg-sky-50 hover:bg-sky-100 task-item bg-x mt-2 rounded-md p-1 hover:shadow-lg  transition-all cursor-pointer"
                    onClick={()=>{dispatch(openModalAction.openEditTask())}}
                  >
                    {task.description} <br /> <br />{" "}
                    {task.priorityTask.priority}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <EditTask/>
    </div>
  );
};

export default TaskList;
