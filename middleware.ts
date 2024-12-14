import { updateSession } from "@/auth/session/auth-session-rest";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
