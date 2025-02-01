import React, { useState } from 'react'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import axios from 'axios'

interface Props {
    jobId:number
}

export const DrawerForm = ({jobId}: Props) => {
  const [LM, setLM] = useState<string>("");
  const [CV, setCv] = useState<string>("");
  const URL ="http://localhost:5800/api"
  const AUTH_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MzgyNjMyMzMsImV4cCI6MTczODUyMjQzM30.ynpR0YXAlBvO_MiUTw3W9MaiSirATp9eZ9T3XWOvg0k"
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  const postJob = async(e: { preventDefault: () => void })=>{
    e.preventDefault();
    try {
      const job = await axios.post(`${URL}/user/apply_job/${jobId}`,{
        userId:1,
        jobId:jobId,
        coverLetter:LM,
        cv_url:CV
      });
      console.log("jobsubmitted", job)
    // if(job.status == 200){
    //   const {data} = job
    //   setJobDetail(data?.jobs)
    // }
    } catch (error) {
      console.log(error)
    }
    console.log(LM,CV);
  } 
  return (
        <div>
            <Drawer>
  <DrawerTrigger><Button>Postuler maintenant</Button></DrawerTrigger>
  <DrawerContent className='md:max-w-[52rem] w-full mx-auto'>
      
      <DrawerHeader className='shadow-md shadow-black'>
      <DrawerTitle className='uppercase font-semibold text-xl'>docoon groupe</DrawerTitle>
      <DrawerDescription className='font-bold text-1xl'>Stage 4/6 mois chargé de mission événementielle et communication F/H</DrawerDescription>
    </DrawerHeader>
    <Separator className='my-4'/>

    <ScrollArea className='h-[43rem] md:h-[31rem]'>
        <form action="" onSubmit={postJob} className='p-4'>
            <div className="information mx-auto text-center mb-3">
            <h1 className="font-bold text-2xl md:text-5xl">Mes informations</h1>

        </div>
        <Separator/>

        <div className="parcours my-5">
          <h1 className='font-bold text-2xl'>Mon parcours</h1>

          <div className="form-group mt-5">
                <Label htmlFor='cv' className='mb-2'>CV (PDF)</Label>
                <Input value={CV} onChange={(e)=>setCv(e.target.value)} type='file' id="cv"/>
              </div>
        </div>
        <Separator className='my-4'/>
        <div className="parcours gap-3 flex flex-col">
          <h1 className='font-bold text-2xl'>Lettre de motivation</h1>
          {/* <p >Expliquez-nous pourquoi vous souhaitez nous <span className=' underline-offset-4 underline decoration-green-600'>rejoindre !</span></p> */}
          <div className="grid w-full gap-1.5">
      <Textarea value={LM} onChange={(e)=>setLM(e.target.value)} placeholder="Tapez votre message ici." />
      <p className="text-sm text-muted-foreground">
        Expliquez-nous pourquoi vous souhaitez nous <span className=' underline-offset-4 underline decoration-green-600'>rejoindre !</span>
      </p>
    </div>
        </div>

        <Separator className='my-4'/>
        <h1 className='font-bold text-2xl'>Conditions générales d&apos;utilisation</h1>
        <div className="flex items-center space-x-2 my-5">
      <Checkbox id="terms" required name='terms'/>
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" required />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        J&apos;Accepte que mes données soient traitées par (l&apos;entreprise) dans le cadre de ma candidature.
      </label>
    </div>
        
 
    <DrawerFooter>
      <Button className='bg-green-400'>J&apos;envoie ma candidature</Button>
      <DrawerClose>
        <Button variant="outline">Annuler</Button>
      </DrawerClose>
    </DrawerFooter>
    </form>
     </ScrollArea>
  </DrawerContent>
</Drawer>
        </div>
    )
}
