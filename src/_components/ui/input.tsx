import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { PasswordToggle } from "../pwd-toggle";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "password";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    if (variant === "password") {
      return (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "block w-full rounded-md bg-input px-3 py-2 text-sm text-text outline outline-1 -outline-offset-1 outline-border placeholder:text-text-foreground focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary",
              className
            )}
            ref={ref}
            {...props}
          />
          <PasswordToggle
            showPasswords={showPassword}
            onClick={() => setShowPassword(!showPassword)}
            className="top-[50%] translate-y-[-50%]"
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "block w-full rounded-md bg-input px-3 py-2 text-sm text-text outline outline-1 -outline-offset-1 outline-border placeholder:text-text-foreground focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary",
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
