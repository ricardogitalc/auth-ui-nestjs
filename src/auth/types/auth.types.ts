export type LoginType = {
  email: string;
  password: string;
};

export type LoginResponse = {
  ok: boolean;
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

export * from "./auth.types";
