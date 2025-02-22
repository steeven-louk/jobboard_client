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
import { Card, CardContent, CardFooter } from "@/components/ui/card";


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
}

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
      const response = await axios.post("http://localhost:5800/api/create_job", {
        ...jobData
      },
     { headers: { Authorization: `Bearer ${AUTH_TOKEN}` }}
    );
      console.log("responseAjout", response)

    //   if (!response.st) {
    //     throw new Error("Erreur lors de la soumission de l'offre.");
    //   }

    //   console.log("Offre d'emploi ajoutée avec succès !");
    //   router.push(`/companies/${params.id}`);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  console.log(jobData.expiration_date)

  return (
    <div className="container  mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6 text-center">Ajouter une nouvelle offre d&apos;emploi</h1>

      <Card className="container shadow-md shadow-black p-3">
        <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
        {step === 1 && (
          <>
            <div className="form-group grid grid-cols-1 space-x-3 md:grid-cols-2">
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

            <div className="form-group grid grid-cols-1 space-x-3 md:grid-cols-2">
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
              <Label htmlFor="duration">Durée (en mois)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={jobData.duration}
                onChange={handleInputChange}
                required
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

        {/* Navigation entre les étapes */}
        <CardFooter>
        <div className="flex justify-between mt-4">
          {step > 1 && (
            <Button type="button" onClick={() => setStep(step - 1)}>
              Précédent
            </Button>
          )}
          
          {step < 2 ? (
            <Button type="button" onClick={() => setStep(step + 1)}>
              Suivant
            </Button>
          ) : (
            <Button type="submit">Publier l&apos;offre</Button>
          )}
        </div>
        </CardFooter>
      </form>
        </CardContent>
      </Card>
    </div>
  );
}
