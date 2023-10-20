import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./connect";

import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: boolean;
      phoneNumber: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: boolean;
    phoneNumber: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
        session.user.phoneNumber = token.phoneNumber;
      }

      return session;
    },
    async jwt({ token }) {
      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      token.isAdmin = userInDb?.isAdmin!;
      token.phoneNumber = userInDb?.phoneNumber!;

      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
