import prisma from "@/app/utils/prismadb";
import { User } from "@prisma/client";
import { Account, AuthOptions, Profile } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@gmail.com",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) throw new Error("Invalid Credentials");
        const compare = await bcrypt.compare(password, user.password as string);
        if (!compare) throw new Error("Invalid Credentials");

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/errors",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account && profile && account.type === "oauth") {
        const pro = profile as Profile & { picture: string };
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (user) return true;

        const newUser = await prisma.user.create({
          data: {
            name: profile.name || "unknown",
            email: profile.email || "unknown",
            image: pro.picture,
            provider: account.provider,
          },
        });
      }
      return true;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        token.user.name = session.name;
        token.user.image = session.image;
      } else {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email || "",
          },
        });
        if (!user) throw new Error("Email Not Found!");
        const { password, ...userNoPassword } = user;
        token.user = userNoPassword;
      }

      return token;
    },
    async session({ session, token }) {
      const user = token.user as User;
      session.user = user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
