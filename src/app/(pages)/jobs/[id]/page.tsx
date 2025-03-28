"use client";

import React, { useState, useEffect, use } from "react";

import { DrawerForm } from "@/app/components/drawerForm";
import { HeaderComponent } from "@/app/components/headerComponent";
import { JobCard } from "@/app/components/jobCard";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Slash } from "lucide-react";

import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react";
import { getDetailJob } from "@/app/services/jobService";
import { toggleFavorite, isInFavorite } from "@/app/services/favorisService";
import { toast } from "react-toastify";



interface IJobDetail{
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
    name:string
  };
}
const JobDetail = ({ params }: { params: Promise<{ id: number }> }) => {
  const path = usePathname();
  const { id } = use(params);

  const [getJobDetail, setJobDetail] = useState<IJobDetail | null>(null);
  const [isFavorite, setIsInFavorie] = useState<boolean>(false);

  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const addToFavorie = async () => {
    if (!session) {
      toast.info("Vous devez être connecté pour ajouter aux favoris");
      return alert("Vous devez être connecté pour ajouter aux favoris");
    }
    try {
      const response = await toggleFavorite(id);
      setIsInFavorie(response);
      if (isFavorite) {
        toast.success("Favorie supprimé avec succes");
      } else {
        toast.success("Favorie ajouter avec succes");
      }

      console.log(response);
    } catch (error) {
      toast.error("Erreur lors de l'ajout aux favoris");
      console.error("Erreur lors de l'ajout aux favoris :", error);
    }
  };


  useEffect(() => {
    if (!id) return;

    const getJob = async () => {
      if (session) {
        const response = await isInFavorite(id);
        setIsInFavorie(response);
      }
      try {
        const response = await getDetailJob(id);

        setJobDetail(response);
      } catch (error) {
        toast.error("Erreur lors de la récupération du job");
        console.error("Erreur lors de la récupération du job :", error);
      }
    };
    getJob();
  }, [id, session]);

  return (
    <div>
      <HeaderComponent pageName="Jobs details" />
      <Breadcrumb className="ml-5 p-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/jobs">Jobs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Job Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="container mx-auto p-3 md:p-0">
        <JobCard path={path} job={getJobDetail} />
        <main className="grid md:grid-cols-6">
          <section className="md:col-start-1 md:col-end-5 mt-4">
            <Card className="p-2">
              <CardTitle className="capitalize text-2xl font-bold mb-5">
                Job description
              </CardTitle>
              <CardContent className="whitespace-break-spaces">
                {getJobDetail?.description || "Aucune description disponible."}
              </CardContent>
            </Card>
            <Separator className="my-5 font-bold" />
            <Card className="p-2">
              <CardTitle className="capitalize text-2xl font-bold mb-5">
                Skills
              </CardTitle>
              <CardContent className="whitespace-break-spaces">
                {getJobDetail?.skill || "Aucune compétence spécifiée."}
              </CardContent>
            </Card>
            <Separator className="my-5 font-bold" />
            <Card className="p-2 mb-5">
              <CardTitle className="capitalize text-2xl font-bold mb-5">
                Job requirements
              </CardTitle>
              <CardContent className="whitespace-break-spaces">
                {getJobDetail?.requirement || "Aucune exigence spécifiée."}
              </CardContent>
            </Card>
          </section>

          <aside className="md:col-span-2 md:col-end-7 p-3">
            <Card className="card p-3 justify-end md:sticky md:top-11 shadow-md shadow-black">
              <CardTitle className="text-xl font-bold">Postuler</CardTitle>
              <CardDescription className="my-3">
                Intéressé(e) par ce poste de {getJobDetail?.title} chez{" "}
                {getJobDetail?.company?.name} ?
              </CardDescription>
              <div className="btn-group flex md:flex-col gap-4 mx-auto justify-center items-center">
                {userRole === "USER" && (
                  <DrawerForm
                    jobId={id}
                    jobTitle={getJobDetail?.title ?? ""}
                    companyName={getJobDetail?.company.name ?? ""}
                  />
                )}
                <Button
                  onClick={addToFavorie}
                  variant={isFavorite ? "destructive" : "outline"}
                  className={`border p-2 px-4 rounded-md transition font-semibold `}
                >
                  {isFavorite
                    ? "Retirer l'offre des favoris"
                    : "Ajouter l'offre aux favoris"}
                </Button>
              </div>
            </Card>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default JobDetail;
