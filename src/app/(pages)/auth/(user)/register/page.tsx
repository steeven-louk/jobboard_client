"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [role, setRole] = useState<"USER" | "RECRUITER">("USER");
  const [step, setStep] = useState(1);

  const router = useRouter();
  const URL = "http://localhost:5800/api/auth/";

  // Définition des dates minimales pour l'âge des utilisateurs
const today = new Date();
const minDateForCandidate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
const minDateForRecruiter = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());


  // Schéma de validation pour le candidat
  const candidateSchema = z.object({
    fullName: z.string().min(3, "Nom trop court"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Mot de passe trop court"),
    phone: z.string().min(9, "Numéro de téléphone incorrect"),
    city: z.string().min(2, "Ville requise"),
    birthdate: z.string().refine((dateStr) => {
      const birthDate = new Date(dateStr);
      return birthDate <= minDateForCandidate;
    }, { message: "Vous devez avoir au moins 15 ans pour vous inscrire." }),
  });

  // Schéma de validation pour le recruteur (avec des champs supplémentaires)
  const recruiterSchema = candidateSchema.extend({
    companyName: z.string().min(3, "Nom de l'entreprise trop court"),
    companyLocation: z.string().min(3, "Localisation invalide"),
    description: z.string().min(5, "Description trop courte"),
    birthdate: z.string().refine((dateStr) => {
      const birthDate = new Date(dateStr);
      return birthDate <= minDateForRecruiter;
    }, { message: "Vous devez avoir au moins 15 ans pour vous inscrire." }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(role === "USER" ? candidateSchema : recruiterSchema),
  });


  const handleNextStep = () => {
    const values = getValues();
    const requiredFields = ["fullName", "email", "password", "phone", "city", "birthdate"];

     if (role === "RECRUITER") {
      requiredFields.push("companyName", "companyLocation", "description");
    }
   console.log("eqqdsfhgj", requiredFields)

    const isValid = requiredFields.every(field => values[field]);
    console.log(values,requiredFields)
    if (!isValid) {
      toast("Veuillez remplir tous les champs obligatoires avant de continuer.")
      alert("Veuillez remplir tous les champs obligatoires avant de continuer.");
      return;
    }

    setStep(2);
  };

  const onSubmit = async (data) => {
    try {
      const endpoint = role === "USER" ? `${URL}register` : `${URL}register-recruiter`;
      const response = await axios.post(endpoint, { ...data, role });
      console.log(response);
      toast("inscription reussie")
      router.push("/auth/login");
    } catch (error) {
      toast("Erreur", {
          description: "Erreur lors de l'inscription",
        })
      console.log("Erreur lors de l'inscription", error);
    }
  };

  return (
    <div className="flex min-h-screen container mx-auto">
      <div className="p-2 relative  hidden flex-1 lg:block">
                <Image src={"/assets/bg-auth.webp"} alt="Image de connexion" layout="fill" objectFit="cover" className="rounded-md w-full" />
              </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Card>
            <CardHeader>
              <CardTitle>Inscription</CardTitle>
              <CardDescription>Créez votre compte JobBoard</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={role} onValueChange={(value)=>setRole(value as "USER" | "RECRUITER")} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="USER">Candidat</TabsTrigger>
                  <TabsTrigger value="RECRUITER">Recruteur</TabsTrigger>
                </TabsList>
                <TabsContent value="USER">
                
                  <form onSubmit={handleSubmit(onSubmit)} className="">
                    <Label className="mt-5">Nom complet</Label>
                    <Input {...register("fullName")} placeholder="Nom complet" />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

                    <Label className="mt-5">Email</Label>
                    <Input {...register("email")} type="email" placeholder="Email" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <Label className="mt-5">Mot de passe</Label>
                    <Input {...register("password")} type="password" placeholder="Mot de passe" />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    <Label className="mt-5">Téléphone</Label>
                    <Input {...register("phone")} type="tel" placeholder="Téléphone" />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

                    <Label className="mt-5">Ville</Label>
                    <Input {...register("city")} placeholder="Ville" />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}

                    <Label className="mt-5">Date de naissance</Label>
                    <Input {...register("birthdate")} type="date" />
                    {errors.birthdate && <p className="text-red-500 text-sm">{errors.birthdate.message}</p>}

                    <Button type="submit" className="w-full">S&apos;inscrire</Button>
                  </form>
                </TabsContent>
                <TabsContent value="RECRUITER">
                  <Progress value={step === 1 ? 50 : 100} className="mb-4" />
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {step === 1 ? (
                      <>
                        <Label>Nom complet</Label>
                        <Input {...register("fullName")} placeholder="Nom complet" />
                        <Label>Email</Label>
                        <Input {...register("email")} type="email" placeholder="Email" />
                        <Label>Mot de passe</Label>
                        <Input {...register("password")} type="password" placeholder="Mot de passe" />
                        <Label>Téléphone</Label>
                        <Input {...register("phone")} type="tel" placeholder="Téléphone" />
                        <Label>Ville</Label>
                        <Input {...register("city")} placeholder="Ville" />
                        <Label>Date de naissance</Label>
                        <Input {...register("birthdate")} type="date" />

                        <Button type="button" onClick={handleNextStep} className="w-full">Suivant</Button>
                      </>
                    ) : (
                      <>
                   
                        <Label>Nom de l&apos;entreprise</Label>
                        <Input {...register("companyName")} placeholder="Nom de l'entreprise" />
                        <Label>Localisation</Label>
                        <Input {...register("companyLocation")} placeholder="Localisation" />
                        <Label>Description</Label>
                        <Textarea {...register("description")} placeholder="Description" />
                        
                        <Button type="submit" className="w-full">S&apos;inscrire en tant que recruteur</Button>
                      </>
                    )}
                  </form>
                </TabsContent>
                
              </Tabs>
            </CardContent>
            <CardFooter>
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
