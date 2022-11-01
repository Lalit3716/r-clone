import { createRouter } from "server/createRouter";
import api from "./api";

export const appRouter = createRouter().merge("api.", api);
