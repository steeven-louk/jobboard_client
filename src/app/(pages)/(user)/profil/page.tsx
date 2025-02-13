"use client"
import { HeaderComponent } from '@/app/components/headerComponent'
import DiplomeModal from '@/app/components/modals/diplomeModal'
import ProfilModal from '@/app/components/modals/profilModal'
import ExperienceModal from '@/app/components/modals/updateExperienceModal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import axios from 'axios'
import { Building, Cake, Globe2, IdCard, Mail, PenIcon, Phone, Plus, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

// interface Props {
    
// }

 const Profil = () => {
    const [userDetail, setUserDetail] = useState<any>();
    const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mzg0NDE3ODksImV4cCI6MTczODcwMDk4OX0.mVzwrxHTH3oCkrsVUPzLP3uJ6EfLYXWXem065oC30tE";
    const URL = "http://localhost:5800/api/user/profil/";
    const EXP_URL = "http://localhost:5800/api/user/profil/experience";

    const handleGetProfil =async()=>{
    try {
        const user = await axios.get(URL, {
            headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
          });
          if(user.status === 200){
            const {data} =  user
            setUserDetail(data?.user);
            //   console.log(data.user);
          }
    } catch (error) {
        console.log("erreur lors de la recuperation du profil" ,error)
    }
}
    const deleteExperience =async(id:number)=>{
        try {
            const experience = await axios.delete(`${EXP_URL}/${id}`, {
                headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
              });
             console.log(experience);
             handleGetProfil();
        } catch (error) {
            console.log("erreur lors de la suppression de l'experience" ,error)
        }
    }
    
    useEffect(() => {
       

        handleGetProfil();
    }, []);
   


    return (
        <>
            <HeaderComponent pageName={'Profil'} />
            <div className="container mx-auto px-4">
                <Card className='p-2 md:p-4 my-5'>
                    <div className='flex justify-between my-5'>
                        <div className="left inline-flex gap-3">
                            <Globe2/>
                            <div className="flex flex-col gap-2">
                                <CardTitle>{userDetail?.fullName}</CardTitle>
                                <CardDescription>{userDetail?.domaine}</CardDescription>
                                <Separator className='w-16 my-3'/>

                            </div>
                        </div>
                        <ProfilModal profil={userDetail}/>
                    </div>
                    <CardContent className='grid grid-cols-2 gap-4'>
                        <div className="inline-flex align-baseline gap-2">
                            <Mail/>
                            <span>{userDetail?.email}</span>
                        </div>
                        <div className="inline-flex align-baseline gap-2">
                            <Cake/>
                            <span>{new Date(userDetail?.birthdate).toLocaleDateString()}</span>
                        </div>
                        <div className="inline-flex align-baseline gap-2">
                            <Phone/>
                            <span>{userDetail?.phone}</span>
                        </div>
                        <div className="inline-flex align-baseline gap-2">
                            <IdCard />
                            <span>{userDetail?.sexe}</span>
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
                        {/* <Button><Plus/>Ajouter</Button> */}
                        <ExperienceModal />

                    </div>

                <Separator className='my-5'/>
                {userDetail?.Experience?.length > 0 ? userDetail.Experience.map((exp) => (
                        <Card className='p-4 border-none shadow-none' key={exp.id}>
                            <div className='flex justify-between'>
                                <div className="flex flex-col align-baseline gap-4">
                                    <span>Intitulé de poste</span>
                                    <CardTitle>{exp.title}</CardTitle>
                                </div>
                                <div className="btn-group inline-flex gap-3">
                                    {/* <Button className='inline-flex md:gap-4 md:align-baseline'> */}
                                        {/* <PenIcon /> <span className='md:block hidden'>Modifier</span> */}
                                        <ExperienceModal experience={exp}/>
                                    {/* </Button> */}
                                    <Button onClick={()=>deleteExperience(exp.id)} variant={"destructive"}><Trash2 /></Button>
                                </div>
                            </div>
                            <CardContent className='mt-6 grid gap-4 md:gap-0'>
                                <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                    <span className='text-gray-500'>Entreprise ou client</span>
                                    <p className=' font-semibold inline-flex align-baseline'><Building /> {exp.entreprise}</p>
                                </div>
                                <div className="grid md:mt-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                    <span className='text-gray-500'>Localisation</span>
                                    <p className='relative text-start'>{exp.location}</p>
                                </div>
                                <div className="grid md:my-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                    <span className='text-gray-500'>Type de contrat</span>
                                    <p className=''>{exp.contract}</p>
                                </div>
                                <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                    <span className='text-gray-500'>Date</span>
                                    <p className=''>{exp.date}</p>
                                </div>
                                <div className="flex md:my-4 flex-col md:flex-row gap-1 md:gap-5">
                                    <span className='text-gray-500'>Description, missions</span>
                                    <p className='md:ml-[7.5rem]'>{exp.description}</p>
                                </div>
                                <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                    <span className='text-gray-500'>Compétences</span>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.competence.split(',').map((skill:string, index:number) => (
                                            <Badge key={index} className='relative w-fit'>{skill.trim()}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            <Separator className='my-5' />
                        </Card>
                    )) : (
                        <p>Aucune expérience enregistrée.</p>
                    )}
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
                        {/* <Button><Plus/>Ajouter</Button> */}
                        <DiplomeModal/>
                    </div>
                <Separator className='my-5'/>
                {userDetail?.Diplome?.length > 0 ? userDetail.Diplome.map((diplome) => (

                    <Card key={diplome.id} className='border-none shadow-none'>
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
                                <span className='text-gray-500'>Nom</span>
                                <p className=' font-semibold inline-flex align-baseline'>{diplome?.title}</p>
                            </div>
                            <div className="btn-group inline-flex gap-3">
                                {/* <Button className='inline-flex md:gap-4 md:align-baseline'><PenIcon/> <span className='md:block hidden'>Modifier</span></Button> */}
                                <DiplomeModal diplome={diplome}/>
                                <Button variant={"destructive"}><Trash2/></Button>
                            </div>
                            </div>
                            {/* <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Nom</span>
                                <p className=' font-semibold inline-flex align-baseline'>{diplome?.title}</p>
                            </div> */}
                            <div className="grid md:mt-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Niveau</span>
                                <p className='relative text-start'>{diplome?.level}</p>
                            </div>
                            <div className="grid md:my-4 md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>École ou organisme</span>
                                <p className='font-semibold inline-flex align-baseline'><Building />{diplome?.school}</p>
                            </div>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Date</span>
                                <p className=''>De {diplome?.date}</p>
                            </div>
                            <div className="flex md:my-4 flex-col md:flex-row  gap-1 md:gap-5">
                                <span className='text-gray-500'>Description</span>
                                <p className='md:ml-[12rem]'>{diplome?.description}</p>
                            </div>
                            <div className="grid md:grid-cols-2 md:w-[35rem] gap-1 md:gap-5">
                                <span className='text-gray-500'>Compétences</span>
                                <div className="flex flex-wrap gap-2">
                                        {diplome?.competence.split(',').map((skill:string, index:number) => (
                                            <Badge key={index} className='relative w-fit'>{skill.trim()}</Badge>
                                        ))}
                                    </div>
                            </div>
                            {/* <div className="flex flex-col gap-1 md:gap-5"></div> */}
                        </CardContent>
                        <Separator className='my-5'/>
                    </Card>
                    )) : (
                        <p>Aucun diplome enregistrée.</p>
                    )}
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
        </>
    )
}

export default Profil