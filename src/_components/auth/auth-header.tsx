import LogoTipoNoText from "../../../public/logotipo-no-text";
import { CardHeader } from "../ui/card";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <CardHeader className="space-y-4 my-4">
      <div className="flex justify-center items-center">
        <LogoTipoNoText className="w-8 h-8" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </CardHeader>
  );
}
