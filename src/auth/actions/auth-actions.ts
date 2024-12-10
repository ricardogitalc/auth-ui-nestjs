"use server"

import { cookies } from "next/headers";
import type { GetProfileQuery, LoginInput, LoginResponse } from "../types/auth-types";
import { redirect } from "next/navigation";
import { graphqlClient } from "../client/graphql-client";
import { GET_PROFILE_QUERY, LOGIN_MUTATION } from "../graphql/auth-querys-mutations";
import { jwtVerify, SignJWT } from "jose";
import { getErrorMessage } from "../utils/error-handler";

export async function login(
  credentials: LoginInput
): Promise<LoginResponse> {
  try {
    const variables = {
      loginUserInput: credentials,
    };

    const response = await graphqlClient.request<{ loginUser: LoginResponse }>(
      LOGIN_MUTATION,
      variables
    );
    const { accessToken, refreshToken } = response.loginUser;

    const cookieStore = cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      path: "/",
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      path: "/",
    });

    const profileResponse = await graphqlClient.request<GetProfileQuery>(
      GET_PROFILE_QUERY,
      {},
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );

    await updateSession(profileResponse.getProfile);

    return response.loginUser;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export type SessionUser = GetProfileQuery['getProfile'];

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const session = cookieStore.get('session');

  if (!session) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(session.value, SECRET);
    return payload as SessionUser;
  } catch {
    await logout();
    return null;
  }
}

export async function updateSession(user: SessionUser) {
  // função refresh token
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("user_session");
  redirect("/entrar");
}