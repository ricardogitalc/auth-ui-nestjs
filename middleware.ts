import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "./src/auth/actions/auth-actions";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  return NextResponse.next();
}
