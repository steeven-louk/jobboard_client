"use client";

import { DrawerForm } from '@/app/components/drawerForm';
import { HeaderComponent } from '@/app/components/headerComponent';
import { JobCard } from '@/app/components/jobCard';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Slash } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, use } from 'react';
import axios from "axios";
import { useSession } from 'next-auth/react';
import { getDetailJob } from '@/app/services/jobService';
import { toggleFavorite,isInFavorite } from '@/app/services/favorisService';
const JobDetail = ({ params }: { params: Promise<{ id: number }> }) => {

    const path = usePathname();
    const { id } = use(params);
    const URL = "http://localhost:5800/api/job";
    const [getJobDetail, setJobDetail] = useState<any>(null);
    const [isFavorite, setIsInFavorie] = useState<boolean>(false);
    
    // const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mzg0NDE3ODksImV4cCI6MTczODcwMDk4OX0.mVzwrxHTH3oCkrsVUPzLP3uJ6EfLYXWXem065oC30tE";

    // const AUTH_TOKEN = localStorage.getItem("token");
    // const AUTH_TOKEN = typeof window !== "undefined"? localStorage.getItem("token") : null;
    // const AUTH_TOKEN = AUTH_TOKEN ? JSON.parse(AUTH_TOKEN): null;
        const {data:session} = useSession()
        const userRole = session?.user?.role
        const AUTH_TOKEN:string = session?.user?.token;
    // console.log("token",AUTH_TOKEN)
    const addToFavorie = async () => {
        // if(!AUTH_TOKEN){
        //     console.log("Aucun token trouvé, veuillez vous connecter.")
        //     return;
        // }
        if (!session) return alert("Vous devez être connecté pour ajouter aux favoris");
      try {
        const response = await toggleFavorite(id);
        setIsInFavorie(response)
        // if (response.status === 200) {
        //   setIsInFavorie(false);
        // } else if (response.status === 201) {
        //   setIsInFavorie(true);
        // }
    
        console.log(response);
      } catch (error) {
        console.error("Erreur lors de l'ajout aux favoris :", error);
      }
    };
    
    
    console.log("jobDetail",getJobDetail)

    useEffect(() => {
        if(!id) return;

       
        const getJob = async () => {
            if (session) {
               const response = await isInFavorite(id);
               setIsInFavorie(response);
              }
            try {
                const response = await getDetailJob(id);
                setJobDetail(response);
                
            } catch (error) {
                console.error("Erreur lors de la récupération du job :", error);
            }
        };
        getJob();
    }, [id,session]);

    return (
        <div>
            <HeaderComponent pageName="Jobs details" />
            <Breadcrumb className='ml-5 p-1'>
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
                        <BreadcrumbPage className='font-bold'>Job Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="container mx-auto p-3 md:p-0">
                <JobCard path={path} job={getJobDetail} />
                <main className='grid md:grid-cols-6'>
                    <section className='md:col-start-1 md:col-end-5 mt-4'>
                        <Card className="p-2">
                            <CardTitle className='capitalize text-2xl font-bold mb-5'>Job description</CardTitle>
                            <CardContent className='whitespace-break-spaces'>
                                {getJobDetail?.description || "Aucune description disponible."}
                            </CardContent>
                        </Card>
                        <Separator className='my-5 font-bold' />
                        <Card className="p-2">
                            <CardTitle className='capitalize text-2xl font-bold mb-5'>Skills</CardTitle>
                            <CardContent className='whitespace-break-spaces'>
                                {getJobDetail?.skill || "Aucune compétence spécifiée."}
                            </CardContent>
                        </Card>
                        <Separator className='my-5 font-bold' />
                        <Card className="p-2 mb-5">
                            <CardTitle className='capitalize text-2xl font-bold mb-5'>Job requirements</CardTitle>
                            <CardContent  className='whitespace-break-spaces'>
                                {getJobDetail?.requirement || "Aucune exigence spécifiée."}
                            </CardContent>
                        </Card>
                    </section>

                    <aside className='md:col-span-2 md:col-end-7 p-3'>
                        <Card className="card p-3 justify-end md:sticky md:top-11 shadow-md shadow-black">
                            <CardTitle className="text-xl font-bold">Postuler</CardTitle>
                            <CardDescription className='my-3'>Intéressé(e) par ce poste de {getJobDetail?.title} chez {getJobDetail?.company?.name} ?</CardDescription>
                            <div className="btn-group flex md:flex-col gap-4 mx-auto justify-center items-center">
                             {userRole ==="USER" &&  <DrawerForm jobId={id} companyName={getJobDetail?.company.name} />}
                                <Button onClick={addToFavorie} variant={'outline'} className={`border p-2 px-4 rounded-md transition font-semibold  ${isFavorite ? "bg-red-500 fill-red-500 text-white" : "bg-green-400 text-white"} `}>
                                {isFavorite ? "Retirer l'offre des favoris" : "Ajouter l'offre aux favoris"}
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
