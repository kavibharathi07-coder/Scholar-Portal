import * as React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Alert({
  className,
  variant = "default",
  ...props
}) {
  return (
    <div
      role="alert"
      className={cn(
        "relative grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-0.5 rounded-lg border px-4 py-3 text-sm",
        variant === "default" &&
          "bg-white text-slate-900 border-slate-200",
        variant === "destructive" &&
          "border-red-300 bg-red-50 text-red-900",
        className
      )}
      {...props}
    />
  );
}

function AlertTitle({
  className,
  ...props
}) {
  return (
    <h5
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "col-start-2 text-sm",
        className
      )}
      {...props}
    />
  );
}

export {
  Alert,
  AlertTitle,
  AlertDescription,
};