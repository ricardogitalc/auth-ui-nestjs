import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:8000/graphql";

export const graphqlClient = new GraphQLClient(endpoint, {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});
