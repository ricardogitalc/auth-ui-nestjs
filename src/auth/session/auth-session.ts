"use server";

import { cookies } from "next/headers";
import * as jose from "jose";
import { redirect } from "next/navigation";
import { getErrorMessage } from "../utils/error-handler";
import * as AuthTypes from "@/auth/types/auth.types";
import {
  fetchLogin,
  fetchRefresh,
  fetchGetProfile,
} from "../fetch/fetch-client";
import { NextRequest, NextResponse } from "next/server";

const JWT_KEY = process.env.JWT_SECRET_KEY as string;
const REFRESH_KEY = process.env.REFRESH_SECRET_KEY as string;

function generateKey(secret: string): Uint8Array {
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(secret);
  const buffer = new Uint8Array(32);
  buffer.set(keyBytes.slice(0, 32));
  return buffer;
}

async function decryptJWT(token: string, secret: string) {
  const key = generateKey(secret);
  return await jose.jwtDecrypt(token, key, {
    clockTolerance: 1,
  });
}

export async function loginSession(
  credentials: AuthTypes.LoginType
): Promise<AuthTypes.LoginResponse> {
  try {
    const { accessToken, refreshToken } = await fetchLogin(credentials);

    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    await getSession();
    return await fetchLogin(credentials);
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getSession(): Promise<AuthTypes.SessionType> {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    return { isAuthenticated: false };
  }

  try {
    const response = await fetchGetProfile(accessToken);
    if (!response.ok) {
      return { isAuthenticated: false };
    }

    return {
      isAuthenticated: true,
      user: {
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        role: response.role,
        provider: response.provider,
        whatsapp: response.whatsapp,
        profileUrl: response.profileUrl,
        verified: response.verified,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      },
    };
  } catch (error) {
    return { isAuthenticated: false };
  }
}

export async function logoutSession() {
  await cookies().set("accessToken", "", { expires: new Date(0) });
  await cookies().set("refreshToken", "", { expires: new Date(0) });
  redirect("/entrar");
}

export async function updateSession(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken || !accessToken) {
    return clearTokens();
  }

  try {
    const accessTokenStatus = await verifyToken(accessToken, JWT_KEY);
    if (accessTokenStatus.isValid) {
      return NextResponse.next();
    }

    const refreshTokenStatus = await verifyToken(refreshToken, REFRESH_KEY);
    if (!refreshTokenStatus.isValid) {
      return clearTokens();
    }

    const newTokens = await fetchRefresh(refreshToken);
    const response = NextResponse.next();

    response.cookies.set("accessToken", newTokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("refreshToken", newTokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    return clearTokens();
  }
}

async function verifyToken(token: string, secret: string) {
  try {
    await decryptJWT(token, secret);
    return { isValid: true };
  } catch (error: any) {
    return { isValid: false };
  }
}

function clearTokens() {
  const response = NextResponse.next();
  response.cookies.set("accessToken", "", { expires: new Date(0) });
  response.cookies.set("refreshToken", "", { expires: new Date(0) });
  return response;
}
