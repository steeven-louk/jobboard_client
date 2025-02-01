"use client"
import { DrawerForm } from '@/app/components/drawerForm'
import { HeaderComponent } from '@/app/components/headerComponent'
import { JobCard } from '@/app/components/jobCard'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Slash } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import axios from "axios";

const JobDetail = ({params}:{params:{id:number}}) => {
    const path:string = usePathname();
    const {id} = params
    const URL ="http://localhost:5800/api/job"
    const [getJobDetail, setJobDetail] = useState({});

   
useEffect(()=>{
  const getJob =async()=>{
    try {
      const job = await axios.get(`${URL}/${id}`)
    if(job.status == 200){
      const {data} = job
      setJobDetail(data?.jobs)
    }
    } catch (error) {
      console.log(error)
    }
  }
  getJob()
},[id])
    return (
        <div>
          <HeaderComponent pageName="Jobs details"/>
            <Breadcrumb className='ml-5 p-1'>
            <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/jobs">Jobs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className='font-bold'>Job Details</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
          <div className="container mx-auto p-3 md:p-0">
            <JobCard path={path} job={getJobDetail}/>

            <main className=' grid md:grid-cols-6'>
                <section className=' md:col-start-1 md:col-end-5 mt-4'>

                <Card className="p-2">
                    <CardTitle className='capitalize text-2xl font-bold mb-5'>job description</CardTitle>
                    <CardContent>
                    {getJobDetail?.description}
                    </CardContent>
                </Card>
                <Separator className=' my-5 font-bold'/>
                <Card className="p-2">
                    <CardTitle className='capitalize text-2xl font-bold mb-5'>Skill</CardTitle>
                    <CardContent>
                        {getJobDetail?.skill}
                    </CardContent>
                </Card>
                <Separator className=' my-5 font-bold'/>

                <Card className="p-2 mb-5">
                    <CardTitle className='capitalize text-2xl font-bold mb-5'>Job requirements</CardTitle>
                    <CardContent>
                        {getJobDetail?.requirement}
                    </CardContent>
                </Card>
                </section>
            <aside className='md:col-span-2 md:col-end-7  p-3'>
                <Card className="card p-3 justify-end md:sticky md:top-11 shadow-md shadow-black">
                    <CardTitle className="text-xl font-bold">Postuler</CardTitle>
                    <CardDescription className='my-3'>Intéressé(e) par ce poste de Développeur Full Stack chez TechCorp ?</CardDescription>
                    <div className="btn-group flex md:flex-col gap-4 mx-auto justify-center items-center">
                        {/* <Button className='p-2 border px-4 w-fit rounded-md'>Postuler maintenant</Button> */}
                        <DrawerForm jobId={id}/>
                        <Button variant={'outline'} className='border p-2 px-4 rounded-md'>Sauvegarder l&apos;offre</Button>
                    </div>
                </Card>
            </aside>
            </main>
          </div>
        </div>
    )
}



export default JobDetail