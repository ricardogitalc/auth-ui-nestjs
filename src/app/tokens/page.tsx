import {
  isValidAcessToken,
  isValidRefreshToken,
  refreshAccessToken,
} from "@/auth/session/auth-session-rest";
import { revalidatePath } from "next/cache";

async function refreshTokenAction() {
  "use server";
  await refreshAccessToken();
  revalidatePath("/tokens");
}

export default async function AccessTokenPage() {
  const isValidAccess = await isValidAcessToken();
  const isValidRefresh = await isValidRefreshToken();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">Status dos Tokens</h1>
      <div className="space-y-4">
        <div
          className={`p-4 rounded-md ${
            isValidAccess ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <h2 className="font-bold">Access Token:</h2>
          {isValidAccess ? (
            <p className="text-green-700">Token válido</p>
          ) : (
            <p className="text-red-700">Token inválido ou expirado</p>
          )}
        </div>
        <div
          className={`p-4 rounded-md ${
            isValidRefresh ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <h2 className="font-bold">Refresh Token:</h2>
          {isValidRefresh ? (
            <p className="text-green-700">Token válido</p>
          ) : (
            <p className="text-red-700">Token inválido ou expirado</p>
          )}
        </div>
        <form action={refreshTokenAction}>
          <button
            type="submit"
            disabled={!isValidRefresh}
            className={`mt-4 px-4 py-2 rounded-md ${
              !isValidRefresh
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Atualizar Access Token
          </button>
        </form>
      </div>
    </div>
  );
}
