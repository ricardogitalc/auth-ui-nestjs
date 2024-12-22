"use client";

import { ResetPwdForm } from "@/_components/auth/reset-pwd-form";
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
      <ResetPwdForm token={token} />
    </div>
  );
}
