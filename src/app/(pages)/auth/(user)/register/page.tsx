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

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea";
export default function RegisterPage() {
  const [role, setRole] = useState("candidate");
  const [step, setStep] = useState(1);
  // const [profileImage, setProfileImage] = useState<string | null>(null)
  // const fileInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter();
  const URL = "http://localhost:5800/api/auth/";

  // Schéma de validation pour le candidat
  const candidateSchema = z.object({
    fullName: z.string().min(3, "Nom trop court"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Mot de passe trop court"),
    phone: z.string().min(9, "Numéro de téléphone incorrect"),
    city: z.string().min(2, "Ville requise"),
    birthdate: z.string().min(10, "Date de naissance requise"),
  });

  // Schéma de validation pour le recruteur (avec des champs supplémentaires)
  const recruiterSchema = candidateSchema.extend({
    companyName: z.string().min(3, "Nom de l'entreprise trop court"),
    companyLocation: z.string().min(3, "Localisation invalide"),
    description: z.string().min(5, "Description trop courte"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(role === "candidate" ? candidateSchema : recruiterSchema),
  });

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setProfileImage(reader.result as string)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }


  const handleNextStep = () => {
    const values = getValues();
    const requiredFields = ["fullName", "email", "password", "phone", "city", "birthdate"];
     if (role === "recruiter") {
      requiredFields.push("companyName", "companyLocation", "description");
    }
   

    const isValid = requiredFields.every(field => values[field]);
    console.log(values,requiredFields)
    if (!isValid) {
      alert("Veuillez remplir tous les champs obligatoires avant de continuer.");
      return;
    }

    setStep(2);
  };

  const onSubmit = async (data) => {
    try {
      const endpoint = role === "candidate" ? `${URL}register` : `${URL}register-recruiter`;
      const response = await axios.post(endpoint, { ...data, role });
      console.log(response);
      router.push("/auth/login");
    } catch (error) {
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
              <Tabs value={role} onValueChange={setRole} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="candidate">Candidat</TabsTrigger>
                  <TabsTrigger value="recruiter">Recruteur</TabsTrigger>
                </TabsList>
                <TabsContent value="candidate">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input {...register("fullName")} placeholder="Nom complet" />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                    
                    <Input {...register("email")} placeholder="Email" type="email" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    
                    <Input {...register("password")} placeholder="Mot de passe" type="password" />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    
                    <Input {...register("phone")} placeholder="Téléphone" type="tel" />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    
                    <Input {...register("city")} placeholder="Ville" />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    
                    <Input {...register("birthdate")} placeholder="Date de naissance" type="date" />
                    {errors.birthdate && <p className="text-red-500 text-sm">{errors.birthdate.message}</p>}
                    
                    <Button type="submit" className="w-full">S'inscrire en tant que candidat</Button>
                  </form>
                </TabsContent>
                <TabsContent value="recruiter">
                  <Progress value={step === 1 ? 50 : 100} className="mb-4" />
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {step === 1 ? (
                      <>
                        <Input {...register("fullName")} name="fullName" placeholder="Nom complet" />
                        <Input {...register("email")} name="email" placeholder="Email" type="email" />
                        <Input {...register("password")} name="password" placeholder="Mot de passe" type="password" />
                        <Input {...register("phone")} name="phone" placeholder="Téléphone" type="tel" />
                        <Input {...register("city")} name="city" placeholder="Ville" />
                        <Input {...register("birthdate")} name="birthdate" placeholder="Date de naissance" type="date" />
                        
                        <Button type="button" onClick={handleNextStep} className="w-full">Suivant</Button>
                      </>
                    ) : (
                      <>
                        {/* <div className="flex flex-col items-center mb-4">
                  <Avatar className="w-24 h-24 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <AvatarImage src={profileImage || ""} alt="Profile" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    name="logo"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choisir une image
                  </Button>
                </div> */}
                        <Input {...register("companyName")} placeholder="Nom de l'entreprise" />
                        {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
                        
                        <Input {...register("companyLocation")} placeholder="Localisation" />
                        {errors.companyLocation && <p className="text-red-500 text-sm">{errors.companyLocation.message}</p>}
                        
                        <Textarea {...register("description")} placeholder="Description" />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        
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
