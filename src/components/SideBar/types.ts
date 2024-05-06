import { LucideIcon } from "lucide-react";

export type NavItemPropsType = {
  isCollapsed: boolean;
  link: NavLinkPropsType;
};

export type NavLinkPropsType = {
  title: string;
  label?: string;
  linkTo: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  isButton?: boolean;
  onClick?: () => void;
};

export type SideBarPropsType = {
  isCollapsed: boolean;
  links: NavLinkPropsType[];
};
