import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Link } from "react-router-dom";
import { NavItemPropsType } from "./types";

export default function NavItem({
  isCollapsed,
  link,
  index,
}: NavItemPropsType) {
  return isCollapsed ? (
    <Tooltip key={index} delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={link.linkTo}
          className={cn(
            buttonVariants({ variant: link.variant, size: "icon" }),
            "h-9 w-9",
            link.variant === "default" &&
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
          )}
        >
          <link.icon className="h-4 w-4" />
          <span className="sr-only">{link.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {link.title}
        {link.label && (
          <span className="ml-auto text-muted-foreground">{link.label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          key={index}
          to="#"
          className={cn(
            buttonVariants({ variant: link.variant, size: "sm" }),
            link.variant === "default" &&
              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
            "justify-start"
          )}
        >
          <link.icon className="mr-2 h-4 w-4" />
          {link.title}
          {link.label && (
            <span
              className={cn(
                "ml-auto",
                link.variant === "default" && "text-background dark:text-white"
              )}
            >
              {link.label}
            </span>
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent>{link.title}</TooltipContent>
    </Tooltip>
  );
}
