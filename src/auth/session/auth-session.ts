"use server";

import { cookies } from "next/headers";
import { createHash } from "crypto";
import * as jose from "jose";
import { redirect } from "next/navigation";
import { getErrorMessage } from "../utils/error-handler";
import { NextResponse, type NextRequest } from "next/server";
import {
  fetchLogin,
  fetchRefresh,
  type LoginType,
  type LoginResponse,
  type UserType,
} from "../fetch/fetch-client";

const JWT_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
const REFRESH_KEY = new TextEncoder().encode(process.env.REFRESH_SECRET_KEY);

async function decryptJWT(token: string, secret: Uint8Array) {
  try {
    const key = createHash("sha256").update(secret).digest();
    return await jose.jwtDecrypt(token, key, {
      clockTolerance: 60,
    });
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      throw new Error("Token expirado");
    }
    if (error.code === "ERR_JWT_CLAIM_VALIDATION_FAILED") {
      throw new Error("Falha na validação do token");
    }
    throw error;
  }
}

export async function loginSession(
  credentials: LoginType
): Promise<LoginResponse> {
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
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getSession(): Promise<UserType | null> {
  const accessToken = cookies().get("accessToken")?.value;
  const isAccessValid = await isValidAcessToken();

  if (!accessToken || !isAccessValid) {
    return null;
  }

  try {
    const { payload } = await decryptJWT(accessToken, JWT_KEY);
    return {
      role: String(payload.role),
      provider: String(payload.provider),
      id: Number(payload.sub),
      firstName: String(payload.firstName),
      lastName: String(payload.lastName),
      email: String(payload.email),
      whatsapp: String(payload.whatsapp),
      verified: Boolean(payload.verified),
      createdAt: String(payload.createdAt),
      updatedAt: String(payload.updatedAt),
    };
  } catch {
    return null;
  }
}

export async function logoutSession() {
  await cookies().set("accessToken", "", { expires: new Date(0) });
  await cookies().set("refreshToken", "", { expires: new Date(0) });
  redirect("/entrar");
}

export async function isValidAcessToken(): Promise<boolean> {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    return false;
  }

  try {
    const { payload } = await decryptJWT(accessToken, JWT_KEY);
    const expirationTime = (payload.exp || 0) * 1000;
    return Date.now() < expirationTime;
  } catch {
    return false;
  }
}

export async function isValidRefreshToken(): Promise<boolean> {
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!refreshToken) {
    return false;
  }

  try {
    const { payload } = await decryptJWT(refreshToken, REFRESH_KEY);
    const expirationTime = (payload.exp || 0) * 1000;
    return Date.now() < expirationTime;
  } catch {
    return false;
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetchRefresh(refreshToken);
    const { accessToken } = response;

    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return accessToken;
  } catch (error) {
    console.error("Erro ao atualizar o token:", error);
    return null;
  }
}

export async function updateSession(request: NextRequest) {
  return NextResponse.next();
}
