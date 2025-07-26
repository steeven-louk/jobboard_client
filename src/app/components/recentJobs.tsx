"use client";

import Link from "next/link";
import React from "react";
import { JobCard } from "./jobCard";
import { getAllJob } from "../services/jobService";
import { JobCardSkeleton } from "./skeletons/job-card-skeleton";
import { useQuery } from "@tanstack/react-query";


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

  const { data:recentJobs, isLoading } = useQuery({
    queryKey: ["recentJobs"],
    queryFn: async () => {
        const data: IJob[] | null = await getAllJob();
        if (data) {
          const filteredData = data.slice(0, 6);
          return filteredData;
        } 
    },
  });



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
      ):recentJobs && recentJobs.length > 0 ? (
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
