import { TailwindLogo } from "../../../public/tailwind-logo";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        alt="Your Company"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        className="mx-auto h-10 w-auto"
      />
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-text">
        {title}
      </h2>
      <p className="text-sm text-center text-muted-foreground">{description}</p>
    </div>
  );
}
