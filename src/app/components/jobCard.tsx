"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import {
  BookmarkPlus,
  BriefcaseBusiness,
  Clock,
  Globe2,
  MapPin,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatedRelativeTime } from "../utils/formatRelativeTime";

import { useSession } from "next-auth/react";
import { isInFavorite, toggleFavorite } from "../services/favorisService";
import Image from "next/image";
import { toast } from "react-toastify";

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
    name:string
  };
}

interface JobCardProps {
  path?: string;
  job: IJob;
}


export const JobCard = ({ path, job }: JobCardProps) => {
  const { data: session, status: sessionStatus } = useSession(); // Récupère le statut de la session
  const userRole = session?.user?.role;
  const [isFavorite, setIsFavorite] = useState<boolean>(false); 


  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (sessionStatus === "authenticated" && userRole === "USER" && job?.id) {
        try {
          const favoriteStatus = await isInFavorite(job.id);
          setIsFavorite(favoriteStatus || false); // S'assurer que c'est un booléen
        } catch (error) {
          console.error("❌ Erreur lors de la vérification du statut favori :", error);
        }
      }
    };
    checkFavoriteStatus();
  }, [sessionStatus, userRole, job?.id]);


  /**
   * @function handleToggleFavorite
   * @description Gère l'ajout ou la suppression d'une offre d'emploi des favoris.
   * Affiche des messages toast pour informer l'utilisateur.
   */
  const handleToggleFavorite = async () => {
    // Vérification de l'authentification avant toute opération sur les favoris
    if (sessionStatus !== "authenticated") {
      toast.warning("Vous devez être connecté pour gérer vos favoris.");
      return;
    }
    // Vérification du rôle de l'utilisateur
    if (userRole !== "USER") {
      toast.warning("Seuls les utilisateurs peuvent gérer les favoris.");
      return;
    }

    try {
      const jobId = job.id;
      const newFavoriteStatus = await toggleFavorite(jobId);
      setIsFavorite(newFavoriteStatus); 

    } catch (error) {
      console.error("❌ Erreur lors de l'opération sur les favoris :", error);
    }
  };



  return (
    <Card className="card shadow-md hover:shadow-slate-400 transition-shadow p-3 shadow-slate-700 rounded-md my-5">
      <div className="flex justify-between mb-3">
        <Badge className="text-base  color-primary px-1 rounded-md bg-green-300">
          {job && formatedRelativeTime(new Date(job.createdAt))}
        </Badge>
        {userRole === "USER" && (
          <BookmarkPlus
            onClick={handleToggleFavorite}
            className={`w-6 h-6 cursor-pointer transition ${
              isFavorite === true
                ? "text-red-500  shadow-md shadow-gray-300"
                : "text-gray-400"
            }`}
          />
        )}
      </div>
      <CardContent className="card-header">
        <div className="flex gap-4">
          {job?.company?.logo ? (
            <Image
              src={job?.company?.logo}
              alt={`${job?.title}-logo`}
              width={50}
              height={50}
              className="rounded-full w-[3rem] h=[3rem] md:w-[5rem] md:h-[5rem] bg-cover  max-w-full max-h-full  mr-4"
            />
          ) : (
            <span className="icon">
              <Globe2 size={30} />
            </span>
          )}

          <div className="flex flex-col overflow-hidden">
            <CardTitle className="capitalize font-bold text-xl">
              {job?.title}
            </CardTitle>
            <CardDescription className="text-sm truncate w-[50rem]">
              {job?.description}
            </CardDescription>
          </div>
        </div>
      </CardContent>
      <CardFooter className="card-footer flex flex-col md:flex-row justify-between">
        <div className="md:inline-flex flex flex-wrap md:flex-nowrap gap-6 md:gap-5 mt-3">
          {job?.company?.domaine && (
            <span className="inline-flex gap-2">
              <BriefcaseBusiness className="color-primary" />
              {job?.company?.domaine}
            </span>
          )}
          {job?.duration && (
            <span className="inline-flex gap-2">
              <Clock className="color-primary" />
              {job?.duration}
            </span>
          )}
          {job?.salary !== null && (
            <span className="inline-flex gap-2">
              <Wallet className="color-primary" />${job?.salary}
            </span>
          )}
          <span className="inline-flex gap-2">
            <MapPin className="color-primary" />
            {job?.location}
          </span>
        </div>
        {!path && (
          <Button
            asChild
            className=" rounded-md p-2 capitalize mt-4 md:mt-0 w-36"
          >
            <Link href={`/jobs/${job?.id}`}>job detail</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
