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
  cpf?: String;
  zipCode?: String;
  city?: String;
  state?: String;
  anddress?: String;
  district?: String;
  number?: String;
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
};

export type SessionType = {
  isAuthenticated: boolean;
  user?: UserType;
};

export * from "./auth.types";
