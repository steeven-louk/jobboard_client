"use client"
import { HeaderComponent } from '@/app/components/headerComponent'
import { JobCard } from '@/app/components/jobCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

// interface Props {
    
// }

const Candidature = () => {
    const [getApplication, setGetApplication] = useState<any>();
    const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mzg0NDE3ODksImV4cCI6MTczODcwMDk4OX0.mVzwrxHTH3oCkrsVUPzLP3uJ6EfLYXWXem065oC30tE";
    const URL = "http://localhost:5800/api/user/applications/";

    
    useEffect(() => {
        const handleGetApplication =async()=>{
            try {
                const application = await axios.get(URL, {
                    headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
                  });
                  if(application.status === 200){
                    const {data} =  application
                    setGetApplication(data?.applications);
                      console.log(data?.applications);
                  }
            } catch (error) {
                console.log("erreur lors de la recuperation des favoris" ,error)
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
                                ):(<p>rajouter des favoris</p>)}
            </div>
        </div>
    )
}

export default Candidature
