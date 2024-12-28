import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "block w-full rounded-md bg-input px-3 py-1.5 text-base text-text outline outline-1 -outline-offset-1 outline-border placeholder:text-text-foreground focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
