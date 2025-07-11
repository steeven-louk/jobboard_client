"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"; // Composant pour la navigation côté client
import { usePathname } from "next/navigation"; // Hook pour obtenir le chemin d'URL actuel
import { signOut, useSession } from "next-auth/react"; // Hooks pour la gestion de session NextAuth

// Importation des composants UI de Shadcn
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Importation des icônes Lucide React
import {
  BookmarkIcon,
  BriefcaseBusiness, Building, 
  LayoutDashboard, 
  LogOut,
  Menu, 
  Settings,
  UserCircle2, 
} from "lucide-react";

// Importation du composant de bascule de thème
import { ModeToggle } from "./theme/theme-toogle";

/**
 * @interface NavItem
 * @description Définit la structure d'un élément de navigation.
 */
interface NavItem {
  name: string;
  href: string;
}

// Définition des éléments de navigation principaux
const navItems: NavItem[] = [
  { name: "Accueil", href: "/" },
  { name: "Offres d'emploi", href: "/jobs" },
  { name: "Entreprises", href: "/companies" },
  { name: "À propos", href: "/about" },
  { name: "Contact", href: "/contact" }, 
];

/**
 * @function Navbar
 * @description Composant de la barre de navigation principale de l'application.
 * Gère la navigation, l'affichage conditionnel basé sur l'authentification et le rôle de l'utilisateur,
 * un effet de scroll pour le style, et un menu mobile.
 *
 * @returns {JSX.Element} La barre de navigation.
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false); // État pour le menu mobile
  const [isScrolled, setIsScrolled] = useState<boolean>(false); 

  const { data: session, status } = useSession();

  const userRole = session?.user?.role;
  const companyId = session?.user?.companyId;
  const userName = session?.user?.name; 

  const pathname = usePathname(); // Obtient le chemin d'URL actuel pour l'état actif des liens

  // Effet pour gérer le changement de style de la barre de navigation au défilement
  useEffect(() => {
    const handleScroll = () => {
      // Si la position de défilement verticale est supérieure à 40px, active l'état "scrolled"
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Ajoute l'écouteur d'événement de défilement au montage du composant
    window.addEventListener("scroll", handleScroll);
    // Nettoie l'écouteur d'événement au démontage du composant
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Le tableau de dépendances vide signifie que cet effet ne s'exécute qu'une seule fois

  return (
    <nav
      className={`container mx-auto z-30 top-0 sticky transition-all duration-300 p-3
        ${isScrolled ? "bg-primary shadow-lg shadow-gray-800 rounded-lg top-2" : "bg-transparent"}`}
    >
      <div className="w-full max-w-[98%] mx-auto navbar flex justify-between items-center">
        {/* Logo et nom du portail */}
        <Link href={"/"} className="navbar-brand inline-flex items-center gap-2 font-semibold text-lg">
          <BriefcaseBusiness className="h-6 w-6" />
          Job Portal
        </Link>

        {/* Éléments de navigation pour les écrans larges (desktop) */}
        <div className="hidden md:flex space-x-5 lg:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all duration-300 text-sm font-semibold
                ${pathname === item.href
                  ? "border-accent text-accent-foreground dark:text-white" 
                  : "border-transparent text-slate-300  hover:border-accent hover:text-accent-foreground" 
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Section des actions utilisateur (bascule de thème, profil, connexion/déconnexion) */}
        <div className="flex items-center gap-3">
          <ModeToggle /> {/* Composant de bascule de thème clair/sombre */}

          {/* Menu déroulant du profil si l'utilisateur est authentifié */}
          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative  w-fit bg-slate-500 rounded-full flex items-center justify-center gap-2">
                  <UserCircle2 size={30} className="text-gray-700 dark:text-slate-300" />
                  {userName && (
                    <span className="hidden md:inline-block capitalize font-semibold text-sm">
                      {userName}
                    </span>
                  )}
                  <span className="sr-only">Ouvrir le menu utilisateur</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={"/profil"} className="flex items-center gap-2 cursor-pointer">
                    <UserCircle2 className="h-4 w-4" />
                    Profil
                  </Link>
                </DropdownMenuItem>
                {userRole === "USER" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href={"/candidature"} className="flex items-center gap-2 cursor-pointer">
                        <BriefcaseBusiness className="h-4 w-4" />
                        Mes Candidatures
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={"/bookmark"} className="flex items-center gap-2 cursor-pointer">
                        <BookmarkIcon className="h-4 w-4" />
                        Offres sauvegardées
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {userRole === "RECRUITER" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href={"/recruiter/dashboard"} className="flex items-center gap-2 cursor-pointer">
                        <LayoutDashboard className="h-4 w-4" />
                        Tableau de bord recruteur
                      </Link>
                    </DropdownMenuItem>
                    {companyId && (
                      <DropdownMenuItem asChild>
                        <Link href={`/companies/${companyId}`} className="flex items-center gap-2 cursor-pointer">
                          <Building className="h-4 w-4" /> 
                          Mon entreprise
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link href={"/settings"} className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer text-red-600 hover:!bg-red-50 dark:hover:!bg-red-900" 
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Bouton "Se connecter" si non authentifié (visible sur desktop)
            <Link href={"/auth/login"}>
              <Button className="hidden md:block">Se connecter</Button>
            </Link>
          )}

          {/* Menu hamburger pour mobile */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" /> {/* Icône de menu */}
                  <span className="sr-only">Ouvrir le menu mobile</span>
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
                      className={`text-base font-medium ${pathname === item.href ? "text-accent" : "text-gray-700 hover:text-accent"}`}
                      onClick={() => setIsMobileMenuOpen(false)} // Ferme le menu après avoir cliqué sur un lien
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Separator className="my-2" />
                  {/* Actions de session pour le menu mobile */}
                  {status === "authenticated" ? (
                    <>
                      <Link href={"/profil"} className="flex items-center gap-2 text-gray-700 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                        <UserCircle2 className="h-5 w-5" /> Profil
                      </Link>
                      {userRole === "USER" && (
                        <>
                          <Link href={"/candidature"} className="flex items-center gap-2 text-gray-700 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                            <BriefcaseBusiness className="h-5 w-5" /> Mes Candidatures
                          </Link>
                          <Link href={"/bookmark"} className="flex items-center gap-2 text-gray-700 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                            <BookmarkIcon className="h-5 w-5" /> Offres sauvegardées
                          </Link>
                        </>
                      )}
                      {userRole === "RECRUITER" && (
                        <>
                          <Link href={"/recruiter/dashboard"} className="flex items-center gap-2 text-gray-700 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                            <LayoutDashboard className="h-5 w-5" /> Tableau de bord
                          </Link>
                          {companyId && (
                            <Link href={`/companies/${companyId}`} className="flex items-center gap-2 text-gray-700 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                              <Building className="h-5 w-5" /> Mon entreprise
                            </Link>
                          )}
                        </>
                      )}
                      <Link href={"/settings"} className="flex items-center gap-2 text-gray-700 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                        <Settings className="h-5 w-5" /> Paramètres
                      </Link>
                      <Button
                        variant="destructive"
                        className="w-full mt-4 flex items-center gap-2"
                        onClick={() => {
                          signOut();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="h-5 w-5" /> Déconnexion
                      </Button>
                    </>
                  ) : (
                    <Link href={"/auth/login"}>
                      <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>Se connecter</Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
