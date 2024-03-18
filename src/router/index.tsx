import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AuthLayout from "@/layouts/Auth";
import LandingLayout from "@/layouts/Landing";
import ChatPage from "@/pages/Chat";
import DashboardLayout from "@/layouts/dashboard";

export default function Router() {
  const allRoutes = [
    {
      path: "/landing",
      element: <LandingLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          element: <Navigate to="/auth/login" replace />,
          index: true,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <ChatPage />,
        },
      ],
    },
  ];

  return useRoutes(allRoutes);
}
