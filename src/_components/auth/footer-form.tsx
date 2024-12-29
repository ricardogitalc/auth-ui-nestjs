import Link from "next/link";

interface FooterFormProps {
  text: string;
  linkText: string;
  href: string;
}

export function FooterForm({ text, linkText, href }: FooterFormProps) {
  return (
    <p className="mt-6 text-center text-sm/6 text-text-foreground">
      {text}{" "}
      <Link
        href={href}
        className="font-semibold text-primary hover:text-primary/70"
      >
        {linkText}
      </Link>
    </p>
  );
}
