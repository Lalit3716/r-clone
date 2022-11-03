import { createRouter } from "server/createRouter";
import z from "zod";

export const postRouter = createRouter()
  .query("post", {
    input: z.object({
      id: z.string(),
    }),
    resolve({ ctx, input: { id } }) {
      return ctx.prisma.post.findUnique({
        where: { id },
      });
    },
  })
  .query("posts", {
    input: z.object({
      skip: z.number().optional().default(0),
      take: z.number().optional().default(10),
    }),
    resolve({ ctx, input: { skip, take } }) {
      return ctx.prisma.post.findMany({
        skip,
        take,
      });
    },
  })
  .mutation("createPost", {
    input: z.object({
      title: z.string(),
      content: z.string(),
    }),
    resolve({ ctx, input: { title, content } }) {
      return ctx.prisma.post.create({
        data: {
          title,
          content,
          author: {
            connect: {
              id: ctx.session!.user.id,
            },
          },
        },
      });
    },
  });
