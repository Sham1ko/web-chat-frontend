import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Link } from "react-router-dom";
import { NavItemPropsType } from "../types";

export default function NavItem({ isCollapsed, link }: NavItemPropsType) {
  const iconSize = isCollapsed ? "icon" : "sm";
  const iconClassNames = cn(
    buttonVariants({ variant: link.variant, size: iconSize }),
    link.variant === "default" &&
      "dark:bg-muted dark:hover:bg-muted dark:hover:text-white",
    isCollapsed ? "h-9 w-9" : "justify-start"
  );
  const labelClassNames = cn(
    "ml-auto",
    link.variant === "default" && "text-background dark:text-white"
  );

  const linkProps = link.isButton
    ? { role: "button", onClick: link.onClick }
    : {};

  return (
    <Tooltip delayDuration={isCollapsed ? 0 : undefined}>
      <TooltipTrigger asChild>
        <Link
          to={isCollapsed ? link.linkTo : "#"}
          className={iconClassNames}
          {...linkProps}
        >
          <link.icon className={isCollapsed ? "h-4 w-4" : "mr-2 h-4 w-4"} />
          {!isCollapsed && link.title}
          {link.label && !isCollapsed && (
            <span className={labelClassNames}>{link.label}</span>
          )}
        </Link>
      </TooltipTrigger>
      {!isCollapsed && (
        <TooltipContent side="right" className="flex items-center gap-4">
          {link.title}
          {link.label && (
            <span className="ml-auto text-muted-foreground">{link.label}</span>
          )}
        </TooltipContent>
      )}
    </Tooltip>
  );
}
