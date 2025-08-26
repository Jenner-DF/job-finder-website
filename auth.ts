// import { PrismaClient } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// const prisma = new PrismaClient();

export const { auth, signIn, signOut, handlers } = NextAuth({
  session: { strategy: "jwt" },
  providers: [GitHub],
  adapter: PrismaAdapter(prisma), //only necessary if you use ORM to write in DB like prisma
  //adding info on jwt and session for more user info
  callbacks: {
    // authorized: async ({ auth }) => {
    //   // Logged in users are authenticated, otherwise redirect to login page
    //   return !!auth;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; //add props in token
        token.name = user.name;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  }, //JWT runs after user signs in only once
});
