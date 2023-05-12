import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Register from '../pages/Register'
import LogIn from '../pages/LogIn'
import HomeProject from '../pages/HomeProject'

const Router = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <MainLayout/>,
      children:[
        {
          path: "/home",
          element: <HomeProject/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/login",
          element: <LogIn/>
        }
      ]
    }
  ])
  return (
    element
  )
}

export default Router