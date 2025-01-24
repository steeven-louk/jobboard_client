"use client"
import { HeaderComponent } from '@/app/components/headerComponent'
import { JobCard } from '@/app/components/jobCard'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Slash } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'


const JobDetail = () => {
    const path:string = usePathname();
    
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
          <div className="container mx-auto">
            <JobCard path={path}/>

            <main className=' grid grid-cols-6'>
                <section className=' col-start-1 col-end-5 mt-4'>

                <Card className="p-2">
                    <CardTitle className='capitalize text-2xl font-bold mb-5'>job description</CardTitle>
                    <CardContent>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quam sunt ab aspernatur vero iste.</p>
                    <br />
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam iure at iste minima 
                        saepe officiis aspernatur perferendis provident placeat magnam 
                        voluptate nesciunt eum obcaecati dolorem molestiae culpa repellat necessitatibus 
                        aliquid quia cumque, ipsam eaque velit.
                    </p>
                    </CardContent>
                </Card>
                <Card className="p-2 my-5">
                    <CardTitle className='capitalize text-2xl font-bold mb-5'>Skill</CardTitle>
                    <CardContent>
                        <ul>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="p-2 mb-5">
                    <CardTitle className='capitalize text-2xl font-bold mb-5'>Job requirements</CardTitle>
                    <CardContent>
                        <ul>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                            <li>sit amet consectetur adipisicing elit.</li>
                        </ul>
                    </CardContent>
                </Card>
                </section>
            <aside className='col-span-2 col-end-7  p-3'>
                <Card className="card p-3 justify-end shadow-md shadow-black">
                    <CardTitle className="text-xl font-bold">Postuler</CardTitle>
                    <CardDescription>Intéressé(e) par ce poste de Développeur Full Stack chez TechCorp ?</CardDescription>
                    <div className="btn-group flex flex-col gap-4 mx-auto justify-center items-center">
                        <Button className='p-2 border px-4 w-fit rounded-md'>Postuler maintenant</Button>
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