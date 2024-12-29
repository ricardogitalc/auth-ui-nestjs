type GraphQLError = {
  message: string;
  code?: string;
  extensions?: {
    code: string;
    response?: {
      message: string;
      statusCode: number;
    };
  };
};

interface ErrorResponse {
  response?: {
    errors?: GraphQLError[];
  };
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof TypeError && error.message === "fetch failed") {
    return "Não foi possível conectar ao servidor.";
  }

  const errorResponse = error as ErrorResponse;
  if (errorResponse?.response?.errors) {
    const graphqlError = errorResponse.response.errors[0];

    switch (graphqlError.extensions?.code) {
      case "UNAUTHORIZED":
        return "Email ou senha incorretos";
      case "BAD_USER_INPUT":
        return "Dados inválidos. Por favor, verifique as informações";
      case "USER_NOT_FOUND":
        return "Usuário não encontrado";
      default:
        return graphqlError.message || "Ocorreu um erro inesperado";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado";
}
