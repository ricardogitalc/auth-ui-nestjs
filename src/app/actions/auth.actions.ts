"use server";

import { fetchVerifyRegister } from "@/auth/fetch/fetch-client";

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
