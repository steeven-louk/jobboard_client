"use client";

import { JobCard } from "@/app/components/jobCard";
import { useEffect, useState } from "react";
import SearchBar from "@/app/components/searchBar";
import { useSearchParams } from "next/navigation";
import { JobFilters } from "@/app/components/jobFilter";
import { JobCardSkeleton } from "@/app/components/skeletons/job-card-skeleton";
import { getAllJob } from "@/app/services/jobService";
import { toast } from "react-toastify";
import { Pagination } from "@/app/components/pagination";
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
  jobType: string; // Ex: "CDI", "CDD", "STAGE", "FREELANCE", "INTERIM"
  isPremium: boolean;
  createdAt: string | Date;
  experienceLevel?: "junior" | "intermediaire" | "senior" | string; // Ajouté pour le filtrage par niveau d'expérience
  company: {
    logo: string | null;
    domaine: string | null;
    name: string;
  };
}
export default function JobContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  
  const JOBS_PER_PAGE = 6;

  const [contractTypes, setContractTypes] = useState<{
    cdi: boolean;
    cdd: boolean;
    stage: boolean;
    freelance: boolean;
    interim: boolean;
  }>({
    cdi: false,
    cdd: false,
    stage: false,
    freelance: false,
    interim: false,
  });

  const [experienceLevels, setExperienceLevels] = useState<{
    junior: boolean;
    intermediaire: boolean;
    senior: boolean;
  }>({
    junior: false,
    intermediaire: false,
    senior: false,
  });

  // Met à jour la recherche depuis les paramètres d'URL
  useEffect(() => {
    const initialSearchTerm = searchParams.get("search") || "";
    setSearchTerm(initialSearchTerm);
  }, [searchParams]);

    const {
      isPending: isLoading, error, data: jobs } = useQuery({
      queryKey: ['jobs'],
      queryFn: async () => {
        try {
          const data: IJob[] | undefined = await getAllJob();
          if (data === null || data === undefined) {
            return [];
          }
          if (error){
            console.log("error", error.message)
          }
          return data || undefined; 
        } catch (err: any) {
          toast.error(err.message || "Erreur lors de la récupération des offres d'emploi.");
          console.error("❌ Erreur lors de la récupération des offres d'emploi :", err);
          return []; // Retourne un tableau vide en cas d'erreur
        }
      },
    })


  // Pagination
    const filteredJobs = jobs
    ?.filter((job) => {
      // Filtrage par terme de recherche
      if (!searchTerm.trim()) return true; // Si pas de terme de recherche, inclure tous les jobs
      const searchLower = searchTerm.toLowerCase();
      return (
        job?.title?.toLowerCase().includes(searchLower) ||
        job?.description?.toLowerCase().includes(searchLower) ||
        job?.company?.domaine?.toLowerCase()?.includes(searchLower) ||
        job?.location?.toLowerCase().includes(searchLower) ||
        job?.skill?.toLowerCase().includes(searchLower)
      );
    })
    .filter((job) => {
      // Filtrage par type de contrat
      const activeContractFilters = Object.keys(contractTypes).filter(
        (key) => contractTypes[key as keyof typeof contractTypes]
      );
      if (activeContractFilters.length === 0) return true; // Si aucun filtre de contrat, inclure tous les jobs

      // Normalise le type de contrat du job pour la comparaison (ex: "CDI" -> "cdi")
      const jobContractTypeLower = job?.jobType?.toLowerCase();
      return activeContractFilters.includes(jobContractTypeLower);
    })
    .filter((job) => {
      // Filtrage par niveau d'expérience
      const activeExperienceFilters = Object.keys(experienceLevels).filter(
        (key) => experienceLevels[key as keyof typeof experienceLevels]
      );
      if (activeExperienceFilters.length === 0) return true; // Si aucun filtre d'expérience, inclure tous les jobs

      const jobExperienceLevelLower = job?.experienceLevel?.toLowerCase();
      return activeExperienceFilters.includes(jobExperienceLevelLower || "");
    })
    .sort((a, b) => {
      // Tri des offres d'emploi
      switch (sortBy) {
        case "recent":
          // Tri par date de création (du plus récent au plus ancien)
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "salary-high":
          // Tri par salaire (du plus élevé au plus bas)
          return (b.salary || 0) - (a.salary || 0);
        case "salary-low":
          // Tri par salaire (du plus bas au plus élevé)
          return (a.salary || 0) - (b.salary || 0);
        case "company":
          // Tri par nom de domaine de l'entreprise
          return a.company?.name?.localeCompare(b?.company?.name ?? "") ?? 0; 
        default:
          return 0; // Pas de tri par défaut
      }
    });
  const totalPages = Math.ceil((filteredJobs?.length ?? 0 )/ JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs?.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);

  // Fonctions pour modifier les filtres et la recherche
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleContractTypeChange = (type: keyof typeof contractTypes) => {
    setContractTypes((prev) => ({ ...prev, [type]: !prev[type] }));
    setCurrentPage(1);
  };

  const handleExperienceLevelChange = (level: keyof typeof experienceLevels) => {
    setExperienceLevels((prev) => ({ ...prev, [level]: !prev[level] }));
    setCurrentPage(1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term.trim());
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSortBy("");
    setContractTypes({ cdi: false, cdd: false, stage: false, freelance: false, interim: false });
    setExperienceLevels({ junior: false, intermediaire: false, senior: false });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="w-full">


        <section className="container mx-auto flex flex-col p-3">
          <h1 className="text-3xl font-bold mb-8">Offres d&apos;emploi disponibles</h1>

          <SearchBar onSearch={handleSearch} initialSearchTerm={searchTerm} />

          <div className="flex flex-col md:flex-row gap-8 mt-8">
            <aside className="w-full h-fit md:w-[20rem] rounded-md shadow-md">
              <JobFilters
                sortBy={sortBy}
                contractTypes={contractTypes}
                experienceLevels={experienceLevels}
                onSortChange={handleSortChange}
                onContractTypeChange={(type) => handleContractTypeChange(type as keyof typeof contractTypes)}
                onExperienceLevelChange={(type)=>handleExperienceLevelChange(type as keyof typeof experienceLevels)}
                onClearFilters={clearFilters}
              />
            </aside>
            <main className="w-full">
              <div className="space-y-4">
              {isLoading ? (
                // Affiche des squelettes pendant le chargement
                [...Array(JOBS_PER_PAGE)].map((_, index) => (
                  <JobCardSkeleton key={index} />
                ))
              ) : paginatedJobs && paginatedJobs.length > 0 ? (
                // Affiche les cartes d'emploi paginées
                paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job} path={""} /> // Lien vers la page de détail du job
                ))
              ) : (
                // Message si aucun emploi n'est trouvé après filtrage/recherche
                <p className="text-gray-500 text-center py-10">Aucun emploi trouvé correspondant à vos critères.</p>
              )}
            </div>
              {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
            </main>
          </div>
        </section>
      </div>
    </div>
  );
}
