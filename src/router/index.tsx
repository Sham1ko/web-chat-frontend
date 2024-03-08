import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AuthLayout from "@/layouts/Auth";
import LandingLayout from "@/layouts/Landing";

export default function Router() {
  const allRoutes = [
    {
      path: "/",
      element: <LandingLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          element: <Navigate to="/auth/login" replace />,
          index: true,
        },
        {
          path: "/auth/login",
          element: <Login />,
        },
        {
          path: "/auth/register",
          element: <Register />,
        },
      ],
    },
  ];

  return useRoutes(allRoutes);
}
