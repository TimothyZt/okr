import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { postLoginAction } from "../../../../../features/users/server-actions/user";
import { UserRequest } from "../../../../../features/users/dtos/users-dto";
import { unpackActionResponse } from "../../../../../lib/server-actions/action-response";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      // name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "ID" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          const user: UserRequest = {
            email: credentials?.username + "@gmail.com",
            password: credentials?.password!,
            twoFactorCode: "string",
            twoFactorRecoveryCode: "string",
          };
          const response = unpackActionResponse(await postLoginAction(user));
          if (user) {
            return {
              id:'1',
              name:credentials?.username,
              email:credentials?.username + "@GMAIL.COM"
            };
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(" " + error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 100,
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 6000,
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   const isAllowedToSignIn = true;
    //   if (isAllowedToSignIn) {
    //     return true;
    //   } else {
    //     // Return false to display a default error message
    //     return false;
    //     // Or you can return a URL to redirect to:
    //     // return '/unauthorized'
    //   }
    // },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
};
