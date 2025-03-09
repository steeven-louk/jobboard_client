"use client"
import { HeaderComponent } from '@/app/components/headerComponent'
import { JobCard } from '@/app/components/jobCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react';
import { getUserApplications } from '@/app/services/applicationService';
import { toast } from 'sonner';


const Candidature = () => {
    const [getApplication, setGetApplication] = useState<any>();
    // const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mzg0NDE3ODksImV4cCI6MTczODcwMDk4OX0.mVzwrxHTH3oCkrsVUPzLP3uJ6EfLYXWXem065oC30tE";
    // const URL = "http://localhost:5800/api/user/applications/";
    // const AUTH_TOKEN:string = JSON.parse(localStorage.getItem("token"));
   const {data:session} = useSession()
        // const userRole = session?.user?.role
        const AUTH_TOKEN:string = session?.user?.token;
    
    useEffect(() => {
        const handleGetApplication =async()=>{
            try {
                const data = await getUserApplications();
                 
                    setGetApplication(data);
                    //   console.log(data?.applications);
            } catch (error) {
                toast("Erreur", {
                    description: "Erreur lors de la recuperation des candidature",
                  })
                console.log("erreur lors de la recuperation des candidature" ,error)
            }
        }
        handleGetApplication();
    }, [])
    return (
        <div>
            <HeaderComponent pageName="Candidatures"/>
            <div className="container mx-auto">
                {getApplication?.length > 0?(
                                    getApplication?.map((apk)=>(
                                        <div key={apk.id}>
                                        <JobCard path={""} job={apk?.job} />
                                    </div>
                                    ))
                                ):(<p>Aucune candidature</p>)}
            </div>
        </div>
    )
}

export default Candidature
