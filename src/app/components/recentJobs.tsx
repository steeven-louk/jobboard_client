"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { JobCard } from "./jobCard";
import { getAllJob } from "../services/jobService";
import { JobCardSkeleton } from "./skeletons/job-card-skeleton";
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
    name:string;
  };
}
export const RecentJobs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recentJobs, setRecentJobs] = useState<IJob[]>([]);;

  useEffect(() => {
    const fetchRecentJobs = async () => {
      setIsLoading(true);
      try {
        const data: IJob[] | null = await getAllJob(); 
        if (data) {
          const filteredData = data.slice(0, 6);
          setRecentJobs(filteredData);
        } else {

          console.warn("⚠️ Aucune donnée d'emploi récente récupérée.");
          setRecentJobs([]); 
        }
      } catch (error: any) {
        console.error("❌ Erreur lors de la récupération des emplois récents :", error);
        toast.error(error.message || "Erreur lors de la récupération des emplois récents.");
        setRecentJobs([]);
      } finally {
        setIsLoading(false); // Termine le chargement
      }
    };

    fetchRecentJobs();
  }, []);

  return (
    <section className="container px-4 md:px-10 mx-auto mt-5 md:my-10">
      <div className="flex justify-between md:mb-5 mb:2">
        <h1 className="capitalize font-bold text-2xl md:text-3xl">
          emplois récents disponibles
        </h1>
        <Link href={"/jobs"} className="underline text-primary font-semibold">
          Voir plus
        </Link>
      </div>

      {isLoading ? (
        <div className="space-x-4">
          {[...Array(4)].map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </div>
      ): recentJobs.length > 0 ? (
          // Affiche les offres d'emploi si disponibles
          recentJobs
            .slice(0, 6)
            .map((job) => <JobCard path={""} key={job.id} job={job} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Aucun emploi récent disponible pour le moment.
          </p>
        )}
    </section>
  );
};
