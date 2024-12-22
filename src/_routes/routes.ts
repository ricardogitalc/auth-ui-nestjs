export const PROTECTED_ROUTES = {
  assinatura: "/assinatura",
  curtidas: "/curtidas",
  downloads: "/downloads",
  perfil: "/perfil",
  seguindo: "/seguindo",
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
