export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
};

export interface GetProfileQuery {
  getProfile: {
    id: number;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    whatsapp: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
  }
}
