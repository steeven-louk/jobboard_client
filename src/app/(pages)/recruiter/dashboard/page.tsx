"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobCard } from "@/app/components/jobCard"
import axios from "axios"
import { useRouter } from "next/navigation"
// import ApplicationDetailPage from "../applications/[id]/page"
// import JobCard from "@/app/jobs/components/job-card"
import { useSession } from 'next-auth/react';
import { getCompanyApplyJobs, getCompanyJobs } from "@/app/services/companyService"
import { toast } from "sonner"


export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobData, setJobData] = useState();
  const [companyJob, setCompanyJob] = useState();

  const companyApplyUrl ="http://localhost:5800/api/company/company-applyJob";
  const companyUrl ="http://localhost:5800/api/company/company-job";

     const {data:session} = useSession()
     
     const AUTH_TOKEN:string = session?.user?.token;

  const router = useRouter();

  useEffect(() => {
    const getCompanyJob = async()=>{
        try {
            const response =await getCompanyJobs();
                setCompanyJob(response);
        } catch (error) {
          toast("Erreur", {
            description: "Erreur lors de la recuperation des données",
          })
            console.log("erreur lors de la recuperation des données", error);
        }
      }
    getCompanyJob();
  }, []);

  useEffect(() => {
      const getData = async()=>{
    try {
        const response =await getCompanyApplyJobs();
        setJobData(response);
    } catch (error) {
      toast("Erreur", {
        description: "Erreur lors de la recuperation des données",
      })
        console.log("erreur lors de la recuperation des données", error);
    }
  }
    getData();
  }, []);

//   const handleViewDetails = (application, jobTitle) => {
//     router.push(
//       `/recruiter/applications/${application.id}?data=${encodeURIComponent(
//         JSON.stringify(application)
//       )}&jobTitle=${encodeURIComponent(jobTitle)}`
//     );
//   };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord recruteur</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">Offres d&apos;emploi</TabsTrigger>
          <TabsTrigger value="applications">Candidatures</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Vos offres d&apos;emploi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companyJob?.map((job) => (
                  <JobCard key={job.id} job={job} path={""} />
                ))}
              </div>
              <Link href="/companies/jobs/new" className="block mt-4">
                <Button>Publier une nouvelle offre</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Candidatures reçues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobData?.map((job) => (
                  job?.applications.map((application)=>(
                    <Card key={application.id}>
                    <CardContent className="flex justify-between items-center p-4">
                      <div>
                        <h3 className="font-semibold">{job?.title}</h3>
                        <p className="text-sm text-gray-500">{application?.user.fullName}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {application?.status}
                        </span>
                        <Link
                          href={{
                            pathname: `/recruiter/applications/${application.id}`,
                            query: { data: JSON.stringify(application),jobTitle: job?.title },
                          }}
                        >
                          <Button variant="outline" size="sm">
                            Voir détails
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  ))
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

