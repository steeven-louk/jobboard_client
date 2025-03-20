"use client"
import React, { useEffect, useState } from 'react'

import { HeaderComponent } from '@/app/components/headerComponent'
import { JobCard } from '@/app/components/jobCard';
import ProtectedRoute from '@/app/components/protectedRoutes';

import { getUserApplications } from '@/app/services/applicationService';
import { toast } from 'sonner';
import { JobCardSkeleton } from '@/app/components/skeletons/job-card-skeleton';


interface IJob {
    id: number;
    title: string;
    company: string;
    location: string;
  }
  
  interface IApplication {
    id: number;
    job: IJob;
  }

const Candidature = () => {
    const [getApplication, setGetApplication] = useState<IApplication[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleGetApplication =async()=>{
            setIsLoading(true);
            try {
                const data= await getUserApplications();

                    setGetApplication(data);
            } catch (error) {
                toast("Erreur", {
                    description: "Erreur lors de la recuperation des candidature",
                  })
                console.log("erreur lors de la recuperation des candidature" ,error)
            }finally{
                setIsLoading(false);
            }
        }
        handleGetApplication();
    }, [])

    return (
        <ProtectedRoute requiredRole="USER">
            
        <div>
            <HeaderComponent pageName="Candidatures"/>
            <div className="container mx-auto">
                {isLoading ? (
                    <>
                    {[...Array(4)].map((_,index)=>(
                        <JobCardSkeleton key={index}/>
                    ))}
                    </>
                ):(
                    getApplication?.length > 0?(
                        getApplication?.map((apk)=>(
                            <div key={apk.id}>
                            <JobCard path={""} job={apk?.job} />
                        </div>
                        ))
                    ):(<p>Aucune candidature</p>)
                )
                }
            </div>
        </div>
        </ProtectedRoute>
    )
}

export default Candidature
