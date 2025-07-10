"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "RECRUITER" | "USER";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading"){
       return;
    }

    // Cas 1: L'utilisateur n'est pas authentifié
    if (!session) {
      toast.error("Vous devez être connecté pour accéder à cette page !");

      router.push("/auth/login");
      return;
    } 
    
    // Cas 2: L'utilisateur est authentifié mais n'a pas le rôle requis
    if (requiredRole && session?.user?.role !== requiredRole) {
      toast.warning(`Accès refusé : Cette page est réservée aux ${requiredRole === "RECRUITER" ? "recruteurs" : "utilisateurs"} !`);
      // Redirige vers la page d'accueil ou une page d'accès refusé
      router.push("/");
      return;
    }
  }, [session, status, requiredRole, router]);

  if (status === "loading") {
    return <p>Chargement de l&apos;authentification...</p>;
  }


  // Note: Si une redirection a eu lieu dans l'effet, ce rendu ne sera pas visible
  // car la page aura déjà changé.
  if (session && (!requiredRole || session?.user?.role === requiredRole)) {
    return <>{children}</>;
  }

  // Si l'utilisateur n'est pas autorisé et qu'une redirection a été initiée,
  // ce composant ne rendra rien ou un fallback minimal le temps de la redirection.
  return null;
};

export default ProtectedRoute;
