import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router"; 


/**
 * @function RedirectionRoute
 * @description Un composant utilitaire qui gère la redirection basée sur le statut d'authentification
 * et le rôle de l'utilisateur. Il affiche des messages toast en cas de non-respect des conditions.
 *
 * @returns {null} Ce composant ne rend rien visuellement, il gère uniquement la logique de redirection.
 */
export const RedirectionRoute = () => {
  // Utilise le hook useSession de NextAuth.js pour accéder au statut d'authentification
  // et aux données de la session (y compris le rôle de l'utilisateur).
  const { status, data: session } = useSession();
  const router = useRouter();

  // Cas 1: L'utilisateur n'est pas authentifié
  if (status === "unauthenticated") {
    toast.error("Veuillez vous connecter pour accéder à cette page.");

    router.push("/auth/signin");
    return null; // Ne rend rien après la redirection
  }

  // Cas 2: L'utilisateur est authentifié mais n'a pas le rôle attendu (ex: est un recruteur)
  if (session?.user?.role === "RECRUITER") {
    toast.error("Accès refusé : Vous n'avez pas les permissions nécessaires.");

    router.push("/");
    return null;
  }

  return null;
};
