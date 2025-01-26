import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Box, ChevronRight } from 'lucide-react'
import React from 'react'


const Fonctionnalite = () => {
    const fonctionnalite =[
        {
            icon:<Box />,
            title:"Recherche d'emploi simplifiée et efficace",
            subtext:"Trouvez des offres d'emploi qui correspondent à vos compétences et à vos aspirations."
        },
        {
            icon:<Box />,
            title:"Suivi des candidatures en un clin d'œil",
            subtext:"Gardez une trace de toutes vos candidatures avec facilité."
        },
        {
            icon:<Box />,
            title:"Alertes d'emploi personnalisées pour vous",
            subtext:"Recevez des notifications instantanées pour les offres qui vous intéressent."
        }
    ]
  return (
    <section className='md:h-[85vh] w-full  my-auto justify-center items-center p-4'>
        <div className='text-center mx-auto w-full max-w-[35rem]'>
        <span className='my-8'>Fonctionnalités</span>
        <h1 className='font-bold text-xl md:text-3xl my-5'>Découvrez les fonctionnalités de JobHunt</h1>
        <p className=''>JobHunt vous offre des outils puissants pour faciliter votre recherche d&apos;emploi. Explorez les fonctionnalités qui vous aideront à rester organisé et proactif.</p>

        </div>
        <div className="grid place-items-center gap-5 md:gap-0 mt-10 grid-cols-1 md:grid-cols-3 mx-auto">
        {fonctionnalite?.map((item,index)=>(
            <Card className="card text-center flex flex-col items-center md:w-[20rem] w-full shadow-md shadow-slate-300 p-2" key={index+1}>
                <CardHeader className='text-center mx-auto text-[#309689]'>{item.icon}</CardHeader>
                <CardTitle className='text-2xl font-bold my-4'>{item.title}</CardTitle>
                <CardDescription className='md:text-sm text-xl'>{item.subtext}</CardDescription>
            </Card>
        ))}
        </div>
        <div className="justify-center flex gap-3 mt-10 items-baseline">
            <Button variant={'outline'} className='border p-2'>En savoir plus</Button>
            <Button variant={'ghost'} className='border-none inline-flex'>S&apos;inscrire <ChevronRight/></Button>
        </div>
    </section>
  )
}

export default Fonctionnalite