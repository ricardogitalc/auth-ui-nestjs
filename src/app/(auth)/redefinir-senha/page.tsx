"use client";

import { ResetPwdForm } from "@/_components/auth/forms/reset-pwd-form";
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

  return <ResetPwdForm token={token} />;
}
