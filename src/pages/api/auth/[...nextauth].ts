import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SignInMessage } from "../../../utils/auth";
import connectToDatabase from "@/lib/db/mongodb";
import { findOrCreateUser } from "@/lib/services/user";

import { ChainIdsEnum } from "@/types/wallet";

const getProvider = () => {
  return [
    CredentialsProvider({
      name: "Solana",
      credentials: {
        message: {
          label: "Message",
          type: "text",
        },
        signature: {
          label: "Signature",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        try {
          const authUrl = process.env.NEXTAUTH_URL;

          if (!authUrl) {
            return null;
          }

          const signinMessage = new SignInMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const nextAuthUrl = new URL(authUrl);
          if (signinMessage.domain !== nextAuthUrl.host) {
            return null;
          }

          const csrfToken = await getCsrfToken({ req: { ...req, body: null } });

          if (signinMessage.nonce !== csrfToken) {
            return null;
          }

          const validationResult = await signinMessage.validate(
            credentials?.signature || ""
          );

          if (!validationResult)
            throw new Error("Could not validate the signed message");

          const user = await findOrCreateUser({
            wallet: {
              type: ChainIdsEnum.SOLANA,
              address: signinMessage.publicKey,
            },
            createData: {
              username: signinMessage.publicKey,
            },
          });

          if (!user) return null;

          return {
            id: user._id,
            publicKey: signinMessage.publicKey,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ];
}



export const getAuthOptions = (req: NextApiRequest) => {
  const providers = getProvider();

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth?.includes("signin");

  // Hides Sign-In with Solana from the default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  const config = {
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.user = user;
        }
        return token;
      },
      async session({ session, token }) {
        if (token.user) {
          session.user = token.user as Session["user"];
        } else {
          session.user = null;
        }
        return session;
      },
    },
  } satisfies NextAuthOptions;

  return config;
};



export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  
  await connectToDatabase();

  return await NextAuth(req, res, getAuthOptions(req));
}
