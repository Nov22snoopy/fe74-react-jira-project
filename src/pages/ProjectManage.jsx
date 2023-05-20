import React from "react";
import ProjectList from "../modules/ProjectList";
import IsLoading from "../modules/IsLoading";
import { useSelector } from "react-redux";

const ProjectManage = () => {
  const { isDeleting } = useSelector((state) => state.ProjectService);
  return (
    <div>
      <div className="p-4 sm:ml-64">
        <h1 className="font-bold text-2xl">Project List:</h1>
        {isDeleting ? <ProjectList /> : <IsLoading />}
      </div>
    </div>
  );
};

export default ProjectManage;
