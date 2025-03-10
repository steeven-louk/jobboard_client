"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import axios from "axios";
import { useSession } from 'next-auth/react';
import { Card, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { createJob } from "@/app/services/jobService";
import ProtectedRoute from "@/app/components/protectedRoutes";


interface jobType{
    title: string,
    location: string
    salary: number | string
    jobType: string
    description: string
    skill: string
    requirement: string
    duration: string
    expiration_date: Date | string
    selectedOffer: string
}

interface Offer {
  title: string
  description: string
  price: number
  duration: number
}

const offerTypes: Offer[] = [
  { title: "Offre Basic", description: "Visibilité standard", price: 50, duration: 30 },
  { title: "Offre Premium", description: "Visibilité accrue", price: 100, duration: 60 },
  { title: "Offre Gold", description: "Visibilité maximale", price: 200, duration: 90 },
]
export default function NewJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
     const {data:session} = useSession()
     
     const AUTH_TOKEN:string = session?.user?.token;
  const [jobData, setJobData] = useState<jobType>({
    title: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    skill: "",
    requirement: "",
    duration: "",
    expiration_date: "",
    selectedOffer: offerTypes[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createJob(jobData);
      console.log("responseAjout", response)

    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  
  const handleOfferChange = (value: string) => {
    const selectedOffer = offerTypes.find((offer) => offer.title === value) || offerTypes[0]
    setJobData((prev) => ({ ...prev, selectedOffer }))
  }

  return (
    <ProtectedRoute requiredRole="RECRUITER">

    <div className="container  mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6 text-center">Ajouter une nouvelle offre d&apos;emploi</h1>

        <form onSubmit={handleSubmit} className="shadow-md shadow-black rounded-md p-4 space-y-4 max-w-3xl mx-auto">
        {step === 1 && (
          <>
            <div className="form-group grid grid-cols-1 gap-2 md:gap-0 md:space-x-3 md:grid-cols-2">
                <div>
                <Label htmlFor="title">Titre du poste</Label>
                <Input 
                    id="title" 
                    name="title" 
                    value={jobData.title} 
                    onChange={handleInputChange} 
                    required 
                />
                </div>

                <div>
                <Label htmlFor="location">Localisation</Label>
                <Input 
                    id="location" 
                    name="location" 
                    value={jobData.location} 
                    onChange={handleInputChange} 
                    required 
                />
                </div>
            </div>

            <div className="form-group grid grid-cols-1 gap-2 md:gap-0 md:space-x-3 md:grid-cols-2">
                            <div>
              <Label htmlFor="salary">Salaire</Label>
              <Input 
                id="salary" 
                name="salary" 
                type="number" 
                value={jobData.salary} 
                onChange={handleInputChange} 
                required 
              />
            </div>

            <div>
              <Label htmlFor="jobType">Type de contrat</Label>
              <Select 
                value={jobData.jobType} 
                onValueChange={(value) => handleSelectChange("jobType", value)} 
                required
              >
                <SelectTrigger name="jobType">
                  <SelectValue placeholder="Sélectionnez le type de contrat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CDI">CDI</SelectItem>
                  <SelectItem value="CDD">CDD</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Stage">Stage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            </div>


            
            <div>
              <Label htmlFor="duration">Durée (en mois/années)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={jobData.duration}
                onChange={handleInputChange}
                required
                placeholder="exemple: 18mois ou 2ans"
              />
            </div>
            <div>
              <Label htmlFor="description">Description du poste</Label>
              <Textarea
                id="description"
                name="description"
                value={jobData.description}
                onChange={handleInputChange}
                rows={8}
                required
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <Label htmlFor="skill">Compétences requises</Label>
              <Textarea
                id="skill"
                name="skill"
                value={jobData.skill}
                onChange={handleInputChange}
                rows={5}
                required
              />
            </div>

            <div>
              <Label htmlFor="requirement">Exigences</Label>
              <Textarea
                id="requirement"
                name="requirement"
                value={jobData.requirement}
                onChange={handleInputChange}
                rows={5}
                required
              />
            </div>


            <div>
              <Label htmlFor="expiration_date">Date d&apos;expiration de l&apos;offre</Label>
              <Input
                id="expiration_date"
                name="expiration_date"
                type="date"
                value={jobData?.expiration_date || ""}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}
        {step ===3 && (
          <>
            <div className="space-y-4">
              <Label className="text-xl font-semibold">Choisissez votre offre de publication</Label>
              <RadioGroup onValueChange={handleOfferChange} defaultValue={offerTypes[0].title}>
                {offerTypes.map((offer, index) => (
                  <div key={index} className="relative">
                    <RadioGroupItem value={offer.title} id={`offer-${index}`} className="sr-only" />
                    <Label htmlFor={`offer-${index}`} className="flex flex-col cursor-pointer">
                      <Card className={cn(offer?.value ===offer.duration ? "border-green-500 bg-green-500":"hover:bg-secondary/50","p-4 border-2 transition-all")}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-lg">
                              {offer.duration} jours
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {offer.description}
                            </p>
                          </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">{offer.price}€</p>
                          <p>{(offer.price / offer.duration ).toFixed(2)} / jours</p>
                        </div>
                        </div>
                      </Card>
                     
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </>
        )}

        {/* Navigation entre les étapes */}
        <CardFooter>
        <div className="flex justify-between gap-4 md:gap-0 mt-4">
          {step > 1 && (
            <Button type="button" onClick={() => setStep(step - 1)}>
              Précédent
            </Button>
          )}
          
          {step < 3 ? (
            <Button type="button" className="ml-5" onClick={() => setStep(step + 1)}>
              Suivant
            </Button>
          ) : (
            <Button type="submit" className="bg-green-500 ml-5">Publier l&apos;offre</Button>
          )}
        </div>
        </CardFooter>
      </form>
        {/* </CardContent> */}
      {/* </Card> */}
    </div>
    </ProtectedRoute>
  );
}
