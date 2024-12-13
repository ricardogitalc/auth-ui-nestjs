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
import {
  LOGIN_MUTATION,
  REFRESH_TOKEN_MUTATION,
} from "../graphql/auth-querys-mutations";
import { getErrorMessage } from "../utils/error-handler";
import type { RefreshResponse } from "../types/graphql-types";

const JWT_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
const REFRESH_KEY = new TextEncoder().encode(process.env.REFRESH_SECRET_KEY);

async function decryptJWT(token: string, secret: Uint8Array) {
  const key = createHash("sha256").update(secret).digest();
  return await jose.jwtDecrypt(token, key);
}

export async function login(credentials: LoginInput): Promise<LoginResponse> {
  try {
    const variables = { loginUserInput: credentials };
    const response = await graphqlClient.request<{ loginUser: LoginResponse }>(
      LOGIN_MUTATION,
      variables
    );
    const { accessToken, refreshToken } = response.loginUser;

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    cookieStore.set("refreshToken", refreshToken, {
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
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
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
  const cookieStore = await cookies();
  await cookieStore.set("accessToken", "", { expires: new Date(0) });
  await cookieStore.set("refreshToken", "", { expires: new Date(0) });
  redirect("/entrar");
}

export async function isValidAcessToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return false;
  }

  try {
    const { payload } = await decryptJWT(accessToken, JWT_KEY);
    console.log("AccessToken Payload:", JSON.stringify(payload, null, 2));
    const expirationTime = (payload.exp || 0) * 1000;
    return Date.now() < expirationTime;
  } catch {
    return false;
  }
}

export async function isValidRefreshToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

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
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const variables = { refreshToken: { refreshToken } };
    const response = await graphqlClient.request<{
      refreshToken: RefreshResponse;
    }>(REFRESH_TOKEN_MUTATION, variables);

    const { accessToken } = response.refreshToken;

    cookieStore.set("accessToken", accessToken, {
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
