import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "right" | "alternate";
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, align = "left", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        data-align={align}
        {...props}
      />
    );
  }
);
Timeline.displayName = "Timeline";

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "left" | "right";
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, position, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex gap-4 pb-8 last:pb-0",
          position === "right" && "flex-row-reverse",
          className
        )}
        data-position={position}
        {...props}
      />
    );
  }
);
TimelineItem.displayName = "TimelineItem";

interface TimelineSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineSeparator = React.forwardRef<HTMLDivElement, TimelineSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center", className)}
        {...props}
      />
    );
  }
);
TimelineSeparator.displayName = "TimelineSeparator";

interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-[2px] bg-border grow", className)}
        {...props}
      />
    );
  }
);
TimelineConnector.displayName = "TimelineConnector";

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 pt-0.5", className)}
        {...props}
      />
    );
  }
);
TimelineContent.displayName = "TimelineContent";

interface TimelineDotProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "filled" | "outlined";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive";
  size?: "small" | "medium" | "large";
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, variant = "filled", color = "primary", size = "medium", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full flex items-center justify-center",
          size === "small" && "w-3 h-3",
          size === "medium" && "w-4 h-4",
          size === "large" && "w-6 h-6",
          variant === "filled" && [
            color === "default" && "bg-muted",
            color === "primary" && "bg-primary",
            color === "secondary" && "bg-secondary",
            color === "success" && "bg-green-500",
            color === "warning" && "bg-yellow-500",
            color === "destructive" && "bg-destructive"
          ],
          variant === "outlined" && [
            "border-2",
            color === "default" && "border-muted",
            color === "primary" && "border-primary",
            color === "secondary" && "border-secondary",
            color === "success" && "border-green-500",
            color === "warning" && "border-yellow-500",
            color === "destructive" && "border-destructive"
          ],
          className
        )}
        data-variant={variant}
        data-color={color}
        {...props}
      />
    );
  }
);
TimelineDot.displayName = "TimelineDot";

export {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
};
