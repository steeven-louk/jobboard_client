"use client"
import React from 'react'

import { HeaderComponent } from '@/app/components/headerComponent'
import { JobCard } from '@/app/components/jobCard';
import ProtectedRoute from '@/app/components/protectedRoutes';

import { getUserApplications } from '@/app/services/applicationService';

import { JobCardSkeleton } from '@/app/components/skeletons/job-card-skeleton';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';


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
    const authenticated = sessionStatus === "authenticated"; // Vérifie si l'utilisateur est authentifié  

    const { data: applications = [], isLoading, isError, error } = useQuery<IApplications[]>({
      queryKey: ['user-applications'],
      queryFn: async() =>{
            try {
                const data = await getUserApplications();
                // la fonction renvoie un tableau vide si les données sont null ou undefined
                return data || [];
            } catch (err: any) {
                // Lance l'erreur pour que react-query la gère et la mette dans `error`
                throw new Error(err.message || "Erreur lors de la récupération des candidatures.");
            }
        },
      enabled: authenticated, // Ne lance la requête que si l'utilisateur est authentifié
    })

     if (isError) {
        return (
            <ProtectedRoute requiredRole="USER">
                <div>
                    <HeaderComponent pageName="Mes Candidatures" />
                    <div className="container my-5 mx-auto p-5 text-center text-red-600">
                        <p>Une erreur est survenue lors du chargement de vos candidatures.</p>
                        <p>{error?.message}</p>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

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
          ) : (applications as IApplications[]).length > 0 ? (
            // Affiche les JobCards si des candidatures sont trouvées
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(applications as IApplications[]).map((applicationItem) => (
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