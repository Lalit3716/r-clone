import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

// The app's context - is generated for each incoming request
export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  return { req, res };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
