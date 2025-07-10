import React, { JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MapPin,
  BriefcaseBusiness,
  DollarSign,
  Clock,
  Building,
  CalendarDays,
  Users,
} from "lucide-react";



/**
 * @function ApplicationDetailSkeleton
 * @description Composant de squelette de chargement pour la page de détails d'une candidature.
 * Il simule la mise en page de la page de détails, affichant des placeholders pour
 * les informations du candidat, le CV, la lettre de motivation et les actions.
 *
 * @returns {JSX.Element} Un composant de squelette représentant la page de détails.
 */
export function ApplicationDetailSkeleton(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bouton retour */}
      <Skeleton className="h-10 w-32 mb-4 rounded-md flex items-center justify-center">
        <ArrowLeft className="mr-2 h-4 w-4 text-gray-400 animate-pulse" />
        <span className="text-gray-400">Retour</span>
      </Skeleton>

      {/* Titre de la page */}
      <Skeleton className="h-9 w-2/3 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Colonne principale : Profil, CV, Lettre de motivation */}
        <Card className="md:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-7 w-3/4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">
                  <Skeleton className="h-8 w-20" />
                </TabsTrigger>
                <TabsTrigger value="resume">
                  <Skeleton className="h-8 w-16" />
                </TabsTrigger>
                <TabsTrigger value="coverLetter">
                  <Skeleton className="h-8 w-28" />
                </TabsTrigger>
              </TabsList>

              {/* Contenu de l'onglet "Profil" */}
              <TabsContent value="profile" className="flex flex-col md:flex-row flex-wrap-reverse md:justify-between items-center md:items-start mt-4">
                <div className="space-y-4 flex-1 min-w-[50%]">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
                <div className="img my-auto mt-4 md:mt-0 md:ml-4">
                  <Skeleton className="h-[170px] w-[170px] rounded-md" />
                </div>
              </TabsContent>

              {/* Contenu de l'onglet "CV" */}
              <TabsContent value="resume" className="mt-4">
                <Skeleton className="h-10 w-40 rounded-md" />
              </TabsContent>

              {/* Contenu de l'onglet "Lettre de motivation" */}
              <TabsContent value="coverLetter" className="mt-4">
                <Skeleton className="h-10 w-56 rounded-md mb-4" />
                <Skeleton className="h-24 w-full rounded-md" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Colonne latérale : Actions */}
        <Card className="h-fit shadow-md">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-7 w-24" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * @function JobDetailSkeleton
 * @description Composant de squelette de chargement pour la page de détails d'une offre d'emploi.
 * Il simule la mise en page de la page de détails, affichant des placeholders pour
 * le titre du job, la description, les compétences, les exigences et les informations latérales.
 *
 * @returns {JSX.Element} Un composant de squelette représentant la page de détails du job.
 */
export function JobDetailSkeleton(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section supérieure : Titre du job et logo de l'entreprise */}
      <div className="flex items-center mb-6 flex-col md:flex-row text-center md:text-left">
        <Skeleton className="rounded-full h-[9rem] w-[9rem] mr-4" />
        <Skeleton className="h-10 w-1/2 mt-4 md:mt-0" />
      </div>

      <div className="grid md:grid-cols-6 gap-8 mt-4">
        {/* Colonne principale : Description, Compétences, Exigences */}
        <section className="md:col-span-4">
          <Card className="p-4 shadow-md mb-5">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-7 w-2/3" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Skeleton className="h-24 w-full mb-2" />
              <Skeleton className="h-6 w-5/6" />
            </CardContent>
          </Card>
          <Card className="p-4 shadow-md mb-5">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-7 w-1/3" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Skeleton className="h-20 w-full mb-2" />
              <Skeleton className="h-6 w-4/5" />
            </CardContent>
          </Card>
          <Card className="p-4 shadow-md mb-5">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-7 w-1/2" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Skeleton className="h-20 w-full mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </CardContent>
          </Card>
        </section>

        {/* Colonne latérale : Postuler et Détails de l'offre */}
        <aside className="md:col-span-2">
          <Card className="card p-4 shadow-md mb-4">
            <CardTitle>
              <Skeleton className="h-7 w-24 mb-3" />
            </CardTitle>
            <Skeleton className="h-16 w-full mb-4" /> {/* Placeholder pour la description "Intéressé par..." */}
            <Skeleton className="h-10 w-full rounded-md mb-2" /> {/* Bouton Postuler */}
            <Skeleton className="h-10 w-full rounded-md" /> {/* Bouton Favoris */}
          </Card>

          <Card className="card p-4 mt-4 shadow-md">
            <CardTitle>
              <Skeleton className="h-7 w-2/3 mb-3" />
            </CardTitle>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-5 w-5 text-gray-400 animate-pulse" />
                <Skeleton className="h-5 w-3/4" />
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-400 animate-pulse" />
                <Skeleton className="h-5 w-1/2" />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400 animate-pulse" />
                <Skeleton className="h-5 w-2/3" />
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400 animate-pulse" />
                <Skeleton className="h-5 w-1/3" />
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-gray-400 animate-pulse" />
                <Skeleton className="h-5 w-3/4" />
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-gray-400 animate-pulse" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

/**
 * @function CompanyProfileSkeleton
 * @description Composant de squelette de chargement pour la page de profil d'une entreprise.
 * Il simule la mise en page de la page de profil, incluant le logo, le nom,
 * la description, les offres d'emploi et les informations latérales.
 *
 * @returns {JSX.Element} Un composant de squelette représentant la page de profil d'entreprise.
 */
export function CompanyProfileSkeleton(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section supérieure : Logo et nom de l'entreprise */}
      <div className="flex items-center mb-6 flex-col md:flex-row text-center md:text-left">
        <Skeleton className="rounded-full h-[9rem] w-[9rem] mr-4" />
        <Skeleton className="h-10 w-1/2 mt-4 md:mt-0" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Colonne principale : À propos et Offres d'emploi */}
        <div className="md:col-span-2">
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-7 w-2/3" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full mb-2" />
              <Skeleton className="h-6 w-5/6" />
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-7 w-1/2" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Plusieurs JobCardSkeleton pour simuler les offres d'emploi */}
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <div className="flex items-center space-x-4 mb-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <Skeleton className="h-9 w-24" />
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Placeholder pour la pagination */}
          <div className="mt-8 flex justify-center">
            <Skeleton className="h-10 w-48 rounded-md" />
          </div>
        </div>

        {/* Colonne latérale : Informations de l'entreprise et Actions du recruteur */}
        <div>
          <Card className="shadow-md mb-4">
            <CardContent className="space-y-3 py-4">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-5 w-5 text-gray-400 animate-pulse" />
                <Skeleton className="h-5 w-2/3" />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400 animate-pulse" />
                <Skeleton className="h-5 w-3/4" />
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-400 animate-pulse" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-3 shadow-md">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-7 w-2/3" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
