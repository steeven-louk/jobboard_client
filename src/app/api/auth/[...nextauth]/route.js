import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";


const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },

      /**
       * Fonction d'autorisation asynchrone.
       * @param credentials Les identifiants (email, password) fournis par l'utilisateur.
       * @returns {Promise<User | null>} L'objet utilisateur si l'authentification réussit, sinon null.
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          // Gérer le cas où les identifiants sont manquants avant d'appeler l'API
          // L'erreur sera capturée et renvoyée pour être gérée par la page de connexion.
          throw new Error("Veuillez saisir votre email et votre mot de passe.");
        }

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          // Vérifier si la réponse contient les données attendues (token et user)
          if (response.data.token && response.data.user) {
            // Retourner l'objet utilisateur avec les données nécessaires pour le JWT et la session
            return {
              id: response.data.user.id,
              name: response.data.user.fullName,
              email: response.data.user.email,
              role: response.data.user.role,
              companyId: response.data.user.companyId,
              token: response.data.token,
            };
          } else {
            // Si la réponse de l'API est invalide mais n'a pas déclenché d'erreur HTTP
            throw new Error("Réponse de l'API d'authentification invalide.");
          }
        } catch (error) {
          // Gérer les erreurs de l'API (ex: 401 Unauthorized, Network Error)
          console.error("Erreur d'authentification :", error.response?.data || error.message);
          // throw new Error() transmet le message d'erreur à la page de connexion via le paramètre 'error'.
          throw new Error(error.response?.data?.message || "Email ou mot de passe incorrect.");
        }
      },
    }),
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
    signIn: "/auth/login",
    error: "/auth/login", 
  },

  secret: process.env.NEXTAUTH_SECRET,
   
  session: {
    strategy: "jwt", // Utilise le stockage basé sur JWT pour la session
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  // Active le mode débogage en développement pour des logs plus détaillés
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
