"use client";

import { HeaderComponent } from "@/app/components/headerComponent";
import { JobCard } from "@/app/components/jobCard";

import { getFavoris } from "@/app/services/favorisService";
import { JobCardSkeleton } from "@/app/components/skeletons/job-card-skeleton";
import ProtectedRoute from "@/app/components/protectedRoutes";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";


// ✅ Interface pour typer les favoris
interface IJob {
  id: number;
  title: string;
  description: string;
  skill: string;
  requirement: string;
  location: string;
  salary: number | null;
  duration: string;
  jobType: string;
  isPremium: boolean;
  createdAt: string | Date;
  company: {
    logo: string | null;
    domaine: string | null;
    name:string;
  };
}

interface IFavoris {
  id: number;
  job?: IJob;
}
const Bookmark = () => {
  const { status: sessionStatus } = useSession(); // Récupère uniquement le statut de la session
  const isAuthenticated = sessionStatus === "authenticated"; // Vérifie si l'utilisateur est authentifié

  const {
    isPending: isLoading,
    error,
    data: bookmarkedJobs,
    isError,
  } = useQuery({
    queryKey: ['bookmark'],
    queryFn: async () => {

      try {
        const data:IFavoris[] | null = await getFavoris();

        return data ??[]; // Retourne les données directement
      } catch (err: any) {
        // Lancez l'erreur pour que react-query puisse la capturer
        throw new Error(err.message || "Erreur lors de la récupération des favoris.");
      }
    },
    enabled: isAuthenticated, // N'exécute la requête que si l'utilisateur est authentifié
    refetchOnWindowFocus: false, // Ne pas rafraîchir lors du focus de la fenêtre
  });


    // Utilisation de isError pour afficher un message global si la requête a échoué
  if (isError) {
    return (
      <ProtectedRoute>
        <HeaderComponent pageName="Mes Favoris" />
        <div className="container my-5 mx-auto p-5 text-center text-red-600">
          <p>Une erreur est survenue lors du chargement de vos favoris.</p>
          <p>{error?.message}</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
           <div>
        <HeaderComponent pageName="Mes Favoris" /> {/* Nom de page plus descriptif */}

        <div className="container my-5 mx-auto p-5">
          {isLoading ? (
            // Affiche plusieurs squelettes pendant le chargement pour une meilleure UX
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <JobCardSkeleton key={index} />
              ))}
            </div>
          ) : (bookmarkedJobs && bookmarkedJobs.length > 0) ? (
            // Affiche les JobCards si des favoris sont trouvés
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">
              {bookmarkedJobs?.map((favorisItem) => (
                favorisItem.job ? (
                  <JobCard path={""} key={favorisItem.job.id} job={favorisItem.job} />
                ) : null // Ne rend rien si l'objet job est manquant
              ))}
            </div>
          ) : (
            // Message si aucun favori n'est trouvé
            <p className="text-gray-500 text-center py-10">Aucun favori trouvé pour le moment.</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Bookmark;
