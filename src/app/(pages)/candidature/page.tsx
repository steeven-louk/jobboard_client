"use client"
import React, { useEffect, useState } from 'react'

import { HeaderComponent } from '@/app/components/headerComponent'
import { JobCard } from '@/app/components/jobCard';
import ProtectedRoute from '@/app/components/protectedRoutes';

import { getUserApplications } from '@/app/services/applicationService';

import { JobCardSkeleton } from '@/app/components/skeletons/job-card-skeleton';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';


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
      picture:string
      name: string;
    };
  }
  
  interface IApplications {
    id: string;
    job?: IJob;
  }

const Candidature = () => {;
    const { status: sessionStatus } = useSession(); // Récupère uniquement le statut de la session
    const [applications, setApplications] = useState<IApplications[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 


  const fetchUserApplications = async () => {
    setIsLoading(true); 
    try {
      const data = await getUserApplications(); 
      setApplications(data || []); 
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la récupération des candidatures.");
      console.error("❌ Erreur lors de la récupération des candidatures :", error);
      setApplications([]); // Réinitialise les candidatures en cas d'erreur
    } finally {
      setIsLoading(false); 
    }
  };

  // Effet pour récupérer les candidatures au montage du composant
  useEffect(() => {
    // Ne tente de récupérer les candidatures que si la session est authentifiée.
    // ProtectedRoute gérera la redirection si l'utilisateur n'est pas connecté.
    if (sessionStatus === "authenticated") {
      fetchUserApplications();
    }
  }, [sessionStatus]);

    return (
        <ProtectedRoute requiredRole="USER">
        <div>
        <HeaderComponent pageName="Mes Candidatures" /> 

        <div className="container my-5 mx-auto p-5">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <JobCardSkeleton key={index} />
              ))}
            </div>
          ) : applications.length > 0 ? (
            // Affiche les JobCards si des candidatures sont trouvées
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {applications.map((applicationItem) => (
                // Assurez-vous que applicationItem.job est toujours défini avant de le passer à JobCard
                applicationItem.job ? (
                  <JobCard path={""} key={applicationItem.id} job={applicationItem.job} />
                ) : null // Ne rend rien si l'objet job est manquant
              ))}
            </div>
          ) : (
            // Message si aucune candidature n'est trouvée
            <p className="text-gray-500 text-center py-10">Aucune candidature trouvée pour le moment.</p>
          )}
        </div>
      </div>
        </ProtectedRoute>
    )
}

export default Candidature
