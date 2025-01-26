import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'


export const Footer = () => {
    return (
        <footer className='md:mt-10 mt-5 p-10 bg-black'>
            <div className="container p-5 flex flex-col md:flex-row gap-[2rem] md:gap-[10rem] text-white">
            <div className="flex flex-col w-full md:w-[15rem]">
                <h1 className='capitalize mb-5 font-bold text-xl'>job</h1>
                <p className='text-justify text-sm'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Molestiae animi quod veritatis fugiat iure laboriosam.
                </p>
            </div>
            <div className="">
                <h1 className="capitalize mb-5 font-bold text-xl">company</h1>
                <ul className='gap-2 flex flex-col'>
                    <li className="capitalize text-sm">about us</li>
                    <li className="capitalize text-sm">our team</li>
                    <li className="capitalize text-sm">partners</li>
                    <li className="capitalize text-sm">for candidates</li>
                    <li className="capitalize text-sm">for employers</li>
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
