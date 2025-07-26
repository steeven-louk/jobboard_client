"use client";
import React from "react";

import { HeaderComponent } from "@/app/components/headerComponent";
import DiplomeModal from "@/app/components/modals/diplomeModal";
import ProfilModal from "@/app/components/modals/profilModal";
import ExperienceModal from "@/app/components/modals/updateExperienceModal";
import ProtectedRoute from "@/app/components/protectedRoutes";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { BriefcaseBusiness, Building, Cake, Mail, MapPin, Phone, Trash2, User } from "lucide-react";

import { useSession } from "next-auth/react";

import {
  getUserProfile,
  updateUserProfile,
} from "@/app/services/profileService";
import { handleDeleteExperience } from "@/app/services/experienceService";
import { handleDeleteFormation } from "@/app/services/diplomeService";

import Image from "next/image";
import { toast } from "react-toastify";
import { ProfilePageSkeleton } from "@/app/components/skeletons/Skeletons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



interface IDiplome {
  id: number;
  title: string;
  school: string;
  location: string;
  date: string;
  date_debut: string;
  date_fin: string;
  level:string;
  competence?: string;
  description?:string
}

interface IExperience {
  id: number;
  title: string;
  entreprise: string;
  location: string;
  contract: string;
  date_debut: string;
  date_fin: string;
  description: string;
  competence: string;
  en_cours: boolean;
}

interface IProfilDetail {
  sexe: "Homme" | "Femme" | string; 
  fullName: string;
  id: string;
  phone: string;
  location: string;
  birthdate: Date | string ;
  domaine: string;
  picture?: string | null;
  email: string;
  Experience?: IExperience[];
  Diplome?:IDiplome[];
}

const Profil = () => {
  const { data: session, status: sessionStatus } = useSession();
  const authenticated = sessionStatus === "authenticated"

  const userRole = session?.user?.role ;
  const userId: string = session?.user?.id || "";

  const queryClient = useQueryClient();

  const {
    data: userDetail,
    isLoading: isPageLoading,
    refetch: refetchUserProfile,
  } = useQuery<IProfilDetail | undefined> ({
    queryKey: ["id", userId],
    queryFn: async()=>{
      const data = await getUserProfile()
      return data || undefined; // S'assurer que c'est undefined si null
    },
    enabled: authenticated, // Ne lance la requête que si l'utilisateur est authentifié
  });

  const deleteExperienceMutation = useMutation({
    mutationFn: handleDeleteExperience,
    onSuccess: () => {
      toast.success("Expérience supprimée !");
      queryClient.invalidateQueries({ queryKey: ["id", userId] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la suppression.");
    },
  });

  
  const deleteFormationMutation = useMutation({
    mutationFn: handleDeleteFormation,
    onSuccess: () => {
      toast.success("Formation supprimée !");
      queryClient.invalidateQueries({ queryKey: ["id", userId] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la suppression.");
    },
  });


  const updateProfileMutation = useMutation({
    mutationFn: async({
      updatedProfil,
      imageFile,
    }: {
      updatedProfil: IProfilDetail;
      imageFile?: File | null;
    }) => {
      const dataToSend = {
        ...updatedProfil,
        picture: imageFile || updatedProfil.picture || undefined,
      };
      const data = await updateUserProfile(userId, dataToSend);
      return data;
    },
    onSuccess: () => {
      // Invalide la requête pour recharger le profil mis à jour
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la mise à jour du profil.");
    },
  });

  const deleteExperience = async (id: number) => {
    deleteExperienceMutation.mutate(id);
  };

  const deleteFormation = async (id: number) => {
   deleteFormationMutation.mutate(id);
  };

  const handleProfilUpdate = async (updatedProfil: IProfilDetail, imageFile?: File | null) => {
    updateProfileMutation.mutate({updatedProfil, imageFile});
  };

    // Affiche un skeleton de page pendant le chargement initial du profil
  if (isPageLoading || sessionStatus === "loading") {
    return <ProfilePageSkeleton />;
  }

  
  return (
    <>
      <ProtectedRoute>
        <HeaderComponent pageName={"Profil"} />
        <div className="container mx-auto px-4">
          <Card className="p-2 md:p-4 my-5">
            <div className="flex justify-between my-5 flex-col md:flex-row items-center md:items-start">
              <div className="left inline-flex gap-3 md:items-baseline items-center flex-col md:flex-row ">
                <Image
                  src={userDetail?.picture || "/placeholder.svg"}
                  alt={`${userDetail?.fullName || "Utilisateur"} photo de profil`}
                  width={150}
                  height={150}
                  className="rounded-full w-[7rem] h-[7rem] object-cover bg-gray-200 mr-4 border-2 border-primary"
                />
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-2xl font-bold">{userDetail?.fullName}</CardTitle>
                  <CardDescription className="text-lg text-gray-600">{userDetail?.domaine}</CardDescription>
                  <Separator className="w-16 my-3 mx-auto md:mx-0" />
                </div>
              </div>

              <ProfilModal
                profil={userDetail}
                onSubmit={handleProfilUpdate}
                onClose={()=>{}}
              />
            </div>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="inline-flex items-center gap-2">
              <Mail className="text-primary" />
              <span>{userDetail?.email || "Non renseigné"}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Cake className="text-primary" />
              <span>
                {userDetail?.birthdate
                  ? new Date(userDetail.birthdate).toLocaleDateString("fr-FR")
                  : "Non renseigné"}
              </span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Phone className="text-primary" />
              <span>{userDetail?.phone || "Non renseigné"}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <User className="text-primary" />
              <span>{userDetail?.sexe || "Non renseigné"}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <MapPin className="text-primary" />
              <span>{userDetail?.location || "Non renseigné"}</span>
            </div>
          </CardContent>
          </Card>
          <Separator className="my-5" />

          {/* Section Expérience (visible uniquement pour les utilisateurs "USER") */}
        {(userRole === "USER" && authenticated) && (
          <>
            <section className="my-4 shadow-md p-3 rounded-md bg-white">
              <div className="flex gap-4 md:gap-0 items-baseline md:flex-row flex-col justify-between">
                <div>
                  <h1 className="font-bold text-2xl">Expériences</h1>
                  <p className="text-gray-600">
                    Parlez-nous de vos expériences passées et actuelles, de vos projets.
                  </p>
                </div>
                {/* Modal d'ajout d'expérience */}
                <ExperienceModal onSuccess={refetchUserProfile} />
              </div>

              <Separator className="my-5" />
              {userDetail?.Experience && userDetail.Experience.length > 0 ? (
                userDetail.Experience.map((exp) => (
                  <Card className="p-4 border-none shadow-none mb-4" key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-sm">Intitulé de poste</span>
                        <CardTitle className="text-xl font-bold">{exp.title}</CardTitle>
                      </div>
                      <div className="btn-group inline-flex gap-3">
                        {/* Modal de modification d'expérience */}
                        <ExperienceModal experience={exp} onSuccess={refetchUserProfile} />
                        <Button
                          onClick={() => deleteExperience(exp.id)}
                          variant={"destructive"}
                          size="icon" // Bouton plus petit pour l'icône
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="mt-4 grid gap-2 p-0">
                      <div className="grid md:grid-cols-[150px_1fr] items-center gap-1 md:gap-5">
                        <span className="text-gray-500">Entreprise ou client</span>
                        <p className="font-semibold inline-flex items-center gap-2">
                          <Building className="h-4 w-4 text-primary" /> {exp.entreprise}
                        </p>
                      </div>
                      <div className="grid md:grid-cols-[150px_1fr] items-center gap-1 md:gap-5">
                        <span className="text-gray-500">Localisation</span>
                        <p className="relative text-start inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" /> {exp.location}
                        </p>
                      </div>
                      <div className="grid md:grid-cols-[150px_1fr] items-center gap-1 md:gap-5">
                        <span className="text-gray-500">Type de contrat</span>
                        <p className="inline-flex items-center gap-2">
                          <BriefcaseBusiness className="h-4 w-4 text-primary" /> {exp.contract}
                        </p>
                      </div>
                      <div className="grid md:grid-cols-[150px_1fr] items-center gap-1 md:gap-5">
                        <span className="text-gray-500">Date</span>
                        <p className="inline-flex gap-3 items-center">
                          De{" "}
                          <span className="font-medium">
                            {exp.date_debut ? new Date(exp.date_debut).toLocaleDateString("fr-FR") : "N/A"}
                          </span>{" "}
                          à
                          <span className="font-medium">
                            {exp.en_cours ? "Présent" : exp.date_fin ? new Date(exp.date_fin).toLocaleDateString("fr-FR") : "N/A"}
                          </span>
                        </p>
                      </div>
                      <div className="grid md:grid-cols-[150px_1fr] gap-1 md:gap-5 mt-2">
                        <span className="text-gray-500">Description, missions</span>
                        <p>{exp.description}</p>
                      </div>
                      <div className="grid md:grid-cols-[150px_1fr] gap-1 md:gap-5 mt-2">
                        <span className="text-gray-500">Compétences</span>
                        <div className="flex flex-wrap gap-2">
                          {exp.competence?.split(",").map((skill: string, index: number) => (
                            <Badge key={index} className="relative w-fit">
                              {skill.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <Separator className="my-5" />
                  </Card>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Aucune expérience enregistrée.</p>
              )}
            </section>

            {/* Section Diplômes & Formations (visible uniquement pour les utilisateurs "USER") */}
            <section className="my-5 shadow-md p-3 rounded-md bg-white">
              <div className="flex gap-4 md:gap-0 items-baseline md:flex-row flex-col justify-between">
                <div>
                  <h1 className="font-bold text-2xl">Diplômes & formations</h1>
                  <p className="text-gray-600">
                    Listez vos diplômes, formations et certifications pertinents.
                  </p>
                </div>
                {/* Modal d'ajout de diplôme */}
                <DiplomeModal onSuccess={refetchUserProfile} />
              </div>
              <Separator className="my-5" />
              {userDetail?.Diplome && userDetail.Diplome.length > 0 ? (
                userDetail.Diplome.map((diplome) => (
                  <Card key={diplome.id} className="border-none shadow-none mb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-sm">Nom du diplôme</span>
                        <CardTitle className="text-xl font-bold">{diplome.title}</CardTitle>
                      </div>
                      <div className="btn-group inline-flex gap-3">
                        {/* Modal de modification de diplôme */}
                        <DiplomeModal diplome={diplome} onSuccess={refetchUserProfile} />
                        <Button
                          className="cursor-pointer"
                          onClick={() => deleteFormation(diplome.id)}
                          variant={"destructive"}
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="mt-4 grid gap-2 p-0">
                      <div className="grid md:grid-cols-[150px_1fr] items-center gap-1 md:gap-5">
                        <span className="text-gray-500">Niveau</span>
                        <p className="relative text-start">{diplome.level}</p>
                      </div>
                      <div className="grid md:grid-cols-[150px_1fr] items-center gap-1 md:gap-5">
                        <span className="text-gray-500">École ou organisme</span>
                        <p className="font-semibold inline-flex items-center gap-2">
                          <Building className="h-4 w-4 text-primary" /> {diplome.school}
                        </p>
                      </div>
                      <div className="grid md:grid-cols-[150px_1fr] items-center gap-1 md:gap-5">
                        <span className="text-gray-500">Localisation</span>
                        <p className="relative text-start inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" /> {diplome.location}
                        </p>
                      </div>
                      <div className="grid md:grid-cols-[150px_1fr] items-center gap-1 md:gap-5">
                        <span className="text-gray-500">Date</span>
                        <p className="inline-flex gap-3 items-center">
                          De{" "}
                          <span className="font-medium">
                            {diplome.date_debut ? new Date(diplome.date_debut).toLocaleDateString("fr-FR") : "N/A"}
                          </span>{" "}
                          à
                          <span className="font-medium">
                            {diplome.date_fin ? new Date(diplome.date_fin).toLocaleDateString("fr-FR") : "N/A"}
                          </span>
                        </p>
                      </div>
                      <div className="grid md:grid-cols-[150px_1fr] gap-1 md:gap-5 mt-2">
                        <span className="text-gray-500">Description</span>
                        <p>{diplome.description}</p>
                      </div>
                      <div className="grid md:grid-cols-[150px_1fr] gap-1 md:gap-5 mt-2">
                        <span className="text-gray-500">Compétences</span>
                        <div className="flex flex-wrap gap-2">
                          {diplome.competence?.split(",").map((skill: string, index: number) => (
                            <Badge key={index} className="relative w-fit">
                              {skill.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <Separator className="my-5" />
                  </Card>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Aucun diplôme enregistré.</p>
              )}
            </section>
          </>
        )}
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Profil;
