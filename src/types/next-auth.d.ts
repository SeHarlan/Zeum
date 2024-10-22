
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: Schema.Types.ObjectId;
    publicKey: string;
  }
  
  interface Session {
    user: User | null;
    accessToken: string;
  }
}
