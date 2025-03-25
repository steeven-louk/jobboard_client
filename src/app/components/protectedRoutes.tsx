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
    if (status === "loading") return;

    if (!session) {
      // toast.error("Vous devez être connecté pour accéder à cette page !");
      // alert("Vous devez être connecté pour accéder à cette page !");
      toast.error("Vous devez être connecté pour accéder à cette page !");

      router.push("/auth/login");
    } else if (requiredRole && session?.user?.role !== requiredRole) {
      // toast.warning("Accès réservé aux recruteurs !");
      alert("Accès réservé aux recruteurs !");
      toast.warning("Accès réservé aux recruteurs !");
      // console.log("Accès réservé aux recruteurs !");
      router.push("/");
    }
  }, [session, status, requiredRole, router]);

  if (status === "loading") return <p>Chargement...</p>;

  return <>{children}</>;
};

export default ProtectedRoute;
