"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { BookmarkPlus, BriefcaseBusiness, Clock, Globe2, MapPin, Wallet } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { formatedRelativeTime } from '../utils/formatRelativeTime'

import { useSession } from 'next-auth/react';
import { isInFavorite, toggleFavorite } from '../services/favorisService'

interface jobCard{
    id: number
    title: string
    description: string
    skill: string
    requirement: string
    location: string
    salary: number
    duration: string
    jobType: string
    isPremium: boolean
    createdAt: Date

}
export const JobCard = ({path,job}:{path: string; job: jobCard}) => {
    // alert(path)
    // console.log("jpoCard",job)
      const {data:session} = useSession()
      const userRole = session?.user?.role;
    const [isFavorite, setIsInFavorie] = useState<boolean>(false);

    const addToFavorie = async () => {

      if (!session) return alert("Vous devez être connecté pour ajouter aux favoris");
      try {
        // const check =async()=>{
          if (session) {
           const response = await isInFavorite(job?.id);
           setIsInFavorie(response);
        // }
      }
        const response = await toggleFavorite(job?.id);
        setIsInFavorie(response)
        console.log(response);
      } catch (error) {
        console.error("Erreur lors de l'ajout aux favoris :", error);
      }
    };

          // useEffect(() => {
          //     if(!session) return;
          //       const check =async()=>{
          //           if (session) {
          //            const response = await isInFavorite(job?.id);
          //            setIsInFavorie(response);
          //         }
          //       }
             
          //         check();
          // }, [job?.id, session]);
// const d =job.createdAt
    return (
        <Card className='card shadow-md hover:shadow-slate-400 transition-shadow p-3 shadow-slate-700 rounded-md my-5'>
            <div className='flex justify-between mb-3'>
                <Badge className="text-base  color-primary px-1 rounded-md bg-green-300">
                   {formatedRelativeTime(job?.createdAt)}
                </Badge>
              {userRole ==="USER"  && <BookmarkPlus onClick={()=>addToFavorie()} className={`w-6 h-6 cursor-pointer transition ${
            isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
          }`}/>}
            </div>
            <CardContent className="card-header">
                <div className="flex gap-4">
                    <span className="icon"><Globe2 size={30}/></span>
                    <div className="flex flex-col overflow-hidden">
                        <CardTitle className='capitalize font-bold text-xl'>{job?.title}</CardTitle>
                        <CardDescription className='text-sm truncate w-[50rem]'>{job?.description}</CardDescription>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="card-footer flex flex-col md:flex-row justify-between">
                <div className="md:inline-flex flex flex-wrap md:flex-nowrap gap-6 md:gap-5 mt-3">
                    <span className='inline-flex gap-2'><BriefcaseBusiness className='color-primary'/>Hotels & Tourism</span>
                    {job?.duration && <span className='inline-flex gap-2'><Clock className='color-primary'/>{job?.duration}</span>}
                    {job?.salary &&   <span className='inline-flex gap-2'><Wallet className='color-primary'/>${job?.salary}</span>}
                    <span className='inline-flex gap-2'><MapPin className='color-primary'/>{job?.location}</span>
                </div>
                {!path &&
                <Button asChild className="bg-[#309689] rounded-md p-2 capitalize mt-4 md:mt-0 w-36">
                <Link href={`/jobs/${job?.id}`}>
                    job detail
                </Link>
                </Button>
                }
            </CardFooter>
        </Card>
    )
}
