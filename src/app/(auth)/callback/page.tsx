"use server";

import { getSessionApi } from "@/_auth/session/auth-session";
import { redirect } from "next/navigation";

export default async function CallbackPage() {
  const isAuthenticated = await getSessionApi();

  if (isAuthenticated) {
    redirect("/");
  }

  redirect("/entrar");
}
