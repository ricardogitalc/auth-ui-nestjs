"use server";

import {
  fetchVerifyRegister,
  fetchUpdateProfile,
} from "@/_auth/client/api-client";
import { logoutSession } from "@/_auth/session/auth-session";
import * as AuthTypes from "@/_auth/types/auth.types";
import { cookies } from "next/headers";

export async function verifyRegisterAction(verificationToken: string) {
  try {
    const response = await fetchVerifyRegister(verificationToken);
    return response;
  } catch (error: any) {
    return {
      ok: false,
      message: error.message || "Erro ao verificar registro",
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
  } catch (error: any) {
    return {
      ok: false,
      message: error.message || "Erro ao atualizar perfil",
    };
  }
}
