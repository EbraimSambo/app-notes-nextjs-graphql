import { NextAuthOptions } from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials";

const TOKEN_EXPIRATION_TIME = 9 * 60 * 60; // 9 horas em segundos

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "Id", type: "text" },
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" }
      },
      async authorize(credentials) {
        if (!credentials?.id || !credentials?.name || !credentials?.email) {
          return null;
        }

        return {
          id: String(credentials.id),
          name: credentials.name,
          email: credentials.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: TOKEN_EXPIRATION_TIME, // Definir a expiração da sessão
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
    
      console.log("Token gerado no JWT Callback:", token); // Log para depuração
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  }
};
