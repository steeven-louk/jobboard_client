"use client"
import { HeaderComponent } from '@/app/components/headerComponent'
import { JobCard } from '@/app/components/jobCard'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react';


const Bookmark = () => {
    const [getBookmark, setGetBookmark] = useState<any>();
    // const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mzg0NDE3ODksImV4cCI6MTczODcwMDk4OX0.mVzwrxHTH3oCkrsVUPzLP3uJ6EfLYXWXem065oC30tE";
    const URL = "http://localhost:5800/api/user/favories";
      const {data:session} = useSession()
            // const userRole = session?.user?.role
            const AUTH_TOKEN:string = session?.user?.token;
    
    useEffect(() => {
        const handleGetBookmark =async()=>{
            try {
                const favoris = await axios.get(URL, {
                    headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
                  });
                  if(favoris.status === 200){
                    const {data} =  favoris
                        setGetBookmark(data?.favoris)
                      console.log(data?.favoris)
                  }
            } catch (error) {
                console.log("erreur lors de la recuperation des favoris" ,error)
            }
        }
        handleGetBookmark();
    }, [AUTH_TOKEN])
    return (
        <div>
                        <HeaderComponent pageName="Bookmark" />
            
            <div className="container my-5 mx-auto p-5">
                {getBookmark?.length > 0?(
                    getBookmark?.map((favoris:any)=>(
                        <div key={favoris.id}>
                        <JobCard path={""} job={favoris?.job} />
                    </div>
                    ))
                ):(<p>Aucun favoris trouvé</p>)}
                {/* <JobCard path={path} job={getJobDetail} /> */}

                
            </div>
        </div>
    )
}

export default Bookmark;