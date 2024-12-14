const baseUrl = "http://localhost:8000";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  whatsapp: string;
}

interface UpdateUserData {
  firstName?: string;
  lastName?: string;
}

// Funções de Autenticação
export const login = async (data: LoginData) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const register = async (data: RegisterData) => {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const verify = async (verificationToken: string) => {
  const response = await fetch(`${baseUrl}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ verificationToken }),
  });
  return await response.json();
};

export const refresh = async (refreshToken: string) => {
  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  return await response.json();
};

export const resetPassword = async (email: string) => {
  const response = await fetch(`${baseUrl}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return await response.json();
};

export const resetPasswordConfirm = async (
  resetToken: string,
  newPassword: string
) => {
  const response = await fetch(`${baseUrl}/auth/reset-password/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resetToken, newPassword }),
  });
  return await response.json();
};

// Funções de Usuário
export const getProfile = async (accessToken: string) => {
  const response = await fetch(`${baseUrl}/users/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};

export const updateProfile = async (
  accessToken: string,
  data: UpdateUserData
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

export const deleteProfile = async (accessToken: string) => {
  const response = await fetch(`${baseUrl}/users/profile`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};

// Funções de Usuários (Admin)
export const getAllUsers = async (accessToken: string) => {
  const response = await fetch(`${baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};

export const getUserById = async (accessToken: string, id: number) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};

export const updateUserById = async (
  accessToken: string,
  id: number,
  data: UpdateUserData
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

export const deleteUserById = async (accessToken: string, id: number) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};
