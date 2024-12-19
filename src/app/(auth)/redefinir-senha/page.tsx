"use client";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { useRouter } from "next/navigation";

interface ResetPageProps {
  searchParams: { token?: string };
}

export default function ResetPage({ searchParams }: ResetPageProps) {
  const token = searchParams.token;
  const router = useRouter();

  if (!token) {
    router.push("/entrar");
    return;
  }

  return (
    <div className="container mx-auto max-w-md p-6">
      <ResetPasswordForm token={token} />
    </div>
  );
}
