import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
    export interface Session {
        jwt: string;
        user: User
        id: number;
        username: string;
        expires: string;
  }

    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    export interface JWT {
        /** OpenID ID Token */
        idToken?: string
        id: string,
        jwt: sting
    }
  
}