"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";



export default function RegisterPage() {
  const [role, setRole] = useState<"USER" | "RECRUITER">("USER");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5800";
  const AUTH_URL = `${API_BASE_URL}/api/auth`;

  // Définition des dates minimales pour l'âge des utilisateurs
  const today = new Date();
  const minDateForCandidate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
  const minDateForRecruiter = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());


// Schéma de validation de base pour les champs communs (candidat et recruteur - étape 1)
  const baseSchema = z.object({
    fullName: z.string().min(3, "Le nom complet est trop court (min. 3 caractères).").nonempty("Le nom complet est requis."),
    email: z.string().email("Adresse email invalide.").nonempty("L'email est requis."),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères.").nonempty("Le mot de passe est requis."),
    phone: z.string().min(9, "Le numéro de téléphone est incorrect (min. 9 chiffres).").nonempty("Le numéro de téléphone est requis."),
    city: z.string().min(2, "La ville est trop courte (min. 2 caractères).").nonempty("La ville est requise."),
    birthdate: z.string().nonempty("La date de naissance est requise.").refine((dateStr) => {
      const birthDate = new Date(dateStr);
      return !isNaN(birthDate.getTime()); // Vérifie si la date est valide
    }, { message: "Format de date de naissance invalide." }),
  });

  // Schéma de validation pour le candidat
  const candidateSchema = baseSchema.extend({
    birthdate: baseSchema.shape.birthdate.refine((dateStr) => {
      const birthDate = new Date(dateStr);
      return birthDate <= minDateForCandidate;
    }, { message: `Vous devez avoir au moins 15 ans pour vous inscrire (${minDateForCandidate.toLocaleDateString('fr-FR')}).` }),
  });

  // Schéma de validation pour le recruteur (étend le schéma de base avec des champs supplémentaires)
  const recruiterSchema = baseSchema.extend({
    companyName: z.string().min(3, "Le nom de l'entreprise est trop court (min. 3 caractères).").nonempty("Le nom de l'entreprise est requis."),
    companyLocation: z.string().min(3, "La localisation de l'entreprise est trop courte (min. 3 caractères).").nonempty("La localisation de l'entreprise est requise."),
    description: z.string().min(5, "La description est trop courte (min. 5 caractères).").nonempty("La description est requise."),
    birthdate: baseSchema.shape.birthdate.refine((dateStr) => {
      const birthDate = new Date(dateStr);
      return birthDate <= minDateForRecruiter;
    }, { message: `Vous devez avoir au moins 18 ans pour vous inscrire (${minDateForRecruiter.toLocaleDateString('fr-FR')}).` }),
  });

  // Interfaces pour les données du formulaire, basées sur les schémas Zod
  type ICandidateFormData = z.infer<typeof candidateSchema>;
  type IRecruiterFormData = z.infer<typeof recruiterSchema>;

  const {
    register, // Fonction pour enregistrer les champs du formulaire
    handleSubmit, // Fonction pour gérer la soumission du formulaire
    formState: { errors }, // Objet contenant les erreurs de validation
    // getValues, // Fonction pour obtenir les valeurs actuelles du formulaire
    trigger, // Fonction pour déclencher manuellement la validation
    reset, // Fonction pour réinitialiser le formulaire
    clearErrors, // Fonction pour effacer les erreurs
  } = useForm<ICandidateFormData | IRecruiterFormData>({
    // Résolveur Zod pour la validation, sélectionne le schéma en fonction du rôle
    resolver: zodResolver(role === "USER" ? candidateSchema : recruiterSchema),
    mode: "onBlur", // Valide au blur pour une meilleure UX
  });

    // Réinitialise le formulaire et l'étape lorsque le rôle change
  useEffect(() => {
    reset(); // Réinitialise toutes les valeurs du formulaire
    clearErrors(); // Efface toutes les erreurs
    setStep(1); // Retourne à la première étape
  }, [role, reset, clearErrors]);



  const handleNextStep = async () => {
    let isValid = false;
    if (role === "RECRUITER" && step === 1) {
      // Valide les champs de la première étape du recruteur
      isValid = await trigger(["fullName", "email", "password", "phone", "city", "birthdate"]);
    }

    if (isValid) {
      setStep(2); // Passe à la deuxième étape si la validation réussit
    } else {
      toast.warning("Veuillez remplir tous les champs obligatoires correctement avant de continuer.");
    }
  };

  const onSubmit: SubmitHandler<ICandidateFormData | IRecruiterFormData> = async (data) => {
    setLoading(true); // Active l'état de chargement
    try {
      const endpoint = role === "USER" ? `${AUTH_URL}/register` : `${AUTH_URL}/register-recruiter`;
      const payload = { ...data, role }; // Inclut le rôle dans le payload

      const response = await axios.post(endpoint, payload);

      if (response.status === 201 || response.status === 200) {
        toast.success("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        router.push("/auth/login"); // Redirige vers la page de connexion
      } else {
        // Gérer les cas où l'API renvoie un statut non-succès sans erreur HTTP
        throw new Error(response.data?.message || "Une erreur est survenue lors de l'inscription.");
      }
    } catch (error: any) {
      console.error("❌ Erreur lors de l'inscription :", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setLoading(false); // Désactive l'état de chargement
    }
  };

  return (
    <div className="flex min-h-screen container mx-auto">
      <div className="p-2 relative hidden flex-1 lg:block">
        <Image
          src={"/assets/bg-auth.webp"}
          alt="Image d'arrière-plan d'inscription"
          fill 
          style={{ objectFit: 'cover' }} 
          className="rounded-md" 
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
                    <Card className="shadow-md shadow-black"> 
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Inscription</CardTitle>
              <CardDescription>Créez votre compte JobBoard</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Onglets pour choisir le rôle (Candidat/Recruteur) */}
              <Tabs value={role} onValueChange={(value) => setRole(value as "USER" | "RECRUITER")} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="USER" disabled={loading}>Candidat</TabsTrigger>
                  <TabsTrigger value="RECRUITER" disabled={loading}>Recruteur</TabsTrigger>
                </TabsList>

                {/* Contenu de l'onglet Candidat */}
                <TabsContent value="USER" className="mt-4">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="fullName-candidate">Nom complet</Label>
                      <Input
                        id="fullName-candidate"
                        {...register("fullName")}
                        placeholder="Nom complet"
                        disabled={loading}
                      />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email-candidate">Email</Label>
                      <Input
                        id="email-candidate"
                        {...register("email")}
                        type="email"
                        placeholder="Email"
                        disabled={loading}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="password-candidate">Mot de passe</Label>
                      <Input
                        id="password-candidate"
                        {...register("password")}
                        type="password"
                        placeholder="Mot de passe"
                        disabled={loading}
                      />
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone-candidate">Téléphone</Label>
                      <Input
                        id="phone-candidate"
                        {...register("phone")}
                        type="tel"
                        placeholder="Téléphone"
                        disabled={loading}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="city-candidate">Ville</Label>
                      <Input
                        id="city-candidate"
                        {...register("city")}
                        placeholder="Ville"
                        disabled={loading}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="birthdate-candidate">Date de naissance</Label>
                      <Input
                        id="birthdate-candidate"
                        {...register("birthdate")}
                        type="date"
                        disabled={loading}
                      />
                      {errors.birthdate && <p className="text-red-500 text-sm mt-1">{errors.birthdate.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Inscription en cours...
                        </>
                      ) : (
                        "S'inscrire en tant que candidat"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Contenu de l'onglet Recruteur (formulaire multi-étapes) */}
                <TabsContent value="RECRUITER" className="mt-4">
                  <Progress value={step === 1 ? 50 : 100} className="mb-4" />
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {step === 1 ? (
                      <>
                        {/* Champs de la première étape (communs) */}
                        <div>
                          <Label htmlFor="fullName-recruiter">Nom complet</Label>
                          <Input
                            id="fullName-recruiter"
                            {...register("fullName")}
                            placeholder="Nom complet"
                            disabled={loading}
                          />
                          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                        </div>

                        <div>
                          <Label htmlFor="email-recruiter">Email</Label>
                          <Input
                            id="email-recruiter"
                            {...register("email")}
                            type="email"
                            placeholder="Email"
                            disabled={loading}
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                          <Label htmlFor="password-recruiter">Mot de passe</Label>
                          <Input
                            id="password-recruiter"
                            {...register("password")}
                            type="password"
                            placeholder="Mot de passe"
                            disabled={loading}
                          />
                          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                          <Label htmlFor="phone-recruiter">Téléphone</Label>
                          <Input
                            id="phone-recruiter"
                            {...register("phone")}
                            type="tel"
                            placeholder="Téléphone"
                            disabled={loading}
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                        </div>

                        <div>
                          <Label htmlFor="city-recruiter">Ville</Label>
                          <Input
                            id="city-recruiter"
                            {...register("city")}
                            placeholder="Ville"
                            disabled={loading}
                            autoComplete="false"
                          />
                          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                        </div>

                        <div>
                          <Label htmlFor="birthdate-recruiter">Date de naissance</Label>
                          <Input
                            id="birthdate-recruiter"
                            {...register("birthdate")}
                            type="date"
                            disabled={loading}
                          />
                          {errors.birthdate && <p className="text-red-500 text-sm mt-1">{errors.birthdate.message}</p>}
                        </div>

                        <Button type="button" onClick={handleNextStep} className="w-full" disabled={loading}>
                          Suivant
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* Champs de la deuxième étape (spécifiques au recruteur) */}
                        <div>
                          <Label htmlFor="companyName-recruiter">Nom de l&apos;entreprise</Label>
                          <Input
                            id="companyName-recruiter"
                            {...register("companyName")}
                            placeholder="Nom de l'entreprise"
                            disabled={loading}
                            autoComplete="none"
                          />
                          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                        </div>

                        <div>
                          <Label htmlFor="companyLocation-recruiter">Localisation de l&apos;entreprise</Label>
                          <Input
                            id="companyLocation-recruiter"
                            {...register("companyLocation")}
                            placeholder="Localisation de l'entreprise"
                            disabled={loading}
                            autoComplete="none"
                          />
                          {errors.companyLocation && <p className="text-red-500 text-sm mt-1">{errors.companyLocation.message}</p>}
                        </div>

                        <div>
                          <Label htmlFor="description-recruiter">Description de l&apos;entreprise</Label>
                          <Textarea
                            id="description-recruiter"
                            {...register("description")}
                            placeholder="Description de l'entreprise"
                            disabled={loading}
                            autoComplete="none"
                          />
                          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                        </div>

                        <Button type="button" onClick={() => setStep(1)} variant="outline" className="w-full" disabled={loading}>
                          Précédent
                        </Button>
                        <Button type="submit" className="w-full" disabled={loading}>
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Inscription en cours...
                            </>
                          ) : (
                            "S'inscrire en tant que recruteur"
                          )}
                        </Button>
                      </>
                    )}
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-center text-sm text-gray-600">
                Vous avez déjà un compte ?{" "}
                <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Se connecter
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
