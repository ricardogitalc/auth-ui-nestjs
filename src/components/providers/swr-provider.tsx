"use client";

import { SWRConfig } from "swr";
import { swrConfig } from "@/auth/client/swr-config";

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
