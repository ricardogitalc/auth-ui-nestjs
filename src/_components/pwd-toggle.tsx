import { Eye, EyeOff } from "lucide-react";

interface PasswordToggleProps {
  showPasswords: boolean;
  onClick: () => void;
  className?: string;
}

export const PasswordToggle = ({
  showPasswords,
  onClick,
}: PasswordToggleProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2"
    >
      {showPasswords ? (
        <Eye className="h-5 w-5 text-muted-foreground" />
      ) : (
        <EyeOff className="h-5 w-5 text-muted-foreground" />
      )}
    </button>
  );
};
