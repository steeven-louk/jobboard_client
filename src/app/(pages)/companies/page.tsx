"use client";
import { useEffect, useState } from "react";

import { CompanyCard } from "@/app/components/company-card";
import { Pagination } from "@/app/components/pagination";
import { CompanyCardSkeleton } from "@/app/components/skeletons/company-card-skeleton";
import { getCompanies } from "@/app/services/companyService";

import { toast } from "sonner";

export default function CompaniesPage() {
  const [Companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);

  const JOBS_PER_PAGE = 6;

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const response = await getCompanies();
        setCompanies(response);
      } catch (error) {
        toast("Erreur", {
          description: "Erreur lors de la récupération des company",
        });
        console.log("erreur lors de la recuperation des company", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };
    getAllCompanies();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(Companies?.length / JOBS_PER_PAGE);
  const paginatedJobs = Companies?.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Entreprises</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(6)].map((_, index) => <CompanyCardSkeleton key={index} />)
          : paginatedJobs?.map((company) => (
              <CompanyCard key={company?.id} company={company} />
            ))}
        {Companies?.length === 0 && <p>Aucun job trouvé</p>}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={() => handlePageChange}
      />
    </div>
  );
}
