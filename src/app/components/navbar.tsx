"use client"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BookmarkIcon, BriefcaseBusiness, BriefcaseBusinessIcon, LayoutDashboard, LogOut, Menu, Settings,  UserCircle2 } from 'lucide-react';
import Link from 'next/link'
import React, { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const navItems = [
  { name: "Accueil", href: "/" },
  { name: "Offres d'emploi", href: "/jobs" },
  // { name: "Entreprises", href: "/companies" },
  { name: "À propos", href: "/about" },
  { name: "Nos Contact", href: "/contact" },
]
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  // const isConnected:boolean = false;

  return (
    <nav className='container mx-auto'>
      <div className='w-full max-w-[98%] mx-auto p-3 navbar align-baseline flex justify-between'>
        <span className="navbar-brand inline-flex gap-2"><BriefcaseBusinessIcon />Job Portal</span>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-[#309689] hover:text-gray-700"
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* <div className="btn-group sm:hidden md:block inline-flex items-baseline gap-4 ">
            {isConnected? 
          <ul className='inline-flex items-baseline gap-5'>
            <li><User/></li>
            <li><Link href={""}>Entreprises / Publier une offre d&apos;emploi</Link></li>
          </ul>
          :
          <>
            <Link href={''}>Login</Link>
            <Button className='rounded-md p-1 bg-[#309689] px-3 ml-4 font-semibold'>Register</Button> 
          </>
          }
          </div> */}
          <div className="profile flex align-baseline gap-3">
              <DropdownMenu>
      <DropdownMenuTrigger><UserCircle2/></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><LayoutDashboard />Tableau de bord</DropdownMenuItem>
        <DropdownMenuItem><UserCircle2/>Profil</DropdownMenuItem>
        <DropdownMenuItem><BriefcaseBusiness />Candidatures</DropdownMenuItem>
        <DropdownMenuItem><BookmarkIcon/> Articles sauvegardés</DropdownMenuItem>
        <DropdownMenuItem><Settings />Paramètres</DropdownMenuItem>
        <DropdownMenuItem><LogOut />Déconnexion</DropdownMenuItem>
        <Separator className='my-2'/>
        <DropdownMenuItem>Langue</DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
            <Button asChild className='hidden md:block'>
              <Link href={""}>Se connecter</Link>
            </Button>
          </div>
          <div className="sm:hidden flex items-center">
            
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                  <Separator className='my-4'/>
                <div className="flex flex-col gap-3">
                  <Button asChild>
                    <Link href={''}>Employers</Link>
                  </Button>
                  <Button className='rounded-md p-1 bg-[#309689] px-3 font-semibold'>Se connecter</Button> 
                </div>
              </SheetContent>
            </Sheet>
          </div>
      </div>
    </nav>
  )
}

export default Navbar