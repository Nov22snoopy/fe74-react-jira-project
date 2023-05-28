import React from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProjectDetail } from "../store/project/thunkAction";
import TaskFilter from "../modules/taskManagement/TaskFilter";
import TaskList from "../modules/taskManagement/TaskList";
import { openModalAction } from "../store/taskModal/slice";
import CreateTask from "../modules/taskManagement/CreateTask";
import IsLoading from "../modules/projectManagement/IsLoading";
import EditTask from "../modules/taskManagement/EditTask";

const ProjectDetail = () => {
  const param = useParams();
  const { projectDetail } = useSelector((state) => state.ProjectService);
  const { isLoading } = useSelector((state) => state.TaskService);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectDetail(param.id));
  }, [dispatch, param.id]);
  const user = JSON.parse(localStorage.getItem("user"))?.name;
  return (
    <div>
      <div className="p-4 sm:ml-64">
        <Breadcrumb
          items={[
            {
              title: "Project",
            },
            {
              title: `${user}`,
            },
            {
              title: projectDetail?.projectName,
            },
          ]}
        />
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Cyber Broad</h1>
          <button
            className="btn btn-primary h-1/2 rounded-full"
            onClick={() => {
              dispatch(openModalAction.openModal());
            }}
          >
            + Create task
          </button>
        </div>
        <TaskFilter projectDetail={projectDetail} />
        {""}
        <br />
        {isLoading? <TaskList projectDetail={projectDetail} /> : <IsLoading/>}
        <CreateTask projectDetail={projectDetail} />
      </div>
    </div>
  );
};

export default ProjectDetail;
