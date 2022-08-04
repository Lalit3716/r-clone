import * as trpc from "@trpc/server";
import { createRouter } from "server/createRouter";
import api from "./api";

export const appRouter = createRouter().merge("api.", api);
