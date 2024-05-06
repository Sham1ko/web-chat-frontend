import { LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks";
import { Button } from "../ui/button";
import { SideBarPropsType } from "./types";
import NavItem from "./NavItem";

export default function SideBar({ links, isCollapsed }: SideBarPropsType) {
  const { signOut } = useAuth();
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          return <NavItem isCollapsed={isCollapsed} link={link} key={index} />;
        })}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Sign Out</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Sign Out</TooltipContent>
        </Tooltip>
      </nav>
    </div>
  );
}
