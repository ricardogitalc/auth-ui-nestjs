"use server";

import {
  fetchVerifyRegister,
  fetchUpdateProfile,
} from "@/_auth/client/api-client";
import { getSessionApi, logoutSession } from "@/_auth/session/auth-session";
import * as AuthTypes from "@/_auth/types/auth.types";
import { cookies } from "next/headers";
import { AUTH_CONFIG } from "@/_config/auth.config";

export async function verifyRegisterAction(verificationToken: string) {
  try {
    const response = await fetchVerifyRegister(verificationToken);
    return response;
  } catch (error: unknown) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Erro ao verificar registro",
    };
  }
}

export async function handleLogout() {
  return await logoutSession();
}

export async function updateProfileAction(data: AuthTypes.UpdateUserType) {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    if (!accessToken) {
      throw new Error("Token não encontrado");
    }

    const response = await fetchUpdateProfile(accessToken, data);
    return response;
  } catch (error: unknown) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Erro ao atualizar perfil",
    };
  }
}

export async function handleGoogleAuth(
  accessToken: string,
  refreshToken: string
) {
  cookies().set("accessToken", accessToken, AUTH_CONFIG.COOKIE_OPTIONS);
  cookies().set("refreshToken", refreshToken, AUTH_CONFIG.COOKIE_OPTIONS);

  return await getSessionApi();
}
