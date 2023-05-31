import React from "react";
import { useRoutes } from "react-router-dom";
import Register from "../pages/Register";
import LogIn from "../pages/LogIn";
import ProjectLayout from "../layout/ProjectLayout";
import ProjectManage from "../pages/ProjectManage";
import CreateProject from "../modules/projectManagement/CreateProject";
import ProjectDetail from "../pages/ProjectDetail";
import UserInfo from "../pages/UserInfo";

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
          path: '/',
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
        {
          path: '/userInfo',
          element: <UserInfo/>
        }
      ]
    },
  ]);
  return element;
};

export default Router;
