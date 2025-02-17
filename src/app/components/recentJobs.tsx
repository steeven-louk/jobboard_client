import Link from 'next/link'
import React from 'react'
import { JobCard } from './jobCard'



export const RecentJobs = () => {
    return (
        <section className='container px-4 md:px-10 mx-auto mt-5 md:my-10'>
            <h1 className='capitalize font-bold text-2xl'>recent jobs available</h1>
            <div className="flex justify-between md:mb-5 mb:2">
                <p className=' text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <Link href={"/jobs"} className='underline color-primary font-semibold'>Voir plus</Link>
            </div>
            <JobCard path={''}/>
            <JobCard path={''}/>
            <JobCard path={''} job={undefined}/>
            <JobCard path={''}/>
            <JobCard path={''}/>
            <JobCard path={''}/>
        </section>
    )
}
