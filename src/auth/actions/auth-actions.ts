"use server"

import { cookies } from "next/headers";
import type { GetProfileQuery, LoginInput, LoginResponse, SessionUser } from "../types/auth-types";
import { redirect } from "next/navigation";
import { graphqlClient } from "../client/graphql-client";
import { GET_PROFILE_QUERY, LOGIN_MUTATION } from "../graphql/auth-querys-mutations";
import { jwtVerify, SignJWT } from "jose";
import { getErrorMessage } from "../utils/error-handler";

const ACCESS_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
const JWT_SECRET = new TextEncoder().encode(process.env.REFRESH_SECRET_KEY);

export async function login(credentials: LoginInput): Promise<LoginResponse> {
  try {
    const variables = { loginUserInput: credentials };
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

    const session = await getSession();
    if (!session) {
      throw new Error("Failed to initialize session");
    }

    return response.loginUser;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const session = cookieStore.get('session');

  if (!accessToken) {
    return null;
  }

  try {
    if (session) {
      const { payload } = await jwtVerify(session.value, ACCESS_SECRET);
      return payload as SessionUser;
    }

    const profileResponse = await graphqlClient.request<GetProfileQuery>(
      GET_PROFILE_QUERY,
      {},
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );

    await updateSession(profileResponse.getProfile);
    return profileResponse.getProfile;
  } catch {
    return null;
  }
}

export async function updateSession(user: SessionUser) {
  const session = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(ACCESS_SECRET);

  const cookieStore = cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    path: "/",
  });
}

export async function logout() {
  cookies().set("accessToken", "", { expires: new Date(0) });
  cookies().set("refreshToken", "", { expires: new Date(0) });
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/entrar");
}