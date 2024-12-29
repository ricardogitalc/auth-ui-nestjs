import LogoTipoIcon from "../../../public/logotipo-icon";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="w-12 h-12">
        <LogoTipoIcon />
      </div>
      <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-text">
        {title}
      </h2>
      <p className="text-sm text-center text-muted-foreground">{description}</p>
    </div>
  );
}
