import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { BookmarkPlus, BriefcaseBusiness, Clock, Globe2, MapPin, Wallet } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface props{
    path: string
}
export const JobCard = ({path}:props) => {
    // alert(path)
    return (
        <Card className='card shadow-md hover:shadow-slate-400 transition-shadow p-3 shadow-slate-700 rounded-md my-5'>
            <div className='flex justify-between mb-3'>
                <Badge className="text-base  color-primary px-1 rounded-md bg-green-300">
                    10 min ago
                </Badge>
                <BookmarkPlus className='w-fit cursor-pointer'/>
            </div>
            <CardContent className="card-header">
                <div className="flex gap-4">
                    <span className="icon"><Globe2/></span>
                    <div className="flex flex-col">
                        <CardTitle className='capitalize font-bold text-xl'>Forward Security Director</CardTitle>
                        <CardDescription className='text-sm'>Lorem ipsum dolor sit.</CardDescription>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="card-footer flex justify-between">
                <div className="inline-flex gap-5 mt-3">
                    <span className='inline-flex gap-2'><BriefcaseBusiness className='color-primary'/>Hotels & Tourism</span>
                    <span className='inline-flex gap-2'><Clock className='color-primary'/> Full time</span>
                    <span className='inline-flex gap-2'><Wallet className='color-primary'/>$40000-$42000</span>
                    <span className='inline-flex gap-2'><MapPin className='color-primary'/> nemour</span>
                </div>
                {!path &&
                <Button asChild className="bg-[#309689] rounded-md p-2 capitalize">
                <Link href={"/jobs/2"}>
                    job detail
                </Link>
                </Button>
                }
            </CardFooter>
        </Card>
    )
}
