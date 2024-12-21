import type { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface GoogleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

export const GoogleInput = ({ icon: Icon, ...props }: GoogleInputProps) => {
  return (
    <div className="relative mt-2">
      {Icon && (
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10"
          strokeWidth={2.3}
        />
      )}
      <input
        {...props}
        className={`peer rounded-md w-full px-4 py-3 text-sm text-foreground border-border border
               focus:bg-background bg-background
               [&:-webkit-autofill]:!bg-background [&:-webkit-autofill]:!bg-clip-text
               placeholder-transparent ${Icon ? "pl-10" : ""}`}
      />
      <label
        htmlFor={props?.id}
        className={`absolute left-2 -top-2.5 px-1 text-sm transition-all bg-background rounded 
               text-muted-foreground peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground 
               peer-placeholder-shown:top-3 ${
                 Icon
                   ? "peer-placeholder-shown:left-10"
                   : "peer-placeholder-shown:left-4"
               }
               peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-primary 
               peer-focus:bg-background peer-focus:font-semibold z-20`}
      >
        {props?.placeholder}
      </label>
    </div>
  );
};
