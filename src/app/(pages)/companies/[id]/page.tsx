"use client"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// import JobCard from "@/app/jobs/components/job-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JobCard } from "@/app/components/jobCard"
import { SetStateAction, use, useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { getCompanyDetail, updateCompany } from "@/app/services/companyService"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CompanyEditForm } from "@/app/components/company-edit-form"
import { toast } from "sonner"
import { Pagination } from "@/app/components/pagination"

// const mockJobs = [
//   {
//     id: "1",
//     title: "Développeur Full Stack",
//     company: "TechCorp",
//     location: "Paris",
//     salary: "45k - 65k €",
//     type: "CDI",
//     postedAt: "2023-07-01",
//   },
//   {
//     id: "2",
//     title: "UX Designer",
//     company: "TechCorp",
//     location: "Paris",
//     salary: "40k - 60k €",
//     type: "CDI",
//     postedAt: "2023-07-02",
//   },
// ]

interface companyDetail{
  description: string
  name: string
  id:number
  // domaine:string
  location:string
  employeeCount:string
  domaine: string
  logo: string
}
export default function CompanyProfilePage({ params }: { params: Promise<{ id: string }> }) {
  // Dans une vraie application, vous feriez un appel API ici pour récupérer les données de l'entreprise
  // const company = mockCompany
  const {id} = use(params);
  const {data:session} = useSession()
  const userRole = session?.user?.role;
  const userId = session?.user?.id;

const [company, setCompany] = useState<companyDetail|null>(null);
// const [company, setCompany] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const JOBS_PER_PAGE = 4;
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// const companie_detail_url =`http://localhost:5800/api/company/company-detail/${parseInt(id)}`
// const companyJobUrl ="http://localhost:5800/api/company/company-job";
useEffect(() => {
    const getCompanyDetails =async()=>{
        try {
            const response = await getCompanyDetail(id)

                setCompany(response);
            
        } catch (error) {
          toast("Erreur", {
                  description: "Erreur lors de la recuperation des company",
                })
            console.log("erreur lors de la recuperation des company",error)
        }
    };
    getCompanyDetails();
}, [id]);

const handleCompanyUpdate =async (updatedCompany) => {
  setCompany(updatedCompany);
  try {
    const response = await updateCompany(id,userId, company);
    setIsEditModalOpen(false)
    console.log("response", response);
  } catch (error) {
    toast("Erreur", {
            description: "Erreur lors de la modification de la company",
          })
    console.log("erreur lors de la modification de la company",error)
  }
  toast("Company mis à jour")
  console.log("Company updated:", updatedCompany)
}

const handlePageChange = (page: number) => {
  setCurrentPage(page);
  window.scrollTo({ top: 0, behavior: "smooth" })
  
};
const totalPages = Math.ceil(company?.jobs?.length / JOBS_PER_PAGE);
const paginatedJobs = company?.jobs?.slice(
  (currentPage - 1) * JOBS_PER_PAGE,
  currentPage * JOBS_PER_PAGE
);
// console.log("pagination", company)

  return (
    <div className="container mx-auto md:px-4 py-8">
      <div className="flex items-center mb-6">
        <Image
          src={company?.logo || "/placeholder.svg"}
          alt={`${company?.name} logo`}
          width={150}
          height={150}
          className="rounded-full w-[9rem] h-[9rem] bg-cover  max-w-full max-h-full  mr-4"
        />
        <h1 className="text-3xl font-bold ml-4">{company?.name}</h1>
      </div>
      <div className="md:grid flex flex-col-reverse px-2 md:flex-none md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>À propos de l&apos;entreprise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{company?.description}</p>
              {/* <div className="space-y-2">
                <p>
                  <strong>Domaine :</strong> {company?.domaine || "non mentionner"}
                </p>
                <p>
                  <strong>Localisation :</strong> {company?.location}
                </p>
                <p>
                  <strong>Taille de l&apos;entreprise :</strong> {company?.employeeCount || 215} employés
                </p>
              </div> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offres d&apos;emploi actuelles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedJobs?.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <span>{company?.jobs.length <=0 && "aucun job"}</span>
            </CardContent>
          </Card>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange } />
          
        </div>
        <div className="">
          <Card>
            <CardContent>
            <div className="space-y-2 py-2">
                <p>
                  <strong>Domaine :</strong> {company?.domaine || "non mentionner"}
                </p>
                <p>
                  <strong>Localisation :</strong> {company?.location}
                </p>
                <p>
                  <strong>Taille de l&apos;entreprise :</strong> {company?.employeeCount || 215} employés
                </p>
              </div>
            </CardContent>
          </Card>
          {userRole ==="RECRUITER" && (
            <Card className="mt-3 md:fixed">
              <CardHeader>
                <CardTitle>Actions du recruteur</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 gap-4">
                <Link href={`/companies/jobs/new`}>
                  <Button className="w-full">Ajouter une offre d&apos;emploi</Button>
                </Link>
              
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Modifier le profil de l&apos;entreprise
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="">
                      <DialogTitle>Modifier le profil de l&apos;entreprise</DialogTitle>
                    </DialogHeader>
                    <CompanyEditForm
                      company={company}
                      onSubmit={handleCompanyUpdate}
                      onCancel={() => setIsEditModalOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
                <Link href="/recruiter/dashboard">
                  <Button variant="secondary" className="w-full">
                    Tableau de bord recruteur
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

