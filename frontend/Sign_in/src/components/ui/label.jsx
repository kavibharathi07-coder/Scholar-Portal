import React from "react";

export const Label = React.forwardRef(
  ({ className = "", ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`
          text-sm
          font-medium
          leading-none
          text-slate-900
          ${className}
        `}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";