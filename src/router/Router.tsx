import { Navigate, useRoutes } from "react-router-dom";
import AuthLayout from "@/layouts/Auth";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ChatPage from "@/pages/chat";
import { AuthGuard, GuestGuard } from "@/guards";
import BaseLayout from "@/layouts/Base";
import EmptyPage from "@/pages/chat/empty";

export default function Router() {
  const allRoutes = [
    {
      path: "/auth",
      element: (
        <GuestGuard>
          <AuthLayout />
        </GuestGuard>
      ),
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
      element: <BaseLayout />,
      children: [
        {
          index: true,
          element: (
            <AuthGuard>
              <EmptyPage />
            </AuthGuard>
          ),
        },
        {
          path: "chat",
          element: (
            <AuthGuard>
              <ChatPage />
            </AuthGuard>
          ),
        },
      ],
    },
  ];

  return useRoutes(allRoutes);
}
