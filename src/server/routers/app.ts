import { createRouter } from "server/createRouter";
import { apiRouter } from "server/routers/api";
import { postRouter } from "server/routers/post";

export const appRouter = createRouter()
  .merge("api.", apiRouter)
  .merge("post.", postRouter);
