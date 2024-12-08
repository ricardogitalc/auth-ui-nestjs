import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

interface AuthCardProps {
  title: string;
  description: string;
  href: string;
  buttonText: string;
}

export function AuthCard({
  title,
  description,
  href,
  buttonText,
}: AuthCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href} className="w-full">
          <Button className="w-full">{buttonText}</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
