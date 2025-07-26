import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router"; 
import React from "react";


/**
 * @function RedirectionRoute
 * @description Un composant utilitaire qui gère la redirection basée sur le statut d'authentification
 * et le rôle de l'utilisateur. Il affiche des messages toast en cas de non-respect des conditions.
 *
 * @returns {null} Ce composant ne rend rien visuellement, il gère uniquement la logique de redirection.
 */

export const RedirectionRoute = () => {
  const { status, data: session } = useSession();
  const router = useRouter(); 

  // Utilisez un état pour éviter des boucles infinies de toast/redirection
  // si le status change plusieurs fois rapidement.
  const [hasRedirected, setHasRedirected] = React.useState(false);

  React.useEffect(() => {
    if (hasRedirected) return; // Ne pas exécuter la logique si une redirection est déjà en cours

    // Cas 1: L'utilisateur n'est pas authentifié
    if (status === "unauthenticated") {
      toast.error("Veuillez vous connecter pour accéder à cette page.");
      setHasRedirected(true); // Indiquer qu'une redirection est imminente
      router.push("/auth/signin");
      return;
    }

    // Cas 2: L'utilisateur est authentifié mais n'a pas le rôle attendu (ex: est un recruteur)
    if (session?.user?.role === "RECRUITER") {
      toast.error("Accès refusé : Vous n'avez pas les permissions nécessaires.");
      setHasRedirected(true); // Indiquer qu'une redirection est imminente
      router.push("/");
      return;
    }

    // Vérification de l'expiration du token
    if (status === "authenticated" && session?.expires) {
      const expirationDate = new Date(session.expires);
      const now = new Date();

      if (now > expirationDate) {
        console.log("Token expiré, déconnexion de l'utilisateur.");
        toast.error("Votre session a expiré. Veuillez vous reconnecter.");
        setHasRedirected(true); // Indiquer qu'une redirection est imminente
        signOut() // Déconnexion et redirection vers la page de connexion
        return;
      }
    }
    // Vérification de l'expiration du token

  }, [status, session, router, hasRedirected]);

  return null; // Ce composant ne rend rien visuellement
};