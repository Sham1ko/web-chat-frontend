import Background from "@/components/Background";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <Background />
      <Outlet />
    </>
  );
}
