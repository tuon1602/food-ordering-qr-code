import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./app/actions/authentication/auth";
import { User } from "@prisma/client";
import { ZodError } from "zod";
import { loginSchema } from "./app/schema";

export class InvalidLoginError extends CredentialsSignin {
  code = 'invalid_credentials'
  constructor(message: string) {
    super(message)
    this.code = message
}
}

export const config = {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        try {
          const result = await login(
            credentials?.username as string,
            credentials?.password as string
          );
          return result?.user as User;
        } catch (error:any) {
          throw new InvalidLoginError("invalid_credentials")
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 3600,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
