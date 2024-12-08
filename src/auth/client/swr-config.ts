import { SWRConfig } from "swr";
import { graphqlClient } from "./graphql-client";

export const swrConfig = {
  fetcher: (query: string, variables: any) =>
    graphqlClient.request(query, variables),
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
