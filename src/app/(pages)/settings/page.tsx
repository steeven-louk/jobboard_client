import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { Pen, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Settings = (props: Props) => {
  return (
    <div className='setting container mx-auto my-5 px-4'>
        <div className="">
            <Card className='grid grid-cols-1 md:grid-cols-2 p-4'>
                <CardContent>
                    <CardTitle className='font-bold text-3xl'>Pays</CardTitle>
                    <CardDescription className=''>Choisissez votre pays de navigation pour personnaliser votre expérience.</CardDescription>
                    <div className="flex gap-5 mt-2 md:mt-5 align-baseline">
                        <span>Pays</span>
                        <span>France</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className='shadow-md w-full md:w-fit'><Pen/> Modifier mon pays</Button>
                </CardFooter>
            </Card>

            <Card className='grid grid-cols-1 md:grid-cols-2 p-4 my-5'>
                <CardContent>
                    <CardTitle className='font-bold text-3xl'>Mot de passe</CardTitle>
                    <CardDescription>Choisissez votre pays de navigation pour personnaliser votre expérience.</CardDescription>
                    <div className="flex gap-5 mt-2 md:mt-5 align-baseline">
                        <span>Mot de passe</span>
                        <span>***********</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className='shadow-md w-full md:w-fit'><Pen/> Changer mon mot de passe</Button>
                </CardFooter>
            </Card>

            <Card className='grid grid-cols-1 md:grid-cols-2 p-4'>
                <CardContent>
                    <CardTitle className='font-bold text-3xl'>Supprimer mon compte</CardTitle>
                    <CardDescription className='mt-2 md:mt-5'>N’hésitez pas à contacter <Link href={"contact"}>notre Service client</Link> si vous avez besoin d’aide.</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button className='shadow-md' variant={"destructive"}><Trash2/> Supprimer mon compte</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  )
}

export default Settings