import { Outlet } from "react-router-dom";
import NavigationBar from "@/components/Navbar";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default function LandingLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}
