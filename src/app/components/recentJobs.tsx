"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { JobCard } from "./jobCard";
import { getAllJob } from "../services/jobService";
import { JobCardSkeleton } from "./skeletons/job-card-skeleton";

export const RecentJobs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    const getRecentJob = async () => {
      try {
        setIsLoading(true);
        const data = await getAllJob();
        const filteredData = data.slice(0, 4);
        setRecentJobs(filteredData);
      } catch (error) {
        // toast.error("Erreur lors de la récupération des jobs");
        console.error("❌ Erreur récupération jobs:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
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
        <Link href={"/jobs"} className="underline color-primary font-semibold">
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
