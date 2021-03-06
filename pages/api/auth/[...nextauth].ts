/* eslint-disable prettier/prettier */
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { verifyPassword } from "@helpers/auth";
import prisma from "@helpers/prisma";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "Login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
        });

        if (!user) return null;

        const isCorrectPassword = await verifyPassword(credentials.password, String(user.password));

        if (isCorrectPassword) {
          return user;
        }

        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
  },
  pages: {
    signIn: "/auth/login",
  },
});
