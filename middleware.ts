import { updateSession } from "@/lib/auth/lib";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}