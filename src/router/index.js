import React from "react";
import { useRoutes } from "react-router-dom";
import LoginLayout from "../layout/LoginLayout";
import Register from "../pages/Register";
import LogIn from "../pages/LogIn";
import ProjectLayout from "../layout/ProjectLayout";

const Router = () => {
  const element = useRoutes([
    {
      children: [
        {
          path: "/",
          element: <LoginLayout />,
          children: [
            {
              path: "/",
              element: <LogIn />,
            },
            {
              path: "/register",
              element: <Register />,
            },
            {
              path: "/home",
              element: <ProjectLayout/>,
            },
          ],
        },
       
      ],
    },
  ]);
  return element;
};

export default Router;
