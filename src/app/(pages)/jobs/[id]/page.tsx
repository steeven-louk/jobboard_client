import { JobCard } from '@/app/components/jobCard'
import React from 'react'


const JobDetail = () => {
    return (
        <div>
            <div className="bg-red-500 w-full h-[10rem] items-center justify-center">
            <h1>Jobs details</h1>
          </div>
          <div className="container mx-auto">
            <JobCard/>

            <main className=' grid grid-cols-6'>
                <section className=' col-start-1 col-end-5 '>

                <div className="p-2">
                    <h2 className='capitalize text-2xl font-bold mb-5'>job description</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quam sunt ab aspernatur vero iste.</p>
                    <br />
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam iure at iste minima saepe officiis aspernatur perferendis provident placeat magnam voluptate nesciunt eum obcaecati dolorem molestiae culpa repellat necessitatibus aliquid quia cumque, ipsam eaque velit.</p>
                </div>
                <div className="p-2">
                    <h2 className='capitalize text-2xl font-bold mb-5'>Skill</h2>
                    <ul>
                        <li>sit amet consectetur adipisicing elit.</li>
                        <li>sit amet consectetur adipisicing elit.</li>
                        <li>sit amet consectetur adipisicing elit.</li>
                        <li>sit amet consectetur adipisicing elit.</li>
                        <li>sit amet consectetur adipisicing elit.</li>
                        <li>sit amet consectetur adipisicing elit.</li>
                        <li>sit amet consectetur adipisicing elit.</li>
                    </ul>
                </div>
                <div className="p-2">
                    <h2 className='capitalize text-2xl font-bold mb-5'>Job requirements</h2>
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
                </div>
                </section>
            <aside className='col-span-2 col-end-7 bg-red-500'>
                <div className="card p-2">
                    <h1 className="text-xl font-bold">Postuler</h1>
                    <p>Intéressé(e) par ce poste de Développeur Full Stack chez TechCorp ?</p>
                    <div className="btn-group flex flex-col gap-4 mx-auto justify-center items-center">
                        <button className='p-2 border px-4 w-fit rounded-md'>Postuler maintenant</button>
                        <button className='border p-2 px-4 rounded-md'>Sauvegarder l&apos;offre</button>
                    </div>
                </div>
            </aside>
            </main>
          </div>
        </div>
    )
}



export default JobDetail