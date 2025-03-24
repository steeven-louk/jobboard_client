import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'


export const Footer = () => {
    return (
        <footer className='md:mt-10 mt-5 p-10 bg-black'>
            <div className="container p-5 flex flex-col md:flex-row gap-[2rem] md:gap-[10rem] text-white">
            <div className="flex flex-col w-full md:w-[15rem]">
                <h1 className='capitalize mb-5 font-bold text-xl'>job Portal</h1>
                <p className='text-sm'>
                    JobPortal vous connecte aux meilleures opportunités professionnelles. Inscrivez-vous dès aujourd&apos;hui et transformez votre carrière !
                </p>
            </div>
            <div className="">
                <h1 className="capitalize mb-5 font-bold text-xl">company</h1>
                <ul className='gap-2 flex flex-col'>
                    <li className="capitalize text-sm">Accueil</li>
                    <li className="capitalize text-sm">Offres d&apos;emploi</li>
                    <li className="capitalize text-sm">entreprises</li>
                    <li className="capitalize text-sm">a propos</li>
                    <li className="capitalize text-sm">nos contact</li>
                </ul>
            </div>

            </div>
            <Separator className="my-4"/>
            <div className="Copyright my-4 flex flex-col-reverse md:flex-row items-center justify-between">
                <p className='text-sm text-gray-500'>&copy; Copyright Job Portal  2025. Ekolo group</p>
                <div className="inline-flex md:gap-5 gap-3 text-sm text-white">
                    <Link href={""} className='capitalize underline'>privacy policy</Link>
                    <Link href={""} className='capitalize underline'>terms & conditions</Link>
                </div>
            </div>
        </footer>
    )
}
