import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Building, Cake, Globe2, IdCard, Mail, PenIcon, Phone, Plus, Trash2 } from 'lucide-react'
import React from 'react'

// interface Props {
    
// }

 const Profil = () => {
    return (
        <div>
            <div className="container mx-auto px-4">
                <Card className='p-4 my-5'>
                    <div className='flex justify-between my-5'>
                        <div className="left inline-flex gap-3">
                            <Globe2/>
                            <div className="flex flex-col gap-2">
                                <CardTitle>John Doe</CardTitle>
                                <CardDescription>Devloppe web /fullStack</CardDescription>
                                <Separator className='w-16 my-3'/>

                            </div>
                        </div>
                        <Button>Modifier</Button>
                    </div>
                    <CardContent className='grid grid-cols-2 gap-4'>
                        <div className="inline-flex align-baseline gap-2">
                            <Mail/>
                            <span>JhonDoe@gmail.com</span>
                        </div>
                        <div className="inline-flex align-baseline gap-2">
                            <Cake/>
                            <span>05/12/1254</span>
                        </div>
                        <div className="inline-flex align-baseline gap-2">
                            <Phone/>
                            <span>05-552-44-22</span>
                        </div>
                        <div className="inline-flex align-baseline gap-2">
                            <IdCard />
                            <span>Homme</span>
                        </div>
                    </CardContent>
                </Card>
                <Separator className='my-5'/>

                <section className='my-4 shadow-md p-3 rounded-md bg-white'>
                    <div className="flex gap-4 md:gap-0 align-baseline md:flex-row flex-col justify-between">
                        <div>
                            <h1 className='font-bold text-2xl'>Expérience</h1>
                            <p>Parlez-nous de vos expériences passées et actuelles, de vos Projets</p>
                        </div>
                        <Button><Plus/>Ajouter</Button>
                    </div>
                <Separator className='my-5'/>

                    <Card className='p-4 border-none shadow-none'>
                        <div className='flex justify-between'>
                            <div className="flex flex-col align-baseline gap-4">
                                <span>Intitulé de poste</span>
                                <CardTitle>Developpeur de jardin</CardTitle>
                            </div>
                            <div className="btn-group inline-flex gap-3">
                                <Button className='inline-flex md:gap-4 md:align-baseline'><PenIcon/> <span className='md:block hidden'>Modifier</span></Button>
                                <Button variant={"destructive"}><Trash2/></Button>
                            </div>
                        </div>
                        {/* flex flex-col md:flex-row */}
                        <CardContent className='mt-6 grid gap-4 md:gap-0'>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Entreprise ou client</span>
                                <p className=' font-semibold inline-flex align-baseline'><Building />L2R service consulting</p>
                            </div>
                            <div className="grid md:mt-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Localisation</span>
                                <p className='relative text-start'>Paris, France</p>
                            </div>
                            <div className="grid md:my-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Type de contrat</span>
                                <p className=''>Stage</p>
                            </div>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Date</span>
                                <p className=''>De septembre 2021 a decembre 2022</p>
                            </div>
                            <div className="flex md:my-4 flex-col md:flex-row  gap-1 md:gap-5">
                                <span className='text-gray-500'>Description, missions</span>
                                <p className='md:ml-[7.5rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, ipsa.</p>
                            </div>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Compétences</span>
                                <p className='relative '><Badge>Wordpress</Badge></p>
                            </div>
                            {/* <div className="flex flex-col gap-1 md:gap-5"></div> */}
                        </CardContent>
                        <Separator className='my-5'/>
                    </Card>

                    <Card className='p-4 border-none shadow-none'>
                        <div className='flex justify-between'>
                            <div className="flex flex-col align-baseline gap-4">
                                <span>Intitulé de poste</span>
                                <CardTitle>Developpeur de jardin</CardTitle>
                            </div>
                            <div className="btn-group inline-flex gap-3">
                                <Button className='inline-flex md:gap-4 md:align-baseline'><PenIcon/> <span className='md:block hidden'>Modifier</span></Button>
                                <Button variant={"destructive"}><Trash2/></Button>
                            </div>
                        </div>
                        {/* flex flex-col md:flex-row */}
                        <CardContent className='mt-6 grid gap-4 md:gap-0'>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Entreprise ou client</span>
                                <p className=' font-semibold inline-flex align-baseline'><Building />L2R service consulting</p>
                            </div>
                            <div className="grid md:mt-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Localisation</span>
                                <p className='relative text-start'>Paris, France</p>
                            </div>
                            <div className="grid md:my-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Type de contrat</span>
                                <p className=''>Stage</p>
                            </div>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Date</span>
                                <p className=''>De septembre 2021 a decembre 2022</p>
                            </div>
                            <div className="flex md:my-4 flex-col md:flex-row  gap-1 md:gap-5">
                                <span className='text-gray-500'>Description, missions</span>
                                <p className='md:ml-[7.5rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, ipsa.</p>
                            </div>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Compétences</span>
                                <p className='relative '><Badge>Wordpress</Badge></p>
                            </div>
                            {/* <div className="flex flex-col gap-1 md:gap-5"></div> */}
                        </CardContent>
                        <Separator className='my-5'/>
                    </Card>
                </section>

                <section className='my-5 shadow-md p-3 rounded-md bg-white'>
                    <div className="flex gap-4 md:gap-0 align-baseline md:flex-row flex-col justify-between">
                        <div>
                            <h1 className='font-bold text-2xl'>Diplômes & formations</h1>
                            <p>Listez vos diplômes, formations et certifications pertinents.</p>
                        </div>
                        <Button><Plus/>Ajouter</Button>
                    </div>
                <Separator className='my-5'/>

                    <Card className='border-none shadow-none'>
                        {/* <div className='flex justify-between'>
                            <div className="flex flex-col align-baseline gap-4">
                                <span>Intitulé de poste</span>
                                <CardTitle>Developpeur de jardin</CardTitle>
                            </div>
                            <div className="btn-group inline-flex gap-3">
                                <Button className='inline-flex md:gap-4 md:align-baseline'><PenIcon/> <span className='md:block hidden'>Modifier</span></Button>
                                <Button variant={"destructive"}><Trash2/></Button>
                            </div>
                        </div> */}
                        {/* flex flex-col md:flex-row */}
                        <CardContent className='mt-6 grid gap-4 md:gap-0 p-0 md:p-2'>
                            <div className="flex justify-between align-base">
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Intitulé de poste</span>
                                <p className=' font-semibold inline-flex align-baseline'>Developpeur de jardin</p>
                            </div>
                            <div className="btn-group inline-flex gap-3">
                                <Button className='inline-flex md:gap-4 md:align-baseline'><PenIcon/> <span className='md:block hidden'>Modifier</span></Button>
                                <Button variant={"destructive"}><Trash2/></Button>
                            </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Nom</span>
                                <p className=' font-semibold inline-flex align-baseline'>Master2: Développeur FullStack Big Data</p>
                            </div>
                            <div className="grid md:mt-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Niveau</span>
                                <p className='relative text-start'>Master 2</p>
                            </div>
                            <div className="grid md:my-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>École ou organisme</span>
                                <p className=''>Lorem ipsum dolout dolore vero. Fugit?</p>
                            </div>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Date</span>
                                <p className=''>De 2021 à 2022</p>
                            </div>
                            <div className="flex md:my-4 flex-col md:flex-row  gap-1 md:gap-5">
                                <span className='text-gray-500'>Description</span>
                                <p className='md:ml-[12rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, ipsa.</p>
                            </div>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Compétences</span>
                                <p className='relative '><Badge>Wordpress</Badge></p>
                            </div>
                            {/* <div className="flex flex-col gap-1 md:gap-5"></div> */}
                        </CardContent>
                        <Separator className='my-5'/>
                    </Card>

                    <Card className='p-4 border-none shadow-none'>
                        <div className='flex justify-between'>
                            <div className="flex flex-col align-baseline gap-4">
                                <span>Intitulé de poste</span>
                                <CardTitle>Developpeur de jardin</CardTitle>
                            </div>
                            <div className="btn-group inline-flex gap-3">
                                <Button className='inline-flex md:gap-4 md:align-baseline'><PenIcon/> <span className='md:block hidden'>Modifier</span></Button>
                                <Button variant={"destructive"}><Trash2/></Button>
                            </div>
                        </div>
                        {/* flex flex-col md:flex-row */}
                        <CardContent className='mt-6 grid gap-4 md:gap-0'>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Entreprise ou client</span>
                                <p className=' font-semibold inline-flex align-baseline'><Building />L2R service consulting</p>
                            </div>
                            <div className="grid md:mt-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Localisation</span>
                                <p className='relative text-start'>Paris, France</p>
                            </div>
                            <div className="grid md:my-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Type de contrat</span>
                                <p className=''>Stage</p>
                            </div>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Date</span>
                                <p className=''>De septembre 2021 a decembre 2022</p>
                            </div>
                            <div className="flex md:my-4 flex-col md:flex-row  gap-1 md:gap-5">
                                <span className='text-gray-500'>Description, missions</span>
                                <p className='md:ml-[7.5rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, ipsa.</p>
                            </div>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Compétences</span>
                                <p className='relative '><Badge>Wordpress</Badge></p>
                            </div>
                            {/* <div className="flex flex-col gap-1 md:gap-5"></div> */}
                        </CardContent>
                        <Separator className='my-5'/>
                    </Card>
                </section>
            </div>
        </div>
    )
}

export default Profil