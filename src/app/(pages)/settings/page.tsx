"use client"; // Indique que ce composant est un Client Component dans Next.js

import React, { useState } from "react";
import Link from "next/link";

// Importation des composants UI de Shadcn
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pen, Trash2, Globe } from "lucide-react"; 

// Importation des composants
import { HeaderComponent } from "@/app/components/headerComponent"; 
import ProtectedRoute from "@/app/components/protectedRoutes"; 
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

/**
 * @function Settings
 * @description Composant de la page des paramètres utilisateur.
 * Permet à l'utilisateur de gérer différentes options comme le pays,
 * le mot de passe et la suppression du compte.
 * Des structures de modales sont prévues pour chaque action.
 *
 * @returns {JSX.Element} La page des paramètres utilisateur.
 */
const Settings = () => {

  const [isCountryModalOpen, setIsCountryModalOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState<boolean>(false);

  // const { data: session, status: sessionStatus } = useSession();
  // const userId = session?.user?.id;

  // Fonctions de gestion des actions
  const handleChangeCountry = () => {
    // Logique pour changer le pays
    console.log("Changer le pays");
    toast.success("Pays mis à jour !"); 
    setIsCountryModalOpen(false); // Ferme la modale après l'action
  };

  const handleChangePassword = () => {
    // Logique pour changer le mot de passe
    console.log("Changer le mot de passe");
    toast.success("Mot de passe mis à jour !");
    setIsPasswordModalOpen(false);
  };

  const handleDeleteAccount = () => {
    // Logique pour supprimer le compte
    console.log("Supprimer le compte");
    toast.success("Compte supprimé !");
    setIsDeleteAccountModalOpen(false); // Ferme la modale après l'action
  };

  return (
    <ProtectedRoute> {/* Protège la route, assure que l'utilisateur est connecté */}
      <>
        <HeaderComponent pageName={"Paramètres"} /> 
        <div className="setting container mx-auto my-5 px-4">
          <div className="space-y-6">
            {/* Carte pour la gestion du pays */}
            <Card className="grid grid-cols-1 md:grid-cols-2 p-4 shadow-md">
              <CardContent className="flex flex-col justify-center p-0"> 
                <CardTitle className="font-bold text-3xl">Pays</CardTitle>
                <CardDescription className="mt-2 text-gray-600 dark:text-gray-300">
                  Choisissez votre pays de navigation pour personnaliser votre expérience.
                </CardDescription>
                <div className="flex items-center gap-5 mt-4 text-lg font-medium">
                  <Globe className="h-6 w-6 text-primary" />
                  <span>Pays actuel :</span>
                  <span className="font-semibold">France</span>
                </div>
              </CardContent>
              <CardFooter className="flex items-end justify-start md:justify-end p-0 mt-4 md:mt-0">
                <Dialog open={isCountryModalOpen} onOpenChange={setIsCountryModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="shadow-md w-full md:w-fit">
                      <Pen className="mr-2 h-4 w-4" /> Modifier mon pays
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Modifier le pays</DialogTitle>
                      <CardDescription>Mettez à jour votre pays de navigation.</CardDescription>
                    </DialogHeader>

                    <div className="py-4">
                      {/* Exemple de champ de saisie pour le pays */}
                      <Label htmlFor="country-input" className="mb-2">Nouveau pays</Label>
                      <Input id="country-input" placeholder="Ex: France" />
                    </div>
                    <Button onClick={handleChangeCountry} className="w-full">Enregistrer les modifications</Button>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

            {/* Carte pour la gestion du mot de passe */}
            <Card className="grid grid-cols-1 md:grid-cols-2 p-4 shadow-md">
              <CardContent className="flex flex-col justify-center p-0">
                <CardTitle className="font-bold text-3xl">Mot de passe</CardTitle>
                <CardDescription className="mt-2 text-gray-600 dark:text-gray-300">
                  Mettez à jour votre mot de passe pour renforcer la sécurité de votre compte.
                </CardDescription>
                <div className="flex items-center gap-5 mt-4 text-lg font-medium">
                  <span>Mot de passe actuel :</span>
                  <span className="font-semibold">***********</span>
                </div>
              </CardContent>
              <CardFooter className="flex items-end justify-start md:justify-end p-0 mt-4 md:mt-0"> 
                <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="shadow-md w-full md:w-fit">
                      <Pen className="mr-2 h-4 w-4" /> Changer mon mot de passe
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Changer le mot de passe</DialogTitle>
                      <CardDescription>Veuillez saisir votre nouveau mot de passe.</CardDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                      <div>
                        <Label htmlFor="current-password">Mot de passe actuel</Label>
                        <Input id="current-password" type="password" placeholder="Votre mot de passe actuel" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">Nouveau mot de passe</Label>
                        <Input id="new-password" type="password" placeholder="Nouveau mot de passe" />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                        <Input id="confirm-password" type="password" placeholder="Confirmer le nouveau mot de passe" />
                      </div>
                    </div>
                    <Button onClick={handleChangePassword} className="w-full">Enregistrer le nouveau mot de passe</Button>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

            {/* Carte pour la suppression du compte */}
            <Card className="grid grid-cols-1 md:grid-cols-2 p-4 shadow-md">
              <CardContent className="flex flex-col justify-center p-0"> {/* Centrer verticalement le contenu */}
                <CardTitle className="font-bold text-3xl">Supprimer mon compte</CardTitle>
                <CardDescription className="mt-2 text-gray-600 dark:text-gray-300">
                  Cette action est irréversible. Toutes vos données seront supprimées.
                </CardDescription>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  N’hésitez pas à contacter{" "}
                  <Link href={"/contact"} className="text-primary hover:underline"> {/* Utilisation de text-primary pour la cohérence */}
                    notre Service client
                  </Link>{" "}
                  si vous avez besoin d’aide.
                </p>
              </CardContent>
              <CardFooter className="flex items-end justify-start md:justify-end p-0 mt-4 md:mt-0"> {/* Aligner le bouton */}
                <Dialog open={isDeleteAccountModalOpen} onOpenChange={setIsDeleteAccountModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="shadow-md w-full md:w-fit" variant={"destructive"}>
                      <Trash2 className="mr-2 h-4 w-4" /> Supprimer mon compte
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Confirmer la suppression du compte</DialogTitle>
                      <CardDescription>
                        Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
                      </CardDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-red-600 font-semibold">
                        Toutes vos données, y compris votre profil, vos candidatures et vos favoris, seront définitivement supprimées.
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsDeleteAccountModalOpen(false)}>Annuler</Button>
                      <Button variant="destructive" onClick={handleDeleteAccount}>Confirmer la suppression</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default Settings;
