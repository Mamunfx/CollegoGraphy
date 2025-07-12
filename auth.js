import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";


import clientPromise from './lib/mongodb';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db(); 
        const user = await db.collection("users").findOne({ userEmail: credentials.email });

        if (user) {
          const isValidPassword = (credentials.password === user.password);

          if (isValidPassword) {
            return {
              id: user._id.toString(), 
              email: user.userEmail,
              name: user.userName, 
              image: user.photoURL,
            };
          }
        }
        return null;
      },
    }),

    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.picture;
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
