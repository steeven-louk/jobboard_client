"use client";

import React, { use } from "react";

import { DrawerForm } from "@/app/components/drawerForm";
import { HeaderComponent } from "@/app/components/headerComponent";
import { JobCard } from "@/app/components/jobCard";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { BriefcaseBusiness, Building, CalendarDays, Clock, DollarSign, Heart, Loader2, MapPin, Slash } from "lucide-react";

import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react";
import { getDetailJob } from "@/app/services/jobService";
import { toggleFavorite, isInFavorite } from "@/app/services/favorisService";
import { toast } from "react-toastify";
import { JobDetailSkeleton } from "@/app/components/skeletons/Skeletons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



interface IJobDetail{
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
    name:string
  };
}
const JobDetail = ({ params }: { params: Promise<{ id: number }> }) => {
  const path = usePathname();
  const { id } = use(params);

  const { data: session, status: sessionStatus } = useSession();
  const userRole = session?.user?.role;
  const isAuthenticated = sessionStatus ==="authenticated"
  const queryClient = useQueryClient();

  const { data: jobDetail, isLoading, isError } = useQuery<IJobDetail | null>({
    queryKey: ["job", id],
    queryFn: async()=> await getDetailJob(id),
    enabled: !!id, // Ne lance la requête que si l'ID est disponible
  });

    const {
    data: isFavorite,
    isFetching: isTogglingFavorite,
  } = useQuery({
    queryKey: ['favorite', id],
    queryFn: () => isInFavorite(id),
    enabled: !!id && isAuthenticated,
  });

    const favoriteMutation = useMutation({
    mutationFn: () => toggleFavorite(id),
    onSuccess: (newStatus: boolean) => {
      queryClient.setQueryData(['favorite', id], newStatus);
      toast.success(
        newStatus
          ? 'Offre ajoutée aux favoris avec succès !'
          : 'Offre retirée des favoris avec succès !'
      );
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la mise à jour du favori.');
    },
  });


    /**
   * @function handleToggleFavorite
   * @description Gère l'ajout/retrait de l'offre aux favoris.
   * Nécessite une connexion utilisateur.
   */
  const handleToggleFavorite = async () => {

    if (!isAuthenticated) {
      toast.info("Vous devez être connecté pour ajouter ou retirer des favoris.");
      return;
    }
    favoriteMutation.mutate();
  };

  // Affiche un skeleton de page pendant le chargement
  if (isLoading) {
    return <JobDetailSkeleton />;
  }

  // Si le job n'est pas trouvé après le chargement
  if (isError || !jobDetail) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-700">Offre d&apos;emploi non trouvée</h1>
        <p className="mt-4 text-gray-500">Désolé, l&apos;offre d&apos;emploi que vous recherchez n&apos;existe pas ou a été supprimée.</p>
      </div>
    );
  }

  return (
    <div>
      <HeaderComponent pageName="Détails de l'offre" />
      <Breadcrumb className="ml-5 p-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash className="h-4 w-4 text-gray-500" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/jobs">Offres d&apos;emploi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash className="h-4 w-4 text-gray-500" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Détails du job</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="container mx-auto p-3 md:p-0">
        <JobCard path={path} job={jobDetail} />

        <main className="grid md:grid-cols-6 gap-8 mt-4">
          <section className="md:col-span-4">
            <Card className="p-4 shadow-md mb-5">
              <CardTitle className="capitalize text-2xl font-bold mb-5">
                Description du poste
              </CardTitle>
              <CardContent className="whitespace-pre-wrap text-gray-700 p-0"> 
                {jobDetail?.description || "Aucune description disponible."}
              </CardContent>
            </Card>
            <Card className="p-4 shadow-md mb-5">
              <CardTitle className="capitalize text-2xl font-bold mb-5">
                Compétences requises
              </CardTitle>
              <CardContent className="whitespace-pre-wrap text-gray-700 p-0">
                {jobDetail?.skill || "Aucune compétence spécifiée."}
              </CardContent>
            </Card>
            <Card className="p-4 shadow-md mb-5">
              <CardTitle className="capitalize text-2xl font-bold mb-5">
                Exigences du poste
              </CardTitle>
              <CardContent className="whitespace-pre-wrap text-gray-700 p-0">
                {jobDetail?.requirement || "Aucune exigence spécifiée."}
              </CardContent>
            </Card>
          </section>

          <aside className="md:col-span-2">
            <Card className="card p-4 md:sticky md:top-11 shadow-md shadow-black">
              <CardTitle className="text-xl font-bold mb-3">Postuler à cette offre</CardTitle>
              <CardDescription className="my-3 text-gray-600">
                Intéressé(e) par ce poste de <span className="font-semibold">{jobDetail?.title}</span> chez{" "}
                <span className="font-semibold">{jobDetail?.company?.name}</span> ?
              </CardDescription>
              <div className="btn-group flex flex-col gap-4 mt-4">
                {(userRole === "USER" && isAuthenticated )&& (
                  <DrawerForm
                    jobId={id}
                    jobTitle={jobDetail?.title ?? ""}
                    companyName={jobDetail?.company.name ?? ""}
                  />
                )}
                {isAuthenticated && (
                  <Button
                    onClick={handleToggleFavorite}
                    variant={isFavorite ? "destructive" : "outline"}
                    className={`w-full transition font-semibold flex items-center gap-2`}
                    disabled={isTogglingFavorite} // Désactive le bouton pendant la bascule
                  >
                    {isTogglingFavorite ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isFavorite ? (
                      <Heart className="h-4 w-4 fill-current" /> 
                    ) : (
                      <Heart className="h-4 w-4" />
                    )}
                    {isTogglingFavorite
                      ? "Mise à jour..."
                      : isFavorite
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"}
                  </Button>

                )}
              </div>
            </Card>
            {/* Informations supplémentaires sur l'offre */}
            <Card className="card p-4 mt-4 shadow-md">
                <CardTitle className="text-xl font-bold mb-3">Détails de l&apos;offre</CardTitle>
                <div className="space-y-3 text-gray-700">
                    <p className="flex items-center gap-2">
                        <BriefcaseBusiness className="h-5 w-5 text-primary" />
                        <strong>Type de contrat :</strong> {jobDetail?.jobType || "Non spécifié"}
                    </p>
                    <p className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <strong>Salaire :</strong> {jobDetail?.salary ? `${jobDetail.salary} €` : "Non spécifié"}
                    </p>
                    <p className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <strong>Localisation :</strong> {jobDetail?.location || "Non spécifiée"}
                    </p>
                    <p className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <strong>Durée :</strong> {jobDetail?.duration || "Non spécifiée"} mois
                    </p>
                    <p className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        <strong>Entreprise :</strong> {jobDetail?.company?.name || "Non spécifiée"}
                    </p>
                    <p className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-primary" />
                        <strong>Date de publication :</strong>{" "}
                        {jobDetail?.createdAt ? new Date(jobDetail.createdAt).toLocaleDateString("fr-FR") : "Non spécifiée"}
                    </p>
                </div>
            </Card>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default JobDetail;
