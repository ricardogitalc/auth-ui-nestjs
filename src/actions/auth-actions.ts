"use server";

import { logoutSession } from "@/auth/session/auth-session";

export async function handleLogout() {
  await logoutSession();
}
