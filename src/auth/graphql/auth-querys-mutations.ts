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
