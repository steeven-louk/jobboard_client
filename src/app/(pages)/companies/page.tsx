"use client";
import { useState } from "react";

import { CompanyCard } from "@/app/components/company-card";
import { Pagination } from "@/app/components/pagination";
import { CompanyCardSkeleton } from "@/app/components/skeletons/company-card-skeleton";
import { getCompanies } from "@/app/services/companyService";
import { useQuery } from "@tanstack/react-query";


interface ICompany {
  id: string;
  name: string;
  location: string;
  domaine: string;
  logo: string;
  employeeCount:string
  
}

export default function CompaniesPage() {

  const [currentPage, setCurrentPage] = useState<number>(1);

  const COMPANIES_PER_PAGE = 6;
  const {isLoading, data: companies =[]} = useQuery<ICompany[] | []>({
    queryKey: ['companies'],
    queryFn: async () => {
      const data = await getCompanies();
      return data || [];
    },
    
    staleTime: 1000 * 60 * 5, // Les données sont considérées comme "fraîches" pendant 5 minutes
  })


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
        <h1 className="text-3xl font-bold">Toutes les entreprises</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Affiche des squelettes pendant le chargement
          [...Array(COMPANIES_PER_PAGE)].map((_, index) => <CompanyCardSkeleton key={index} />)
        ) :paginatedCompanies.length > 0 ? (
          // Affiche les cartes d'entreprise si des entreprises sont trouvées
          paginatedCompanies.map((company:ICompany) => <CompanyCard key={company.id} company={company} />)
        ) : (
          // Message si aucune entreprise n'est trouvée
          <p className="col-span-full text-center text-gray-500 py-10">Aucune entreprise trouvée pour le moment.</p>
        )}
      </div>
      {/* Affiche la pagination uniquement s'il y a plus d'une page */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
