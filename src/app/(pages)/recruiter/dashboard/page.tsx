"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { JobCard } from "@/app/components/jobCard";
import ProtectedRoute from "@/app/components/protectedRoutes";

import {
  getCompanyApplyJobs,
  getCompanyJobs,
} from "@/app/services/companyService";
import { toast } from "sonner";


interface IApplication {
  id: number;
  status: string;
  user: {
    fullName: string;
  };
}

// ✅ Interface pour typer un job
interface IJob {
  id: number;
  title: string;
  applications?: IApplication[];
}

interface ICompanyJob{
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
export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  const [jobData, setJobData] = useState<IJob[]>([]);
  const [companyJob, setCompanyJob] = useState<ICompanyJob[]>([]);

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      try {
        const response: ICompanyJob[] = await getCompanyJobs();
        setCompanyJob(response);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des offres :", error);
        toast.error("Erreur lors de la récupération des offres.");
      }
    };
    fetchCompanyJobs();
  }, []);

  useEffect(() => {
    const fetchCompanyApplications = async () => {
      try {
        const response: IJob[] = await getCompanyApplyJobs();
        setJobData(response);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des candidatures :", error);
        toast.error("Erreur lors de la récupération des candidatures.");
      }
    };
    fetchCompanyApplications();
  }, []);

  console.log(companyJob)

  return (
    <ProtectedRoute requiredRole="RECRUITER">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord recruteur</h1>
        <Tabs
          value={activeTab}
          onValueChange={(value)=>setActiveTab(value as "jobs" | "applications")}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="jobs">Offres d&apos;emploi</TabsTrigger>
            <TabsTrigger value="applications">Candidatures</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs">
          <Link href="/companies/jobs/new" className="block mb-4">
                  <Button>Publier une nouvelle offre</Button>
                </Link>
            <Card>
              <CardHeader>
                <CardTitle>Vos offres d&apos;emploi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                {companyJob.length > 0 ? (
                    companyJob.map((job) => <JobCard key={job.id} job={job} path={""} />)
                  ) : (
                    <p>Aucune offre publiée.</p>
                  )}
                </div>
               
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
                  {jobData.length > 0 ? (
                    jobData.map((job) =>
                      job.applications?.map((application) => (
                        <Card key={application.id}>
                          <CardContent className="flex justify-between items-center p-4">
                            <div>
                              <h3 className="font-semibold">{job.title}</h3>
                              <p className="text-sm text-gray-500">{application.user.fullName}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {application.status}
                              </span>
                              <Link href={`/recruiter/applications/${application.id}`}>
                                <Button variant="outline" size="sm">Voir détails</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )
                  ) : (
                    <p>Aucune candidature reçue.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}