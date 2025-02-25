"use client"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// import JobCard from "@/app/jobs/components/job-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JobCard } from "@/app/components/jobCard"
import { use, useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"



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
  industry:string
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

const [company, setCompany] = useState<companyDetail|null>(null)
const companie_detail_url =`http://localhost:5800/api/company/company-detail/${parseInt(id)}`
// const companyJobUrl ="http://localhost:5800/api/company/company-job";
useEffect(() => {
    const getCompanyDetails =async()=>{
        try {
            const response = await axios.get(companie_detail_url);
            if(response.status ===200){
                const {data} = response
                console.log("companyyy-detail", data);
                setCompany(data?.company)
            }
            console.log("response", response)
        } catch (error) {
            console.log("erreur lors de la recuperation des company",error)
        }
    };
    getCompanyDetails();
}, [companie_detail_url]);

  // Mock function to check if the current user is a recruiter for this company
  const isRecruiter = true // This should be replaced with actual authentication logic

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Image
          src={company?.logo || "/placeholder.svg"}
          alt={`${company?.name} logo`}
          width={100}
          height={100}
          className="rounded-full mr-4"
        />
        <h1 className="text-3xl font-bold">{company?.name}</h1>
      </div>
      <div className="grid grid-cols-1 flex-col-reverse md:flex-none md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>À propos de l&apos;entreprise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{company?.description}</p>
              <div className="space-y-2">
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

          <Card>
            <CardHeader>
              <CardTitle>Offres d&apos;emploi actuelles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {company?.jobs?.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <span>{company?.jobs.length <=0 && "aucun job"}</span>
            </CardContent>
          </Card>
        </div>
        <div>
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
            <Card className="fixed">
              <CardHeader>
                <CardTitle>Actions du recruteur</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 gap-4">
                <Link href={`/companies/jobs/new`}>
                  <Button className="w-full">Ajouter une offre d&apos;emploi</Button>
                </Link>
                <Link href={`/companies/${company?.id}/edit`} className="my-5">
                  <Button variant="outline" className="w-full">
                    Modifier le profil de l&apos;entreprise
                  </Button>
                </Link>
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

