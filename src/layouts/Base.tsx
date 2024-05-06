import { FC, useContext } from "react";
import Nav from "@/components/nav";
import RecentChats from "@/components/RecentChats";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Inbox,
  Send,
  ArchiveX,
  File,
  Search,
  MessagesSquare,
  MessageCircleMore,
  CircleUserIcon,
  SettingsIcon,
  MoonIcon,
} from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "@/components/SideBar";
import { NavLinkPropsType } from "@/components/SideBar/types";
import ModalContext from "@/contexts/ModalContext";

const BaseLayout: FC = () => {
  const defaultCollapsed = false;
  const defaultLayout = [20, 40, 40];
  const navCollapsedSize = 4;
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const { openModal } = useContext(ModalContext);

  const Links: NavLinkPropsType[] = [
    {
      title: "Conversations",
      label: "9",
      linkTo: "/",
      icon: MessagesSquare,
      variant: "default",
    },
    {
      title: "Contacts",
      label: "",
      linkTo: "#",
      icon: CircleUserIcon,
      variant: "ghost",
      isButton: true,
      onClick: () => {
        openModal(true);
      },
    },
    {
      title: "Settings",
      label: "",
      linkTo: "/settings",
      icon: SettingsIcon,
      variant: "ghost",
    },
    {
      title: "Dark Mode",
      label: "",
      linkTo: "/dark-mode",
      icon: MoonIcon,
      variant: "ghost",
    },
  ];

  return (
    <>
      <TooltipProvider>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;
          }}
          className="h-screen items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                true
              )}`;
            }}
            onExpand={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                false
              )}`;
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] transition-all duration-300 ease-in-out"
            )}
          >
            <div
              className={cn(
                "flex h-[60px] items-center justify-center",
                isCollapsed ? "" : "px-2"
              )}
            >
              {isCollapsed ? (
                <MessagesSquare size="40px" strokeWidth="2.25px" />
              ) : (
                <>
                  <MessagesSquare size="40px" strokeWidth="2.25px" />{" "}
                  <span className="ml-2">
                    <span className="font-bold">Chat</span> Platform
                  </span>
                </>
              )}
            </div>
            <Separator />
            <SideBar links={Links} isCollapsed={isCollapsed} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={defaultLayout[1]}
            minSize={30}
            className="h-screen"
          >
            <div className="flex h-[60px] items-center px-4 py-2">
              <MessageCircleMore />
              <h1 className="text-xl font-bold ml-1">Chats</h1>
            </div>
            <Separator />
            <div className="p-4">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <RecentChats />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[2]}>
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </>
  );
};

export default BaseLayout;
