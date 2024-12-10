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
