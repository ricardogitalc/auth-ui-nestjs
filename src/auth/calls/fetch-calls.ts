const baseUrl = "http://localhost:8000";

export type LoginType = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
};

export type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  whatsapp: string;
};

export type UserType = {
  role: string;
  provider: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserType = {
  firstName?: string;
  lastName?: string;
  password?: string;
  whatsapp: string;
};

// Funções de Autenticação Google
export const initiateGoogleAuth = () => {
  window.location.href = `${baseUrl}/auth/google`;
};

// Funções de Autenticação
export const fetchLogin = async (data: LoginType) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const fetchRegister = async (data: RegisterType) => {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const fetchVerify = async (verificationToken: string) => {
  const response = await fetch(`${baseUrl}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ verificationToken }),
  });
  return await response.json();
};

export const fetchRefresh = async (refreshToken: string) => {
  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  return await response.json();
};

export const fetchResetPwd = async (email: string) => {
  const response = await fetch(`${baseUrl}/auth/reset-pwd`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return await response.json();
};

export const fetchResetPwdConfirm = async (
  resetToken: string,
  newPassword: string
) => {
  const response = await fetch(`${baseUrl}/auth/reset-pwd/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resetToken, newPassword }),
  });
  return await response.json();
};

export const handleGoogleCallback = async (
  accessToken: string,
  refreshToken: string
) => {
  return { accessToken, refreshToken };
};

// Funções de Usuário
export const fetchGetProfile = async (accessToken: string) => {
  const response = await fetch(`${baseUrl}/users/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};

export const fetchUpdateProfile = async (
  accessToken: string,
  data: UpdateUserType
) => {
  const response = await fetch(`${baseUrl}/users/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const fetchDeleteProfile = async (accessToken: string) => {
  const response = await fetch(`${baseUrl}/users/profile`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};

// Funções de Usuários (Admin)
export const fetchGetAllUsers = async (accessToken: string) => {
  const response = await fetch(`${baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};

export const fetchGetUserById = async (accessToken: string, id: number) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};

export const fetchUpdateUserById = async (
  accessToken: string,
  id: number,
  data: UpdateUserType
) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const fetchDeleteUserById = async (accessToken: string, id: number) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};
