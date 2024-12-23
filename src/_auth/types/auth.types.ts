export type LoginType = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: any;
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
  phone: string;
};

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum Provider {
  CREDENTIALS = "CREDENTIALS",
  GOOGLE = "GOOGLE",
}

export type UserType = {
  role: Role;
  provider: Provider;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  profileUrl?: string;
  phone?: string;
  cpf?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  address?: string;
  district?: string;
  number?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateUserType = {
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?: string;
  profileUrl?: string;
  cpf?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  address?: string;
  district?: string;
  number?: string;
};

export type SessionType = {
  isAuthenticated: boolean;
  user?: UserType;
};

export type TokenResponse = {
  ok: boolean;
  accessToken: string;
  refreshToken: string;
};

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
  profileUrl: string;
  zipCode: string;
  city: string;
  state: string;
  address: string;
  number: string;
  district: string;
  cpf: string;
  currentPassword?: string; // Make optional
  newPassword?: string; // Make optional
}

export * from "./auth.types";
