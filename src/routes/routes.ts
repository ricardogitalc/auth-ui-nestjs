export const PROTECTED_ROUTES = {
  downloads: "/downloads",
  assinatura: "/assinatura",
  seguindo: "/seguindo",
  curtidas: "/curtidas",
  perfil: "/perfil",
  configuracoes: "/configuracoes",
};

export const PUBLIC_ROUTES = {
  home: "/",
  notFound: "/_not-found",
};

export const AUTH_ROUTES = {
  login: "/entrar",
  registro: "/registro",
  callback: "/callback",
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
