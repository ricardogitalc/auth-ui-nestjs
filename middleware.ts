import { updateSession } from "@/auth/session/lib";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
