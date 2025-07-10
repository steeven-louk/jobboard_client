"use client";
import React, { useEffect, useState } from "react";

import { HeaderComponent } from "@/app/components/headerComponent";
import { JobCard } from "@/app/components/jobCard";

import { getFavoris } from "@/app/services/favorisService";
import { JobCardSkeleton } from "@/app/components/skeletons/job-card-skeleton";
import ProtectedRoute from "@/app/components/protectedRoutes";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";


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
  const [bookmarkedJobs, setBookmarkedJobs] = useState<IFavoris[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBookmarkedJobs = async () => {
    setIsLoading(true); // Active le chargement
    try {
      const favorisData: IFavoris[] | null = await getFavoris(); // Le service peut retourner null ou un tableau
      setBookmarkedJobs(favorisData || []); // S'assurer que c'est un tableau vide si null
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la récupération des favoris.");
      console.error("❌ Erreur lors de la récupération des favoris :", error);
      setBookmarkedJobs([]); // Réinitialise les favoris en cas d'erreur
    } finally {
      setIsLoading(false); // Désactive le chargement
    }
  };

  useEffect(() => {
    // Ne tente de récupérer les favoris que si la session est authentifiée.
    // ProtectedRoute gérera la redirection si l'utilisateur n'est pas connecté.
    if (sessionStatus === "authenticated") {
      fetchBookmarkedJobs();
    }
  }, [sessionStatus]); 

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
          ) : bookmarkedJobs.length > 0 ? (
            // Affiche les JobCards si des favoris sont trouvés
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bookmarkedJobs.map((favorisItem) => (
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
