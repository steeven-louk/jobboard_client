"use client";
import { useEffect, useState } from "react";

import { CompanyCard } from "@/app/components/company-card";
import { Pagination } from "@/app/components/pagination";
import { CompanyCardSkeleton } from "@/app/components/skeletons/company-card-skeleton";
import { getCompanies } from "@/app/services/companyService";

import { toast } from "sonner";

interface ICompany {
  id: string;
  name: string;
  location: string;
  domaine: string;
  logo: string;
  employeeCount:string
  
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const COMPANIES_PER_PAGE = 6;

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const response: ICompany[] = await getCompanies();
        setCompanies(response);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des entreprises :", error);
        toast.error("Erreur lors de la récupération des entreprises.");
      } finally {
        setIsLoading(false);
      }
    };
    getAllCompanies();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(companies.length / COMPANIES_PER_PAGE);
  const paginatedCompanies = companies.slice(
    (currentPage - 1) * COMPANIES_PER_PAGE,
    currentPage * COMPANIES_PER_PAGE
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Entreprises</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading
          ? [...Array(COMPANIES_PER_PAGE)].map((_, index) => <CompanyCardSkeleton key={index} />)
          : paginatedCompanies.length > 0 ? (
              paginatedCompanies.map((company) => <CompanyCard key={company.id} company={company} />)
            ) : (
              <p>Aucune entreprise trouvée</p>
            )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={() => handlePageChange}
      />
    </div>
  );
}
