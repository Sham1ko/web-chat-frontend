import { LucideIcon } from "lucide-react";

export type NavItemPropsType = {
  isCollapsed: boolean;
  link: {
    title: string;
    label?: string;
    linkTo: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
  };
  index: number;
};
