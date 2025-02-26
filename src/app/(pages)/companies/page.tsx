"use client"
import { CompanyCard } from "@/app/components/company-card"
import { CompanyCardSkeleton } from "@/app/components/skeletons/company-card-skeleton"
import { getCompanies } from "@/app/services/companyService"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

// Données mockées pour les entreprises
// const mockCompanies = [
//   { id: "1", name: "TechCorp", industry: "Technologie", location: "Paris", employeeCount: "500-1000" },
//   { id: "2", name: "DesignStudio", industry: "Design", location: "Lyon", employeeCount: "50-200" },
//   { id: "3", name: "DataInsights", industry: "Analyse de données", location: "Bordeaux", employeeCount: "200-500" },
// ]

export default function CompaniesPage() {
    const [Companies, setCompanies] = useState();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const companie_url ="http://localhost:5800/api/company/all-companies"

    useEffect(() => {
        const getAllCompanies =async()=>{
            try {
                const response = await getCompanies();

                    setCompanies(response)

                    setTimeout(() => {
                      setIsLoading(false)
                    }, 1500)
                
            } catch (error) {
                console.log("erreur lors de la recuperation des company",error)
            }
        };
        getAllCompanies();
    }, []);
// if(Companies?.length <=0){
//   <p>Aucun job trouvé</p>
// }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Entreprises</h1>
        {/* <Link href="/companies/new">
          <Button>Ajouter une entreprise</Button>
        </Link> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ?  [...Array(6)].map((_, index) => 
        <CompanyCardSkeleton key={index} />)
      :
        Companies?.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
        {Companies?.length === 0 && <p>Aucun job trouvé</p>}
      </div>
    </div>
  )
}

