import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const URL = "http://localhost:1337/api/auth/local";

  export default NextAuth({
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        name: 'Sign in with Email',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials, req) {
          if (credentials == null) return null;
          try {
             const {data} = await axios.post(`http://localhost:1337/api/auth/local`, {
                identifier: credentials.email,
                password: credentials.password
            });
            return { ...data.user, ...data.jwt, ...data };
          } catch (error) {
            // Sign In Fail
            return null;
          }
        },
      }),
    ],
    callbacks: {
        async jwt({ token, user }) {
          // Persist the OAuth access_token and or the user id to the token right after signin
          if (user) {
            token.id = user.id;
            token.email = user.email;
          }
          return token;
        },
        async session({ session, token, user }) {
          // Send properties to the client, like an access_token and user id from a provider.
          session.user.id = token.id;
          session.user.name = token.name;
          session.user.username = token.username;
    
          return session;
        },
      },
  });