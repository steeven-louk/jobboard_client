// "use client";
// import { HeaderComponent } from "@/app/components/headerComponent";
// import { JobCard } from "@/app/components/jobCard";

// import { Suspense, useEffect, useState } from "react";

// import SearchBar from "@/app/components/searchBar";
// import { useSearchParams } from "next/navigation";
// import { JobFilters } from "@/app/components/jobFilter";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { JobCardSkeleton } from "@/app/components/skeletons/job-card-skeleton";
// import { getAllJob } from "@/app/services/jobService";
// import { toast } from "sonner";

// interface jobType {
//   id: number;
//   title: string;
//   description: string;
//   skill: string;
//   requirement: string;
//   location: string;
//   salary: number | null;
//   duration: string;
//   jobType: string;
//   isPremium: boolean;
//   createdAt: string | Date;
//   company: {
//     logo: string | null;
//     domaine: string | null;
//   };
// }

// export default function Jobs() {
//   const searchParams = useSearchParams();
//   // const initialSearchTerm = searchParams.get("search") || "";
//   const JOBS_PER_PAGE = 6;

//   const [getJobs, setJobs] = useState<jobType[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
//   const [sortBy, setSortBy] = useState("");
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const [contractTypes, setContractTypes] = useState({
//     cdi: false,
//     cdd: false,
//     stage: false,
//     freelance: false,
//   });

//   const [experienceLevels, setExperienceLevels] = useState({
//     junior: false,
//     intermediaire: false,
//     senior: false,
//   });

//   // ✅ Met à jour la recherche uniquement si `initialSearchTerm` change
//   // useEffect(() => {
//   //   setSearchTerm(initialSearchTerm);
//   //   // if(searchTerm !== initialSearchTerm){
//   //   //   setSearchTerm(initialSearchTerm);
//   //   // }
//   // }, [initialSearchTerm]);
//   useEffect(() => {
//     const initialSearchTerm = searchParams.get("search") || "";
//     setSearchTerm(initialSearchTerm);
//   }, [searchParams]);


//   useEffect(() => {
//     const getAllJobs = async () => {
//       try {
//         setIsLoading(true);
//         const data = await getAllJob();
//        if(data)setJobs(data || []);
//       } catch (error) {
//         toast.error("Erreur lors de la récupération des jobs");
//         console.error("❌ Erreur récupération jobs:", error);
//       } finally {
//         setTimeout(() => setIsLoading(false), 500);
//       }
//     };
//     getAllJobs();
//   }, []);

//   // ✅ Filtrage des jobs
//   const filteredJobs = getJobs
//     ?.filter((job) => {
//       if (!searchTerm.trim()) return true;
//       const searchLower = searchTerm.toLowerCase();
//       return (
//         job?.title?.toLowerCase().includes(searchLower) ||
//         job?.description?.toLowerCase().includes(searchLower) ||
//         job?.company?.domaine?.toLowerCase()?.includes(searchLower)
//       );
//     })
//     .filter((job) => {
//       if (Object.values(contractTypes).every((v) => !v)) return true;
//       return (
//         contractTypes[
//           job?.jobType?.toLowerCase() as keyof typeof contractTypes
//         ] || false
//       );
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "recent":
//           return (
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//           );
//         case "salary-high":
//           return (b.salary || 0) - (a.salary || 0);
//         case "salary-low":
//           return (a.salary || 0) - (b.salary || 0);
//         case "company":
//           return a.company?.domaine?.localeCompare(b?.company?.domaine ??"") ?? 0;
//         default:
//           return 0;
//       }
//     });

//   // ✅ Pagination
//   const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
//   const paginatedJobs = filteredJobs.slice(
//     (currentPage - 1) * JOBS_PER_PAGE,
//     currentPage * JOBS_PER_PAGE
//   );

//   // ✅ Fonctions pour modifier les filtres et la recherche
//   const handleSortChange = (value: string) => {
//     setSortBy(value);
//     setCurrentPage(1);
//   };

//   const handleContractTypeChange = (type: keyof typeof contractTypes) => {
//     setContractTypes((prev) => ({ ...prev, [type]: !prev[type] }));
//     setCurrentPage(1);
//   };

//   const handleExperienceLevelChange = (
//     level: keyof typeof experienceLevels
//   ) => {
//     setExperienceLevels((prev) => ({ ...prev, [level]: !prev[level] }));
//     setCurrentPage(1);
//   };

//   const handleSearch = (term: string) => {
//     setSearchTerm(term.trim());
//     setCurrentPage(1);
//   };

//   const clearFilters = () => {
//     setSortBy("");
//     setContractTypes({
//       cdi: false,
//       cdd: false,
//       stage: false,
//       freelance: false,
//     });
//     setExperienceLevels({ junior: false, intermediaire: false, senior: false });
//     setSearchTerm("");
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
//   return (
//     <Suspense>
//       <div className="w-full">
//       <HeaderComponent pageName="Jobs" />

//       <section className="container mx-auto flex flex-col p-3">
//         <h1 className="text-3xl font-bold mb-8">
//           Offres d&apos;emploi disponibles
//         </h1>

//         <SearchBar onSearch={handleSearch} initialSearchTerm={searchTerm} />

//         <div className="flex flex-col md:flex-row gap-8 mt-8">
//           <aside className="w-full h-fit md:w-[20rem] rounded-md">
//             <JobFilters
//               sortBy={sortBy}
//               contractTypes={contractTypes}
//               experienceLevels={experienceLevels}
//               onSortChange={handleSortChange}
//               onContractTypeChange={()=>handleContractTypeChange}
//               onExperienceLevelChange={()=>handleExperienceLevelChange}
//               onClearFilters={clearFilters}
//             />
//           </aside>
//           <main className="w-full ">
//             <div className="job_component mt-5">
//               {isLoading ? (
//                 <div className="space-y-4">
//                   {[...Array(JOBS_PER_PAGE)].map((_, index) => (
//                     <JobCardSkeleton key={index} />
//                   ))}
//                 </div>
//               ) : (
//                 paginatedJobs.map((job) => (
//                   <JobCard key={job.id} job={job} path="" />
//                 ))
//               )}
//               {paginatedJobs.length === 0 && <p>Aucun emploi trouvé.</p>}
//             </div>
//             <div className="pagination w-full">
//               {totalPages > 1 && (
//                 <div className="flex justify-between items-center mt-8">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                   >
//                     <ChevronLeft className="h-4 w-4 mr-2" />
//                     Précédent
//                   </Button>
//                   <span>
//                     Page {currentPage} sur {totalPages}
//                   </span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     aria-label="Page suivante"
//                   >
//                     Suivant
//                     <ChevronRight className="h-4 w-4 ml-2" />
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </main>
//         </div>
//       </section>
//     </div>
//     </Suspense>
//   );
// }
"use client";
// import { HeaderComponent } from "@/app/components/headerComponent";
import { JobCard } from "@/app/components/jobCard";
import { Suspense, useEffect, useState } from "react";
import SearchBar from "@/app/components/searchBar";
import { useSearchParams } from "next/navigation";
import { JobFilters } from "@/app/components/jobFilter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { JobCardSkeleton } from "@/app/components/skeletons/job-card-skeleton";
import { getAllJob } from "@/app/services/jobService";
import { toast } from "sonner";

interface JobType {
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

export default function JobContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const JOBS_PER_PAGE = 6;
  const [getJobs, setJobs] = useState<JobType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [contractTypes, setContractTypes] = useState({
    cdi: false,
    cdd: false,
    stage: false,
    freelance: false,
  });

  const [experienceLevels, setExperienceLevels] = useState({
    junior: false,
    intermediaire: false,
    senior: false,
  });

  // ✅ Met à jour la recherche depuis les paramètres d'URL
  useEffect(() => {
    const initialSearchTerm = searchParams.get("search") || "";
    setSearchTerm(initialSearchTerm);
  }, [searchParams]);

  // ✅ Récupération des offres d'emploi
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const data = await getAllJob();
        if (data) setJobs(data);
      } catch (error) {
        toast.error("Erreur lors de la récupération des jobs");
        console.error("❌ Erreur récupération jobs:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    fetchJobs();
  }, []);

  // ✅ Filtrage des jobs
  const filteredJobs = getJobs
    ?.filter((job) => {
      if (!searchTerm.trim()) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        job?.title?.toLowerCase().includes(searchLower) ||
        job?.description?.toLowerCase().includes(searchLower) ||
        job?.company?.domaine?.toLowerCase()?.includes(searchLower)
      );
    })
    .filter((job) => {
      if (Object.values(contractTypes).every((v) => !v)) return true;
      return contractTypes[job?.jobType?.toLowerCase() as keyof typeof contractTypes] || false;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "salary-high":
          return (b.salary || 0) - (a.salary || 0);
        case "salary-low":
          return (a.salary || 0) - (b.salary || 0);
        case "company":
          return a.company?.domaine?.localeCompare(b?.company?.domaine ?? "") ?? 0;
        default:
          return 0;
      }
    });

  // ✅ Pagination
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);

  // ✅ Fonctions pour modifier les filtres et la recherche
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
    setContractTypes({ cdi: false, cdd: false, stage: false, freelance: false });
    setExperienceLevels({ junior: false, intermediaire: false, senior: false });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <div className="w-full">
        {/* <HeaderComponent pageName="Jobs" /> */}

        <section className="container mx-auto flex flex-col p-3">
          <h1 className="text-3xl font-bold mb-8">Offres d&apos;emploi disponibles</h1>

          <SearchBar onSearch={handleSearch} initialSearchTerm={searchTerm} />

          <div className="flex flex-col md:flex-row gap-8 mt-8">
            <aside className="w-full h-fit md:w-[20rem] rounded-md">
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
              <div className="job_component mt-5">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(JOBS_PER_PAGE)].map((_, index) => (
                      <JobCardSkeleton key={index} />
                    ))}
                  </div>
                ) : (
                  paginatedJobs.map((job) => <JobCard key={job.id} job={job} path="" />)
                )}
                {paginatedJobs.length === 0 && <p>Aucun emploi trouvé.</p>}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-8">
                  <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Précédent
                  </Button>
                  <span>Page {currentPage} sur {totalPages}</span>
                  <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Suivant <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </main>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
