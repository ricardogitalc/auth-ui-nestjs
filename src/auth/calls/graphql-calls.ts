import { gql } from "graphql-request";

export const LOGIN_MUTATION = gql`
  mutation LoginUser($loginUserInput: loginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      message
      accessToken
      refreshToken
    }
  }
`;

export const GET_PROFILE_QUERY = gql`
  query GetProfile {
    getProfile {
      id
      role
      firstName
      lastName
      email
      whatsapp
      verified
      createdAt
      updatedAt
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($registerUserInput: registerUserInput!) {
    registerUser(registerUserInput: $registerUserInput) {
      message
      verificationToken
    }
  }
`;

export const VERIFY_REGISTER_MUTATION = gql`
  mutation VerifyRegister($verificationToken: String!) {
    verifyRegister(verificationToken: $verificationToken) {
      message
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: refreshTokenInput!) {
    refreshToken(refreshToken: $refreshToken) {
      message
      accessToken
    }
  }
`;

export const RESET_PWD_SENT_MUTATION = gql`
  mutation ResetPwdSent($resetPwdSentInput: resetPwdSentInput!) {
    resetPwdSent(resetPwdSentInput: $resetPwdSentInput) {
      message
      resetToken
    }
  }
`;

export const RESET_PWD_CONF_MUTATION = gql`
  mutation ResetPwdConf($resetPwdConfInput: resetPwdConfInput!) {
    resetPwdConf(resetPwdConfInput: $resetPwdConfInput) {
      message
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      id
      firstName
      lastName
      email
      whatsapp
    }
  }
`;

export const DELETE_PROFILE_MUTATION = gql`
  mutation DeleteProfile {
    deleteProfile {
      id
      firstName
      lastName
      email
    }
  }
`;

export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    getAllUsers {
      id
      role
      firstName
      lastName
      email
      whatsapp
      verified
    }
  }
`;

export const GET_USER_BY_ID_QUERY = gql`
  query GetUserById($id: Int!) {
    getUserById(id: $id) {
      id
      role
      firstName
      lastName
      email
      whatsapp
      verified
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER_BY_ID_MUTATION = gql`
  mutation UpdateUserById($updateUserInput: UpdateUserInput!) {
    updateUserById(updateUserInput: $updateUserInput) {
      firstName
      lastName
      email
      whatsapp
    }
  }
`;

export const DELETE_USER_BY_ID_MUTATION = gql`
  mutation DeleteUserById($id: Int!) {
    deleteUserById(id: $id) {
      id
      role
      firstName
      lastName
      email
      whatsapp
      verified
      createdAt
      updatedAt
    }
  }
`;
