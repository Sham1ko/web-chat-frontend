import Nav from "@/components/nav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HomeIcon, LucideIcon } from "lucide-react";

type NavLinks = {
  title: string;
  label?: string;
  linkTo: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
};

export default function Home() {
  const navlinks = [
    {
      title: "Home",
      label: "Home page",
      linkTo: "/",
      icon: HomeIcon,
      variant: "ghost",
    },
    {
      title: "About",
      label: "About page",
      linkTo: "/about",
      icon: HomeIcon,
      variant: "default",
    },
    {
      title: "Contact",
      label: "Contact page",
      linkTo: "/contact",
      icon: HomeIcon,
      variant: "default",
    },
  ];
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}
