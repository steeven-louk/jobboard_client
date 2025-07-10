"use client";
import React, { useEffect, useState } from "react";

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
  picture?: string | File;
  email: string;
  Experience?: IExperience[];
  Diplome?:IDiplome[];

}

const Profil = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [userDetail, setUserDetail] = useState<IProfilDetail | undefined>(undefined);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true); // État de chargement de la page

  const userRole = session?.user?.role ;
  const userId: string = session?.user?.id || "";


  const fetchUserProfile = async () => {
    setIsPageLoading(true); // Active le chargement de la page
    try {
      const data = await getUserProfile();
      setUserDetail(data || undefined ); // S'assurer que c'est undefined si null
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la récupération du profil.");
      console.error("❌ Erreur lors de la récupération du profil :", error);
      setUserDetail(undefined); // Réinitialise les détails de l'utilisateur en cas d'erreur
    } finally {
      setIsPageLoading(false); // Désactive le chargement de la page
    }
  };

  // Effet pour récupérer le profil au montage du composant
  useEffect(() => {
    // Ne pas tenter de récupérer le profil si la session n'est pas encore chargée
    // ou si l'utilisateur n'est pas authentifié (ProtectedRoute gérera la redirection).
    if (sessionStatus === "authenticated") {
      fetchUserProfile();
    }
  }, [sessionStatus]);

  

  const deleteExperience = async (id: number) => {
    try {
      await handleDeleteExperience(id);
      toast.success("Expérience supprimée avec succès !");
      await fetchUserProfile(); // Re-charger le profil après suppression pour rafraîchir l'UI
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la suppression de l'expérience.");
      console.error("❌ Erreur lors de la suppression de l'expérience :", error);
    }
  };
  
  const deleteFormation = async (id: number) => {
    try {
      await handleDeleteFormation(id);
      toast.success("Formation supprimée avec succès !");
      await fetchUserProfile(); // Re-charger le profil après suppression pour rafraîchir l'UI
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la suppression de la formation.");
      console.error("❌ Erreur lors de la suppression de la formation :", error);
    }
  };

  // const handleProfilUpdate = async (updatedProfil:IProfilDetail, imageFile?: File | null) => {
  //   setUserDetail(updatedProfil);

  //   try {
  //     await updateUserProfile(userId, updatedProfil);
  //     // console.log("profile mis a jour avec succes")
  //   } catch (error) {
  //     toast("Erreur lors de la modification du profil");
  //     console.log("Erreur lors de la modification du profil", error);
  //   }
  // };

    const handleProfilUpdate = async (updatedProfil: IProfilDetail, imageFile?: File | null) => {
    try {
      // updateUserProfile attend un IUpdateUserProfileData qui inclut File | string pour picture
      // Il faut donc s'assurer de passer le bon type.
      // Si un nouveau fichier est sélectionné, on le passe. Sinon, on passe l'URL existante ou undefined.
      const dataToSend = {
        ...updatedProfil,
        picture: imageFile || (updatedProfil.picture || undefined), // Priorise le fichier, sinon l'URL, sinon undefined
      };

      await updateUserProfile(userId, dataToSend);
      // Le toast.success est déjà géré par updateUserProfile
      await fetchUserProfile(); // Re-charger le profil après mise à jour pour rafraîchir l'UI
    } catch (error: any) {
      // Le toast.error est déjà géré par updateUserProfile
      console.error("❌ Erreur lors de la modification du profil :", error);
    }
  };

    // Affiche un skeleton de page pendant le chargement initial du profil
  if (isPageLoading || sessionStatus === "loading") {
    return <h1>Chargement....</h1>;
    // return <ProfilePageSkeleton />;
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
                  src={typeof userDetail?.picture || "/placeholder.svg"}
                  alt={`${userDetail?.fullName || "Utilisateur"} photo de profil`}
                  width={150}
                  height={150}
                  className="rounded-full w-[7rem] h-[7rem] object-cover bg-gray-200 mr-4 border-2 border-primary"
                  // className="rounded-full w-[7rem] bg-red-500 h-[7rem] bg-cover  max-w-full max-h-full  mr-4"
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

          {/* {userRole === "USER" && (
            <>
              <section className="my-4 shadow-md p-3 rounded-md bg-white">
                <div className="flex gap-4 md:gap-0 align-baseline md:flex-row flex-col justify-between">
                  <div>
                    <h1 className="font-bold text-2xl">Expérience</h1>
                    <p>
                      Parlez-nous de vos expériences passées et actuelles, de
                      vos Projets
                    </p>
                  </div>
                  <ExperienceModal />
                </div>

                <Separator className="my-5" />
                {userDetail && userDetail.Experience &&  userDetail?.Experience?.length > 0 ? (
                  userDetail?.Experience?.map((exp) => (
                    <Card className="p-4 border-none shadow-none" key={exp.id}>
                      <div className="flex justify-between">
                        <div className="flex flex-col align-baseline gap-3">
                          <span>Intitulé de poste</span>
                          <CardTitle>{exp.title}</CardTitle>
                        </div>
                        <div className="btn-group inline-flex gap-3">
                         
                          <ExperienceModal experience={exp} />
                          <Button
                            onClick={() => deleteExperience(exp.id)}
                            variant={"destructive"}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="mt-6 grid gap-4 md:gap-0">
                        <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                          <span className="text-gray-500">
                            Entreprise ou client
                          </span>
                          <p className=" font-semibold inline-flex align-baseline">
                            <Building /> {exp.entreprise}
                          </p>
                        </div>
                        <div className="grid md:mt-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                          <span className="text-gray-500">Localisation</span>
                          <p className="relative text-start">{exp.location}</p>
                        </div>
                        <div className="grid md:my-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                          <span className="text-gray-500">Type de contrat</span>
                          <p className="">{exp.contract}</p>
                        </div>
                        <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                          <span className="text-gray-500">Date</span>
                          <p className="inline-flex gap-3">
                            De{" "}
                            <span>
                              {exp.date_debut ? new Date(exp?.date_debut).toLocaleDateString() : "N/A"}
                            </span>{" "}
                            à
                            <span>
                              {exp.date_fin ? new Date( exp?.date_fin).toLocaleDateString() : "Présent"}
                            </span>
                          </p>
                        </div>
                        <div className="flex md:my-4 flex-col md:flex-row gap-1 md:gap-5">
                          <span className="text-gray-500">
                            Description, missions
                          </span>
                          <p className="md:ml-[7.5rem]">{exp.description}</p>
                        </div>
                        <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                          <span className="text-gray-500">Compétences</span>
                          <div className="flex flex-wrap gap-2">
                            {exp.competence?.split(",")
                              .map((skill: string, index: number) => (
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
                  <p>Aucune expérience enregistrée.</p>
                )}
              </section>

              <section className="my-5 shadow-md p-3 rounded-md bg-white">
                <div className="flex gap-4 md:gap-0 align-baseline md:flex-row flex-col justify-between">
                  <div>
                    <h1 className="font-bold text-2xl">
                      Diplômes & formations
                    </h1>
                    <p>
                      Listez vos diplômes, formations et certifications
                      pertinents.
                    </p>
                  </div>

                  <DiplomeModal />
                </div>
                <Separator className="my-5" />
                {userDetail?.Diplome && userDetail?.Diplome?.length > 0 ? (
                  userDetail?.Diplome?.map((diplome) => (
                    <Card key={diplome.id} className="border-none shadow-none">
                   
                      <CardContent className="mt-6 grid gap-4 md:gap-0 p-0 md:p-2">
                        <div className="flex justify-between align-base">
                          <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                            <span className="text-gray-500">Nom</span>
                            <p className=" font-semibold inline-flex align-baseline">
                              {diplome?.title}
                            </p>
                          </div>
                          <div className="btn-group inline-flex gap-3">

                            <DiplomeModal diplome={diplome} />
                            <Button
                              className="cursor-pointer"
                              onClick={() => handleDeleteFormation(diplome?.id)}
                              variant={"destructive"}
                            >
                              <Trash2 />
                            </Button>
                          </div>
                        </div>
                     
                        <div className="grid md:mt-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                          <span className="text-gray-500">Niveau</span>
                          <p className="relative text-start">
                            {diplome?.level}
                          </p>
                        </div>
                        <div className="grid md:my-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                          <span className="text-gray-500">
                            École ou organisme
                          </span>
                          <p className="font-semibold inline-flex align-baseline">
                            <Building />
                            {diplome?.school}
                          </p>
                        </div>
                        <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                          <span className="text-gray-500">Date</span>
                          <p className="inline-flex gap-3">
                            De{" "}
                            <span>
                              {diplome?.date_debut? new Date(
                                diplome?.date_debut
                              ).toLocaleDateString() : "N/A"}
                            </span>{" "}
                            à
                            <span>
                              {diplome?.date_fin ? new Date(diplome?.date_fin).toLocaleDateString():"Présent"}
                            </span>
                          </p>
                        </div>

                        <div className="flex md:my-4 flex-col md:flex-row  gap-1 md:gap-5">
                          <span className="text-gray-500">Description</span>
                          <p className="md:ml-[12rem]">
                            {diplome?.description}
                          </p>
                        </div>
                        <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                          <span className="text-gray-500">Compétences</span>
                          <div className="flex flex-wrap gap-2">
                            {diplome?.competence?.split(",")
                              .map((skill: string, index: number) => (
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
                  <p>Aucun diplome enregistrée.</p>
                )}
              </section>
            </>
          )} */}
                  {/* Section Expérience (visible uniquement pour les utilisateurs "USER") */}
        {userRole === "USER" && (
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
                <ExperienceModal onSuccess={fetchUserProfile} />
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
                        <ExperienceModal experience={exp} onSuccess={fetchUserProfile} />
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
                <DiplomeModal onSuccess={fetchUserProfile} />
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
                        <DiplomeModal diplome={diplome} onSuccess={fetchUserProfile} />
                        <Button
                          className="cursor-pointer"
                          onClick={() => deleteFormation(diplome.id)}
                          variant={"destructive"}
                          size="icon" // Bouton plus petit pour l'icône
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
