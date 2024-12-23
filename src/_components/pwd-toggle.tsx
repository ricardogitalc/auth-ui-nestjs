import { Eye, EyeOff } from "lucide-react";

interface PasswordToggleProps {
  showPasswords: boolean;
  onClick: () => void;
}

export const PasswordToggle = ({
  showPasswords,
  onClick,
}: PasswordToggleProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      {showPasswords ? (
        <EyeOff className="h-5 w-5 text-muted-foreground" strokeWidth={2.3} />
      ) : (
        <Eye className="h-5 w-5 text-muted-foreground" strokeWidth={2.3} />
      )}
    </button>
  );
};
