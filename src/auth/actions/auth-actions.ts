"use server";

import { graphqlClient } from "@/auth/client/graphql-client";
import { LOGIN_MUTATION } from "@/auth/graphql/auth-querys-mutations";
import { LoginInput, LoginResponse } from "@/auth/types/auth-types";

export async function loginAction(
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

    return response.loginUser;
  } catch (error) {
    throw new Error("Falha na autenticação");
  }
}
