import { LucideIcon } from "lucide-react";

export type NavBarLinkType = {
  title: string;
  label: string;
  linkTo: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
};
