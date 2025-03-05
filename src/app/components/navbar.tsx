"use client"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BookmarkIcon, BriefcaseBusiness, BriefcaseBusinessIcon, LayoutDashboard, LogOut, Menu, Settings,  UserCircle2 } from 'lucide-react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";



const navItems = [
  { name: "Accueil", href: "/" },
  { name: "Offres d'emploi", href: "/jobs" },
  { name: "Entreprises", href: "/companies" },
  { name: "À propos", href: "/about" },
  { name: "Nos Contact", href: "/contact" },
]
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false);
;
  const {data:session,status} = useSession()

  const userRole = session?.user?.role;
  const companyId = session?.user?.companyId;

  const router = useRouter();

//   const handleProtectedAction = () => {
//   //   if (session) {
//   //     router.push("auth/login");
//   // };
//   alert("navbar")
// }
console.log("sesssion", session)

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 40) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
 
// }

  return (
    <nav className={`container mx-auto  top-0 sticky  transition-all duration-300 ${isScrolled ? "bg-slate-100 shadow-lg shadow-gray-800 rounded-lg top-2" : "bg-transparent" }`}>
      <div className='w-full max-w-[98%] mx-auto p-3 navbar align-baseline flex justify-between'>
        <Link href={"/"} className="navbar-brand inline-flex my-auto gap-2 font-semibold"><BriefcaseBusinessIcon />Job Portal</Link>
        
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
          <div className="flex align-baseline gap-3">
            <div className="profile flex align-baseline gap-3">
              <DropdownMenu>
      <DropdownMenuTrigger><UserCircle2 size={30}/></DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col'>
        <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
      {userRole === "RECRUITER" &&  <DropdownMenuItem className="inline-flex align-baseline gap-3"><LayoutDashboard /><Link href={"/recruiter/dashboard"}>Tableau de bord</Link></DropdownMenuItem>}
      {userRole === "RECRUITER" &&  <DropdownMenuItem className="inline-flex align-baseline gap-3"><LayoutDashboard /><Link href={`/companies/${companyId}`}>Mon entreprise</Link></DropdownMenuItem>}
        <DropdownMenuItem className="inline-flex align-baseline gap-3"><UserCircle2/><Link href={"/profil"}>Profil</Link></DropdownMenuItem>
        <DropdownMenuItem className="inline-flex align-baseline gap-3"><BriefcaseBusiness /><Link href={"/candidature"}>Candidatures</Link></DropdownMenuItem>
        <DropdownMenuItem className="inline-flex align-baseline gap-3"><BookmarkIcon/><Link href={"/bookmark"}>Articles sauvegardés</Link></DropdownMenuItem>
        <DropdownMenuItem className="inline-flex align-baseline gap-3"><Settings /><Link href={"/settings"}>Paramètres</Link></DropdownMenuItem>
      {status === "authenticated" && <DropdownMenuItem className='bg-red-500 text-white shadow-sm' onClick={()=>signOut()}><LogOut />Déconnexion</DropdownMenuItem>}
        <Separator className='my-2'/>
        <DropdownMenuItem>Langue</DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
    <>
    {status === "authenticated" &&
     <p className='capitalize font-semibold top-1 relative'>{session?.user?.name}</p>
      }
       {status === "unauthenticated" &&
      
            <Button  className='md:block' onClick={()=>signIn()}>
              Se connecter
            </Button>
}
      
    </>
            
          </div>
          <div className="sm:hidden flex items-center">
            
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu style={{width: '30px',height: '30px'} } />
                  <span className="sr-only" >Ouvrir le menu</span>
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
                  {/* {!status:string === "authenticated" && <Button className='rounded-md p-1 bg-[#309689] px-3 font-semibold' onClick={()=>signIn()}>Se connecter</Button>}  */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          </div>
          
      </div>
    </nav>
  )
}

export default Navbar