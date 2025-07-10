"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { JobCard } from "./jobCard";
import { getAllJob } from "../services/jobService";
import { JobCardSkeleton } from "./skeletons/job-card-skeleton";


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
  };
}
export const RecentJobs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recentJobs, setRecentJobs] = useState<IJob[]>([]);;

  useEffect(() => {
    const getRecentJob = async () => {
      try {
        setIsLoading(true);
        const data:IJob[] = await getAllJob();

        const filteredData = data?.slice(0, 4);
        setRecentJobs(filteredData);
      } catch (error) {
        console.error("❌ Erreur récupération jobs:", error);
        
      } finally {
        setIsLoading(false);
      }
    };
    getRecentJob();
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
      ) : (
        recentJobs
          ?.slice(0, 6)
          .map((job) => <JobCard path={""} key={job?.id} job={job} />)
      )}
    </section>
  );
};
