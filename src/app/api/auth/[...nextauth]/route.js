import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";


const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            email: credentials.email,
            password: credentials.password
          });

          if (response.data.token) {
            return {
              id: response.data.user.id,
              name: response.data.user.fullName,
              email: response.data.user.email,
              role: response.data.user.role,
              companyId: response.data.user.companyId,
              token: response.data.token,
            };
          }
        } catch (error) {
          toast("Erreur", {
            description: "Email ou mot de passe incorrect",
          })
          throw new Error("Email ou mot de passe incorrect", error);
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.companyId = user.companyId
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role ;
        session.user.companyId = token.companyId;
        session.user.token = token.token;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login"
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
