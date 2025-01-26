import React from 'react'

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

interface Props {
    
}

export const DrawerForm = (props: Props) => {
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

    <ScrollArea className='h-[43rem]'>
        <form action="" className='p-4'>
            <div className="information">
            <h1 className="font-bold text-2xl">Mes informations</h1>

            <div className="grid md:grid-cols-2 gap-4 mb-4 mt-5">
              <div className="form-group">
                <Label htmlFor='prenom mb-2'>Prénom</Label>
                <Input type='text' id="prenom"/>
              </div>
              <div className="form-group">
                <Label htmlFor='nom mb-2'>Nom</Label>
                <Input type='text' id="nom"/>
              </div>
              <div className="form-group">
                <Label htmlFor='email mb-2'>E-mail</Label>
                <Input value={"admin@gmail.com"} disabled type='email' id="email"/>
              </div>
              <div className="form-group">
                <Label htmlFor='phone mb-2'>Téléphone</Label>
                <Input type='tel' id="phone"/>
              </div>
            </div>
            <div className="form-group">
                <Label htmlFor='location mb-2'>Localisation</Label>
                <Input type='text' id="location"/>
              </div>
        </div>
        <Separator/>

        <div className="parcours my-5">
          <h1 className='font-bold text-2xl'>Mon parcours</h1>

          <div className="form-group mt-5">
                <Label htmlFor='cv' className='mb-2'>CV (PDF)</Label>
                <Input type='file' id="cv"/>
              </div>
        </div>
        <Separator className='my-4'/>
        <div className="parcours gap-3 flex flex-col">
          <h1 className='font-bold text-2xl'>Lettre de motivation</h1>
          {/* <p >Expliquez-nous pourquoi vous souhaitez nous <span className=' underline-offset-4 underline decoration-green-600'>rejoindre !</span></p> */}
          <div className="grid w-full gap-1.5">
      <Textarea placeholder="Tapez votre message ici." />
      <p className="text-sm text-muted-foreground">
        Expliquez-nous pourquoi vous souhaitez nous <span className=' underline-offset-4 underline decoration-green-600'>rejoindre !</span>
      </p>
    </div>
        </div>

        <Separator className='my-4'/>
        <h1 className='font-bold text-2xl'>Conditions générales d&apos;utilisation</h1>
        <div className="flex items-center space-x-2 my-5">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        J&apos;Accepte que mes données soient traitées par (l&apos;entreprise) dans le cadre de ma candidature.
      </label>
    </div>
        </form>
 
    <DrawerFooter>
      <Button className='bg-green-400'>J&apos;envoie ma candidature</Button>
      <DrawerClose>
        <Button variant="outline">Annuler</Button>
      </DrawerClose>
    </DrawerFooter>
     </ScrollArea>
  </DrawerContent>
</Drawer>
        </div>
    )
}
