import * as AuthTypes from "@/auth/types/auth.types";

const baseUrl = "http://localhost:8000";

export const initiateGoogleAuth = () => {
  window.location.href = `${baseUrl}/auth/google`;
};

export const fetchLogin = async (data: AuthTypes.LoginType) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
};

export const fetchRegister = async (data: AuthTypes.RegisterType) => {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
};

export const fetchVerify = async (verificationToken: string) => {
  const response = await fetch(`${baseUrl}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ verificationToken }),
  });

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
};

export const fetchRefresh = async (refreshToken: string) => {
  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
};

export const fetchResetPwd = async (email: string) => {
  const response = await fetch(`${baseUrl}/auth/reset-pwd`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
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

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
};

export const handleGoogleCallback = async (
  accessToken: string,
  refreshToken: string
) => {
  return { accessToken, refreshToken };
};

export const fetchGetProfile = async (accessToken: string) => {
  const response = await fetch(`${baseUrl}/users/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
};

export const fetchUpdateProfile = async (
  accessToken: string,
  data: AuthTypes.UpdateUserType
) => {
  const response = await fetch(`${baseUrl}/users/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
};

export const fetchDeleteProfile = async (accessToken: string) => {
  const response = await fetch(`${baseUrl}/users/profile`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
};

export const fetchGetAllUsers = async (accessToken: string) => {
  const response = await fetch(`${baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
};

export const fetchGetUserById = async (accessToken: string, id: number) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
};

export const fetchUpdateUserById = async (
  accessToken: string,
  id: number,
  data: AuthTypes.UpdateUserType
) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
};

export const fetchDeleteUserById = async (accessToken: string, id: number) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseData = await response.json();
  return {
    ...responseData,
    ok: response.ok,
  };
};
