import { TailwindLogo } from "../../../public/tailwind-logo";
import { CardHeader } from "../ui/card";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <CardHeader className="space-y-4 my-4">
      <div className="flex justify-center items-center">
        <TailwindLogo />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </CardHeader>
  );
}
