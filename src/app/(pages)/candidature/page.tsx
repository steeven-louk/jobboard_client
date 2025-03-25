"use client"
import React, { useEffect, useState } from 'react'

import { HeaderComponent } from '@/app/components/headerComponent'
import { JobCard } from '@/app/components/jobCard';
import ProtectedRoute from '@/app/components/protectedRoutes';

import { getUserApplications } from '@/app/services/applicationService';

import { JobCardSkeleton } from '@/app/components/skeletons/job-card-skeleton';
import { toast } from 'react-toastify';


interface IJob {
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
      picture:string
    };
  }
  
  interface IApplications {
    id: string;
    job?: IJob;
  }

const Candidature = () => {
    const [getApplication, setGetApplication] = useState<IApplications[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleGetApplication =async()=>{
            setIsLoading(true);
            try {
                const data= await getUserApplications();

                   setGetApplication(data ?? []);
            } catch (error) {
                toast.error("Erreur lors de la recuperation des candidature")
                console.error("erreur lors de la recuperation des candidature" ,error)
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
                            apk.job ? (
                                <div key={apk.id}>
                                  <JobCard path={""} job={apk.job} />
                                </div>
                              ) : null
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
