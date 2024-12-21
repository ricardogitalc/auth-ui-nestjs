export const PROTECTED_ROUTES = {
  downloads: "/config/downloads",
  assinatura: "/config/assinatura",
  settings: "/config/conta",
  seguindo: "/seguindo",
  curtidas: "/curtidas",
};

export const PUBLIC_ROUTES = {
  home: "/",
  notFound: "/_not-found",
};

export const AUTH_ROUTES = {
  cadastrar: "/cadastrar",
  callback: "/callback",
  entrar: "/entrar",
  esqueceuSenha: "/esqueceu-senha",
  redefinirSenha: "redefinir-senha",
  verificarCadastro: "verificar-cadastro",
};

export const isProtectedRoute = (path: string) => {
  return Object.values(PROTECTED_ROUTES).includes(path);
};

export const isAuthRoute = (path: string) => {
  return Object.values(AUTH_ROUTES).includes(path);
};

export const isPublicRoute = (path: string) => {
  return Object.values(PUBLIC_ROUTES).includes(path);
};
