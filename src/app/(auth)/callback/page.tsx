"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/_auth/session/auth-session";

export default async function CallbackPage() {
  const isAuthenticated = await getSession();

  if (isAuthenticated) {
    redirect("/");
  }

  redirect("/entrar");
}
