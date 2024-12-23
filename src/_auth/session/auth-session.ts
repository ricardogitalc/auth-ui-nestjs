"use server";

import { cookies } from "next/headers";
import * as jose from "jose";
import { redirect } from "next/navigation";
import { getErrorMessage } from "../utils/error-handler";
import * as AuthTypes from "@/_auth/types/auth.types";
import {
  fetchGetProfile,
  fetchLogin,
  fetchRefresh,
} from "../client/api-client";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "@/_config/auth.config";

const generateKey = (secret: string): Uint8Array => {
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(secret);
  const buffer = new Uint8Array(32);
  buffer.set(keyBytes.slice(0, 32));
  return buffer;
};

const decryptJWT = async (token: string, secret: string) => {
  const key = generateKey(secret);
  return await jose.jwtDecrypt(token, key, { clockTolerance: 1 });
};

const setAuthCookies = (
  response: NextResponse,
  tokens: Pick<AuthTypes.TokenResponse, "accessToken" | "refreshToken">
) => {
  const { accessToken, refreshToken } = tokens;
  response.cookies.set("accessToken", accessToken, AUTH_CONFIG.COOKIE_OPTIONS);
  response.cookies.set(
    "refreshToken",
    refreshToken,
    AUTH_CONFIG.COOKIE_OPTIONS
  );
  return response;
};

export async function loginSession(
  credentials: AuthTypes.LoginType
): Promise<AuthTypes.LoginResponse> {
  try {
    const response = await fetchLogin(credentials);
    const cookieStore = cookies();

    cookieStore.set(
      "accessToken",
      response.accessToken,
      AUTH_CONFIG.COOKIE_OPTIONS
    );
    cookieStore.set(
      "refreshToken",
      response.refreshToken,
      AUTH_CONFIG.COOKIE_OPTIONS
    );

    await getSessionApi();
    return response;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getSessionApi(): Promise<AuthTypes.SessionType> {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) return { isAuthenticated: false };

  try {
    const user = await fetchGetProfile(accessToken);
    if (!user.ok) return { isAuthenticated: false };

    return {
      isAuthenticated: true,
      user: {
        role: user.role,
        provider: user.provider,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileUrl: user.profileUrl,
        phone: user.phone,
        zipCode: user.zipCode,
        city: user.city,
        state: user.state,
        address: user.address,
        number: user.number,
        district: user.district,
        cpf: user.cpf,
        verified: user.verified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  } catch (error) {
    return { isAuthenticated: false };
  }
}

export async function updateSession(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken || !accessToken) {
    return { ok: false, response: clearTokens() };
  }

  try {
    const tokenInfo = await getTokenInfo(accessToken, AUTH_CONFIG.JWT_KEY);
    if (tokenInfo.isValid) {
      return { ok: true, response: NextResponse.next() };
    }

    const refreshTokenStatus = await verifyToken(
      refreshToken,
      AUTH_CONFIG.REFRESH_KEY
    );
    if (!refreshTokenStatus.isValid) {
      return { ok: false, response: clearTokens() };
    }

    const newTokens = await fetchRefresh(refreshToken);
    if (!newTokens.ok) {
      return { ok: false, response: clearTokens() };
    }

    return {
      ok: true,
      response: setAuthCookies(NextResponse.next(), newTokens),
    };
  } catch (error) {
    return { ok: false, response: clearTokens() };
  }
}

async function getTokenInfo(token: string, secret: string) {
  try {
    const decoded = await decryptJWT(token, secret);
    const now = Math.floor(Date.now() / 1000);
    const exp = decoded.payload.exp || 0;
    const timeLeft = exp - now;

    return {
      timeLeft,
      isValid: timeLeft > 0,
      payload: decoded.payload,
    };
  } catch (error) {
    return {
      timeLeft: -1,
      isValid: false,
      payload: null,
    };
  }
}

async function verifyToken(token: string, secret: string) {
  const tokenInfo = await getTokenInfo(token, secret);
  return { isValid: tokenInfo.timeLeft > 30 };
}

function clearTokens() {
  const response = NextResponse.next();
  response.cookies.set("accessToken", "", { expires: new Date(0) });
  response.cookies.set("refreshToken", "", { expires: new Date(0) });
  return response;
}

export async function logoutSession() {
  const cookieStore = cookies();
  cookieStore.set("accessToken", "", { expires: new Date(0) });
  cookieStore.set("refreshToken", "", { expires: new Date(0) });
  redirect("/entrar");
}
