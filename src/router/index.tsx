import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AuthLayout from "@/layouts/Auth";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: (
        <AuthLayout>
          <Login />,
        </AuthLayout>
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
}
