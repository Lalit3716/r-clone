import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { GITHUB_OAUTH, GOOGLE_OAUTH } from "keys";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [GoogleProvider(GOOGLE_OAUTH), GithubProvider(GITHUB_OAUTH)],
  pages: {
    signIn: "/auth",
  },
};

export default NextAuth(authOptions);
