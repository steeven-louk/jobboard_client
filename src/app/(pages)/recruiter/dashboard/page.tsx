"use client";

import {  useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { JobCard } from "@/app/components/jobCard";
import ProtectedRoute from "@/app/components/protectedRoutes";

import {
  getCompanyApplyJobs,
  getCompanyJobs,
} from "@/app/services/companyService";
import { toast } from "react-toastify";
import { JobCardSkeleton } from "@/app/components/skeletons/job-card-skeleton";
import { ApplicationCardSkeleton } from "@/app/components/skeletons/ApplicationCardSkeleton";
import { useQuery } from "@tanstack/react-query";


interface IApplication {
  id: number;
  status: string;
  user: {
    fullName: string;
    email: string;
  };
}

interface IJobWithApplications {
  id: string;
  title: string;
  applications?: IApplication[]; // Tableau des candidatures pour ce job
}

interface IPostedJob{
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
    name: string;
  };
}
export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");

  /**
   * @function fetchCompanyJobs
   * @description Récupère les offres d'emploi publiées par l'entreprise.
   */
    // ✅ Requête pour récupérer les offres publiées
  const {
    data: postedJobs = [],
    isLoading: isLoadingJobs,
  } = useQuery<IPostedJob[] | null>({
    queryKey: ["company-jobs"],
    queryFn: async () => {
      try {
        const data = await getCompanyJobs();
        if (data === null || data === undefined) {
          return [];
        };
        return data;
      } catch (error: any) {
        toast.error(error.message || "Erreur lors de la récupération des offres d'emploi.");
        return [];
      }
    },
    enabled: activeTab === "jobs", // Ne s'active que si l'onglet "jobs" est sélectionné
  });


  /**
   * @function fetchCompanyApplications
   * @description Récupère les candidatures reçues pour les offres de l'entreprise.
   */

  const {
    data: receivedApplications = [],
    isLoading: isLoadingApplications,
  } = useQuery<IJobWithApplications[] | null>({
    queryKey: ["company-applications"],
    queryFn: async () => {
      try {
        const data = await getCompanyApplyJobs();
        if (data === null || data === undefined) {
          return [];
        }
        return data;
      } catch (error: any) {
        toast.error(error.message || "Erreur lors de la récupération des candidatures.");
        return [];
      }
    },
    enabled: activeTab === "applications", // Ne s'active que si l'onglet "applications" est sélectionné
    

  });

  
  return (
    <ProtectedRoute requiredRole="RECRUITER"> {/* Protège la route pour les recruteurs */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord recruteur</h1>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "jobs" | "applications")}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs">Vos offres d&apos;emploi</TabsTrigger>
            <TabsTrigger value="applications">Candidatures reçues</TabsTrigger>
          </TabsList>

          {/* Contenu de l'onglet "Offres d'emploi" */}
          <TabsContent value="jobs">
            <Link href="/companies/jobs/new" className="block mb-4">
              <Button className="w-full md:w-auto">Publier une nouvelle offre</Button>
            </Link>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Vos offres d&apos;emploi publiées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoadingJobs ? (
                    // Affiche des squelettes pendant le chargement des offres
                    [...Array(3)].map((_, index) => <JobCardSkeleton key={index} />)
                  ) : postedJobs && postedJobs?.length > 0 ? (
                    // Affiche les offres d'emploi si disponibles
                    postedJobs.map((job) => <JobCard key={job.id} job={job} path={`/jobs/${job.id}`} />)
                  ) : (
                    // Message si aucune offre n'est publiée
                    <p className="text-gray-500 text-center py-4">Aucune offre d&apos;emploi publiée pour le moment.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenu de l'onglet "Candidatures" */}
          <TabsContent value="applications">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Candidatures reçues pour vos offres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoadingApplications ? (
                    // Affiche des squelettes pendant le chargement des candidatures
                    [...Array(3)].map((_, index) => <ApplicationCardSkeleton key={index} />)
                  ) :receivedApplications && receivedApplications?.length > 0 ? (
                    // Parcourt chaque job, puis chaque application pour ce job
                    receivedApplications.map((job) =>
                      job.applications && job.applications.length > 0 ? (
                        <div key={job.id} className="border-b pb-4 last:border-b-0"> {/* Séparateur pour chaque job */}
                          <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                          {job.applications.map((application) => (
                            <Card key={application.id} className="mb-2 last:mb-0">
                              <CardContent className="flex justify-between items-center p-4">
                                <div>
                                  <p className="font-semibold">{application.user.fullName}</p>
                                  <p className="text-sm text-gray-500">{application.user.email}</p> 
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 rounded-full text-sm
                                    ${application.status === "En attente" ? "bg-yellow-100 text-yellow-800" :
                                      application.status === "Accepté" ? "bg-green-100 text-green-800" :
                                      "bg-red-100 text-red-800"}`}
                                  >
                                    {application.status}
                                  </span>
                                  <Link href={`/recruiter/applications/${application.id}`}>
                                    <Button size="sm">Voir détails</Button>
                                  </Link>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : null
                    )
                  ) : (
                    // Message si aucune candidature n'est reçue
                    <p className="text-gray-500 text-center py-4">Aucune candidature reçue pour le moment.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}