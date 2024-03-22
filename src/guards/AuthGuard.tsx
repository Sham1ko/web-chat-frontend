import useAuth from "@/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { isAuthenticated, loadingUserData } = useAuth();

  if (loadingUserData) {
    // return <LoadingScreen />;
    return <>loading</>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}
