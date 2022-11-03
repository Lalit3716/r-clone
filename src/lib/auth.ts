import { prisma } from "lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { GITHUB_OAUTH, GOOGLE_OAUTH } from "keys";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [GoogleProvider(GOOGLE_OAUTH), GithubProvider(GITHUB_OAUTH)],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
    };
  }
}
