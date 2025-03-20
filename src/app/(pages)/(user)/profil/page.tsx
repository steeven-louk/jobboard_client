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

import { Building, Cake, IdCard, Mail, Phone, Trash2 } from "lucide-react";

import { useSession } from "next-auth/react";

import {
  getUserProfile,
  updateUserProfile,
} from "@/app/services/profileService";
import { handleDeleteExperience } from "@/app/services/experienceService";
import { handleDeleteFormation } from "@/app/services/diplomeService";

import Image from "next/image";
import { toast } from "sonner";



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
  sexe: "Homme" | "Femme" | string; // 🔹 Correction du type `boolean` -> string
  fullName: string;
  id: string;
  phone: string;
  location: string;
  birthdate: Date | string ;
  domaine: string;
  picture?: string;
  email: string;
  Experience?: IExperience[];
  Diplome?:IDiplome[];

}

const Profil = () => {
  const [userDetail, setUserDetail] = useState<IProfilDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const userRole = session?.user?.role ;
  const userId: string = session?.user?.id || "";

console.log(isModalOpen)
  const deleteExperience = async (id: number) => {
    try {
      const experience = await handleDeleteExperience(id);
      console.log(experience);
    } catch (error) {
      toast("Erreur", {
        description: "Erreur lors de la suppression de l'experience",
      });
      console.log("erreur lors de la suppression de l'experience", error);
    }
  };

  useEffect(() => {
    const handleGetProfil = async () => {
      try {
        const data = await getUserProfile();
        setUserDetail(data);
      } catch (error) {
        toast("Erreur", {
          description: "Erreur lors de la recupération du profil",
        });
        console.log("erreur lors de la recuperation du profil", error);
      }
    };

    handleGetProfil();
  }, []);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleProfilUpdate = async (updatedProfil:IProfilDetail) => {
    setUserDetail(updatedProfil);

    try {
      await updateUserProfile(userId, updatedProfil);
      console.log("profile mis a jour avec succes")
    } catch (error) {
      toast("Erreur", {
        description: "Erreur lors de la modification du profil",
      });
      console.log("Erreur lors de la modification du profil", error);
    }
  };

  return (
    <>
      <ProtectedRoute>
        <HeaderComponent pageName={"Profil"} />
        <div className="container mx-auto px-4">
          <Card className="p-2 md:p-4 my-5">
            <div className="flex justify-between my-5">
              <div className="left inline-flex gap-3 items-baseline ">
                <Image
                  src={userDetail?.picture || "/placeholder.svg"}
                  alt={`${userDetail?.fullName} picture`}
                  width={150}
                  height={150}
                  className="rounded-full w-[7rem] bg-red-500 h-[7rem] bg-cover  max-w-full max-h-full  mr-4"
                />
                <div className="flex flex-col gap-2">
                  <CardTitle>{userDetail?.fullName}</CardTitle>
                  <CardDescription>{userDetail?.domaine}</CardDescription>
                  <Separator className="w-16 my-3" />
                </div>
              </div>

              <ProfilModal
                profil={userDetail}
                onSubmit={handleProfilUpdate}
                onOpen={handleOpenModal}
                onClose={handleCloseModal}
              />
            </div>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="inline-flex align-baseline gap-2">
                <Mail />
                <span>{userDetail?.email}</span>
              </div>
              <div className="inline-flex align-baseline gap-2">
                <Cake />
                <span>
                  {userDetail?.birthdate?  new Date(userDetail?.birthdate).toLocaleDateString() : "Non renseigné"}
                </span>
              </div>
              <div className="inline-flex align-baseline gap-2">
                <Phone />
                <span>{userDetail?.phone}</span>
              </div>
              <div className="inline-flex align-baseline gap-2">
                <IdCard />
                <span>{userDetail?.sexe}</span>
              </div>
            </CardContent>
          </Card>
          <Separator className="my-5" />

          {userRole === "USER" && (
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
          )}
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Profil;
