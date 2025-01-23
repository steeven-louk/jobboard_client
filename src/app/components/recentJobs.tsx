import Link from 'next/link'
import React from 'react'
import { JobCard } from './jobCard'



export const RecentJobs = () => {
    return (
        <section className='container px-10 mx-auto mt-5 md:my-10'>
            <h1 className='capitalize font-bold text-2xl'>recent jobs available</h1>
            <div className="flex justify-between">
                <p className=' text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <Link href={""} className='underline color-primary font-semibold'>Voir plus</Link>
            </div>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
        </section>
    )
}
