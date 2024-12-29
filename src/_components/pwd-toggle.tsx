import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordToggleProps {
  showPasswords: boolean;
  onClick: () => void;
  className?: string;
}

export const PasswordToggle = ({
  showPasswords,
  onClick,
  className,
}: PasswordToggleProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("absolute right-3 top-1/2", className)}
    >
      {showPasswords ? (
        <EyeOff className="h-5 w-5 text-muted-foreground" />
      ) : (
        <Eye className="h-5 w-5 text-muted-foreground" />
      )}
    </button>
  );
};
