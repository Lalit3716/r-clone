import * as trpc from "@trpc/server";
import api from "./api";

export const appRouter = trpc.router().merge("", api);
