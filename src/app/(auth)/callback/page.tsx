"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/auth/session/auth-session";

export default async function CallbackPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  redirect("/entrar");
}
