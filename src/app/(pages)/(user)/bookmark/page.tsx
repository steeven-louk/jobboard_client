"use client";
import React, { useEffect, useState } from "react";

import { HeaderComponent } from "@/app/components/headerComponent";
import { JobCard } from "@/app/components/jobCard";

// import { toast } from "sonner";
import { getFavoris } from "@/app/services/favorisService";
import { JobCardSkeleton } from "@/app/components/skeletons/job-card-skeleton";
import ProtectedRoute from "@/app/components/protectedRoutes";
import { toast } from "react-toastify";


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
  };
}

interface IFavoris {
  id: number;
  job: IJob;
}
const Bookmark = () => {
  const [getBookmark, setGetBookmark] = useState<IFavoris[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleGetBookmark = async () => {
      try {
        const favoris: IFavoris[] = await getFavoris();
        setGetBookmark(favoris);
      } catch (error) {
        toast.error("Erreur lors de la récupération des favoris");
        console.log("erreur lors de la recuperation des favoris", error);
      }finally{
        setIsLoading(false);
      }
    };
    handleGetBookmark();
  }, []);
  return (
    <ProtectedRoute>
      <div>
        <HeaderComponent pageName="Bookmark" />

        <div className="container my-5 mx-auto p-5">
          {isLoading ? (
            <JobCardSkeleton />
          ) : getBookmark?.length > 0 ? (
            getBookmark?.map((favoris) => (
              <div key={favoris?.id}>
                <JobCard path={""} job={favoris?.job} />
              </div>
            ))
          ) : (
            <p>Aucun favoris trouvé</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Bookmark;
