"use server";

import { cookies } from "next/headers";
import { createHash } from "crypto";
import * as jose from "jose";
import type {
  LoginInput,
  LoginResponse,
  SessionUser,
} from "../types/auth-types";
import { redirect } from "next/navigation";
import { graphqlClient } from "../client/graphql-client";
import { LOGIN_MUTATION, REFRESH_TOKEN_MUTATION } from "../calls/graphql-calls";
import { getErrorMessage } from "../utils/error-handler";
import type { RefreshResponse } from "../types/graphql-types";
import { NextResponse, type NextRequest } from "next/server";

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

export async function login(credentials: LoginInput): Promise<LoginResponse> {
  try {
    const variables = { loginUserInput: credentials };
    const response = await graphqlClient.request<{ loginUser: LoginResponse }>(
      LOGIN_MUTATION,
      variables
    );
    const { accessToken, refreshToken } = response.loginUser;

    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    await getSession();

    return response.loginUser;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const accessToken = cookies().get("accessToken")?.value;
  const isAccessValid = await isValidAcessToken();

  if (!accessToken || !isAccessValid) {
    return null;
  }
  try {
    const { payload } = await decryptJWT(accessToken, JWT_KEY);
    return {
      id: Number(payload.id),
      role: String(payload.role),
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

export async function logout() {
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
  "use server";
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const variables = { refreshToken: { refreshToken } };
    const response = await graphqlClient.request<{
      refreshToken: RefreshResponse;
    }>(REFRESH_TOKEN_MUTATION, variables);

    const { accessToken } = response.refreshToken;

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
