import React from "react";
import { useRoutes } from "react-router-dom";
import Register from "../pages/Register";
import LogIn from "../pages/LogIn";
import ProjectLayout from "../layout/ProjectLayout";
import ProjectManage from "../pages/ProjectManage";
import CreateProject from "../modules/projectManagement/CreateProject";
import ProjectDetail from "../pages/ProjectDetail";

const Router = () => {
  const element = useRoutes([
    {
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <ProjectLayout />,
      children: [
        {
          path: '/projectList',
          element: <ProjectManage/>
        },
        {
          path: '/createProject',
          element: <CreateProject/>
        },
        {
          path: '/projectDetail/:id',
          element: <ProjectDetail/>
        },
      ]
    },
  ]);
  return element;
};

export default Router;
