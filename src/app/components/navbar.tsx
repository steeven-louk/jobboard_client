"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  BookmarkIcon,
  BriefcaseBusiness,
  BriefcaseBusinessIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./theme/theme-toogle";

const navItems = [
  { name: "Accueil", href: "/" },
  { name: "Offres d'emploi", href: "/jobs" },
  { name: "Entreprises", href: "/companies" },
  { name: "À propos", href: "/about" },
  { name: "Nos Contact", href: "/contact" },
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: session, status } = useSession();

  const userRole = session?.user?.role;
  const companyId = session?.user?.companyId;

  const pathname = usePathname();

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


  return (
    <nav
      className={`container mx-auto z-30 top-0 sticky  transition-all duration-300 ${
        isScrolled
          ? " bg-primary shadow-lg shadow-gray-800 rounded-lg top-2"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-[98%] mx-auto p-3 navbar align-baseline flex justify-between">
        <Link
          href={"/"}
          className="navbar-brand inline-flex my-auto gap-2 font-semibold"
        >
          <BriefcaseBusinessIcon />
          Job Portal
        </Link>

        <div className="hidden sm:ml-6 md:flex sm:space-x-5 xl:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`inline-flex items-center px-1 pt-1 border-b-2 border-transparent transition-all duration-300 text-sm font-semibold ${
                pathname === item.href
                  ? "border-[#309689] "
                  : "text-gray-800 hover:border-[#309689] font-medium hover:text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex align-baseline gap-3">
          <ModeToggle/>
          <div className="profile flex align-baseline gap-3">
            {status === "authenticated" && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserCircle2 size={30} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userRole === "RECRUITER" && (
                    <DropdownMenuItem className="inline-flex align-baseline gap-3">
                      <LayoutDashboard />
                      <Link href={"/recruiter/dashboard"}>Tableau de bord</Link>
                    </DropdownMenuItem>
                  )}
                  {userRole === "RECRUITER" && (
                    <DropdownMenuItem className="inline-flex align-baseline gap-3">
                      <LayoutDashboard />
                      <Link href={`/companies/${companyId}`}>
                        Mon entreprise
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="inline-flex align-baseline gap-3">
                    <UserCircle2 />
                    <Link href={"/profil"}>Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="inline-flex align-baseline gap-3">
                    <BriefcaseBusiness />
                    <Link href={"/candidature"}>Candidatures</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="inline-flex align-baseline gap-3">
                    <BookmarkIcon />
                    <Link href={"/bookmark"}>Articles sauvegardés</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="inline-flex align-baseline gap-3">
                    <Settings />
                    <Link href={"/settings"}>Paramètres</Link>
                  </DropdownMenuItem>
                  {status === "authenticated" && (
                    <DropdownMenuItem
                      className="bg-red-500 text-white shadow-sm"
                      onClick={() => signOut()}
                    >
                      <LogOut />
                      Déconnexion
                    </DropdownMenuItem>
                  )}
                  <Separator className="my-2" />
                  <DropdownMenuItem>Langue</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <>
              {status === "authenticated" && (
                <p className="capitalize font-semibold top-1 relative">
                  {session?.user?.name}
                </p>
              )}
              {status === "unauthenticated" && (
                <Link href={"/auth/login"}>
                  <Button className="md:block">Se connecter</Button>
                </Link>
              )}
            </>
          </div>
          <div className="sm:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button  size="icon">
                  <Menu style={{ width: "30px", height: "30px" }} />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
              <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
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
                <Separator className="my-4" />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
