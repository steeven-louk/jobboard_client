import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { BookmarkPlus, BriefcaseBusiness, Clock, Globe2, MapPin, Wallet } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { formatedRelativeTime } from '../utils/formatRelativeTime'


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
    console.log("jpoCard",job)
// const d =job.createdAt
    return (
        <Card className='card shadow-md hover:shadow-slate-400 transition-shadow p-3 shadow-slate-700 rounded-md my-5'>
            <div className='flex justify-between mb-3'>
                <Badge className="text-base  color-primary px-1 rounded-md bg-green-300">
                   {formatedRelativeTime(job?.createdAt)}
                </Badge>
                <BookmarkPlus className='w-fit cursor-pointer'/>
            </div>
            <CardContent className="card-header">
                <div className="flex gap-4">
                    <span className="icon"><Globe2/></span>
                    <div className="flex flex-col">
                        <CardTitle className='capitalize font-bold text-xl'>{job?.title}</CardTitle>
                        <CardDescription className='text-sm'>{job?.description}</CardDescription>
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
