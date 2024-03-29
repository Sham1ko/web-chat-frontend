import { ComponentType, ReactNode, Suspense } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import AuthLayout from "@/layouts/Auth";
import LandingLayout from "@/layouts/Landing";
import DashboardLayout from "@/layouts/dashboard";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Home from "@/pages/Home";
import ChatPage from "@/pages/chat";
import { AuthGuard, GuestGuard } from "@/guards";

// const Loadable = (Component: ComponentType) => (props: any) => {
//   const { pathname } = useLocation();
//   return (
//     <Suspense
//       fallback={<LoadingScreen isDashboard={pathname.includes("/vehicles")} />}
//     >
//       <Component {...props} />
//     </Suspense>
//   );
// };

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
      element: <DashboardLayout />,
      children: [
        {
          index: true,
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
