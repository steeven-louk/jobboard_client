"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod"; // Schéma de validation Zod
import { zodResolver } from "@hookform/resolvers/zod"; // Résolveur Zod pour React Hook Form

import ProtectedRoute from "@/app/components/protectedRoutes";

import { loadStripe } from "@stripe/stripe-js";
import api from "@/app/services/api";
import { toast } from "react-toastify";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
// import axios from "axios";

// interface IJobType {
//   title: string;
//   location: string;
//   salary: number | string;
//   jobType: string;
//   description: string;
//   skill: string;
//   requirement: string;
//   duration: string;
//   expiration_date: Date | string |null;
//   selectedOffer: Offer | null;
// }

interface Offer {
  id: string;
  description: string;
  price: number;
  duration: number;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
// Schéma pour l'étape 1 du formulaire
const step1Schema = z.object({
  title: z.string().min(3, "Le titre du poste est trop court.").nonempty("Le titre du poste est requis."),
  location: z.string().min(2, "La localisation est trop courte.").nonempty("La localisation est requise."),
  salary: z.union([
    z.number().min(0, "Le salaire ne peut pas être négatif."),
    z.string().regex(/^\d+$/, "Le salaire doit être un nombre.").transform(Number).pipe(z.number().min(0, "Le salaire ne peut pas être négatif."))
  ]).refine(val => val !== null, "Le salaire est requis."), // Permet un nombre ou une chaîne convertible en nombre
  jobType: z.string().nonempty("Le type de contrat est requis."),
  duration: z.string().min(2, "La durée est trop courte.").nonempty("La durée est requise."),
  description: z.string().min(20, "La description est trop courte (min. 20 caractères).").nonempty("La description du poste est requise."),
});

// Schéma pour l'étape 2 du formulaire
const step2Schema = z.object({
  skill: z.string().min(10, "Les compétences sont trop courtes (min. 10 caractères).").nonempty("Les compétences sont requises."),
  requirement: z.string().min(10, "Les exigences sont trop courtes (min. 10 caractères).").nonempty("Les exigences sont requises."),
  expiration_date: z.string().nonempty("La date d'expiration est requise.").refine((dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour une comparaison correcte
    const expirationDate = new Date(dateStr);
    return expirationDate >= today;
  }, { message: "La date d'expiration ne peut pas être dans le passé." }),
});

// Schéma pour l'étape 3 (sélection de l'offre) - les champs sont gérés par l'état local
const step3Schema = z.object({
  selectedOffer: z.object({
    id: z.string(),
    description: z.string(),
    price: z.number(),
    duration: z.number(),
  }, { required_error: "Veuillez choisir une offre de publication." }).nullable()
    .refine(offer => offer !== null, { message: "Veuillez choisir une offre de publication." }),
});

// Schéma combiné pour la soumission finale (tous les champs du formulaire)
const jobFormSchema = z.object({
  title: step1Schema.shape.title,
  location: step1Schema.shape.location,
  salary: step1Schema.shape.salary,
  jobType: step1Schema.shape.jobType,
  duration: step1Schema.shape.duration,
  description: step1Schema.shape.description,
  skill: step2Schema.shape.skill,
  requirement: step2Schema.shape.requirement,
  expiration_date: step2Schema.shape.expiration_date,
  selectedOffer: step3Schema.shape.selectedOffer,
});

// Interface pour les données du formulaire, dérivée du schéma Zod
type IJobFormData = z.infer<typeof jobFormSchema>;

export default function NewJobPage() {
  // const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  // const stripePromise = loadStripe(
  //   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  // );

  // const [jobData, setJobData] = useState<IJobType>({
  //   title: "",
  //   location: "",
  //   salary: "",
  //   jobType: "",
  //   description: "",
  //   skill: "",
  //   requirement: "",
  //   duration: "",
  //   expiration_date: "",
  //   selectedOffer: null,
  // });

  const offerTypes: Offer[] = [
    {
      id: "Offre Basic",
      description: "Visibilité standard",
      price: 50,
      duration: 30,
    },
    {
      id: "Offre Premium",
      description: "Visibilité accrue",
      price: 100,
      duration: 60,
    },
    {
      id: "Offre Gold",
      description: "Visibilité maximale",
      price: 200,
      duration: 90,
    },
  ];

    // Utilisation de React Hook Form pour la gestion du formulaire
  const {
    register,
    handleSubmit,
    setValue, // Pour mettre à jour les valeurs des champs contrôlés
    watch, // Pour observer les changements de valeurs
    formState: { errors }, // Accès aux erreurs de validation
    trigger, // Pour déclencher la validation manuellement
  } = useForm<IJobFormData>({
    resolver: zodResolver(jobFormSchema), // Utilise Zod pour la validation
    mode: "onBlur", // Valide au blur pour une meilleure UX
    defaultValues: {
      // Définir des valeurs par défaut pour les champs
      title: "",
      location: "",
      salary: 0,
      jobType: "",
      description: "",
      skill: "",
      requirement: "",
      duration: "",
      expiration_date: "",
      selectedOffer: undefined, // Aucune offre sélectionnée par défaut
    },
  });

  // Observer la valeur de `selectedOffer` pour la radio group
  const selectedOffer = watch("selectedOffer");

    /**
   * @function handleNextStep
   * @description Gère le passage à l'étape suivante du formulaire.
   * Valide les champs de l'étape actuelle avant de passer.
   */
  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger([
        "title",
        "location",
        "salary",
        "jobType",
        "duration",
        "description",
      ]);
    } else if (step === 2) {
      isValid = await trigger(["skill", "requirement", "expiration_date"]);
    }

    if (isValid) {
      setStep((prevStep) => prevStep + 1);
    } else {
      toast.warning("Veuillez remplir tous les champs obligatoires correctement avant de continuer.");
    }
  };

  /**
   * @function handlePrevStep
   * @description Gère le retour à l'étape précédente du formulaire.
   */
  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

   const handleOfferChange = (value: string) => {
    const offer = offerTypes.find((o) => o.id === value);
    setValue("selectedOffer", offer || null, { shouldValidate: true }); // Met à jour la valeur et déclenche la validation
  };


  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setJobData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSelectChange = (name: string, value: string) => {
  //   setJobData((prev) => ({ ...prev, [name]: value }));
  // };

  const onSubmit: SubmitHandler<IJobFormData> = async (data) => {
    setLoading(true); // Active l'état de chargement

    if (!data.selectedOffer) {
      toast.info("Veuillez choisir une offre avant de publier.");
      setLoading(false);
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        console.error("❌ Erreur Stripe : Impossible de charger le paiement.");
        toast.error("Erreur de paiement. Veuillez réessayer.");
        setLoading(false);
        return;
      }

      // Appel à votre API backend pour créer une session de paiement Stripe
      const response = await api.post("/payment/create-checkout-session", {
        jobData: data, // Passe toutes les données du job
        offerId: data.selectedOffer.id,
        amount: data.selectedOffer.price,
      });

      const session = response.data; // La réponse doit contenir l'objet session de Stripe
      if (session.sessionId) {
        // Redirige l'utilisateur vers la page de paiement Stripe
        await stripe.redirectToCheckout({ sessionId: session.sessionId });
      } else {
        throw new Error("ID de session Stripe manquant.");
      }
    } catch (error: any) {
      console.error("❌ Erreur lors de la publication de l'offre ou du paiement :", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Erreur lors de la publication de l'offre ou du paiement.");
    } finally {
      setLoading(false); // Désactive l'état de chargement
    }
  };


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!jobData.selectedOffer) {
  //     alert("Veuillez choisir une offre avant de publier.");
  //     toast.info("Veuillez choisir une offre avant de publier.");
  //     return;
  //   }

  //   try {
  //     const stripe = await stripePromise;
  //     if (!stripe) {
  //       console.error("Erreur Stripe : Impossible de charger le paiement.");
  //       return;
  //     }

  //     const response = await api.post("/payment/create-checkout-session", {
  //       jobData,
  //       offerId: jobData?.selectedOffer?.id,
  //       amount: jobData.selectedOffer?.price,
  //     });

  //     const session = response;
  //     await stripe?.redirectToCheckout({ sessionId: session.data.sessionId });
  //   } catch (error) {
  //     console.error("Erreur:", error);
  //   }
  // };

  // const handleOfferChange = (value: string) => {
  //   const selectedOffer =
  //     offerTypes.find((offer) => offer.id === value) || offerTypes[0];
  //   setJobData((prev) => ({ ...prev, selectedOffer }));
  // };

  return (
    // <ProtectedRoute requiredRole="RECRUITER">
    //   <div className="container  mx-auto px-4 py-8 ">
    //     <h1 className="text-3xl font-bold mb-6 text-center">
    //       Ajouter une nouvelle offre d&apos;emploi
    //     </h1>

    //     <form
    //       onSubmit={handleSubmit(onSubmit)}
    //       className="shadow-md shadow-black rounded-md p-4 space-y-4 max-w-3xl mx-auto"
    //     >
    //       <Progress value={(step / 3) * 100} className="mb-6" />
    //       {step === 1 && (
    //         <>
    //           <div className="form-group grid grid-cols-1 gap-2 md:gap-0 md:space-x-3 md:grid-cols-2">
    //             <div>
    //               <Label htmlFor="title">Titre du poste</Label>
    //               <Input
    //                 id="title"
    //                 name="title"
    //                 value={jobData.title}
    //                 onChange={handleInputChange}
    //                 required
    //               />
    //             </div>

    //             <div>
    //               <Label htmlFor="location">Localisation</Label>
    //               <Input
    //                 id="location"
    //                 name="location"
    //                 value={jobData.location}
    //                 onChange={handleInputChange}
    //                 required
    //               />
    //             </div>
    //           </div>

    //           <div className="form-group grid grid-cols-1 gap-2 md:gap-0 md:space-x-3 md:grid-cols-2">
    //             <div>
    //               <Label htmlFor="salary">Salaire</Label>
    //               <Input
    //                 id="salary"
    //                 name="salary"
    //                 type="number"
    //                 value={jobData.salary}
    //                 onChange={handleInputChange}
    //                 required
    //               />
    //             </div>

    //             <div>
    //               <Label htmlFor="jobType">Type de contrat</Label>
    //               <Select
    //                 value={jobData.jobType}
    //                 onValueChange={(value) =>
    //                   handleSelectChange("jobType", value)
    //                 }
    //                 required
    //               >
    //                 <SelectTrigger name="jobType">
    //                   <SelectValue placeholder="Sélectionnez le type de contrat" />
    //                 </SelectTrigger>
    //                 <SelectContent>
    //                   <SelectItem value="CDI">CDI</SelectItem>
    //                   <SelectItem value="CDD">CDD</SelectItem>
    //                   <SelectItem value="FREELANCE">Freelance</SelectItem>
    //                   <SelectItem value="STAGE">Stage</SelectItem>
    //                   <SelectItem value="INTERIM">Interim</SelectItem>
    //                 </SelectContent>
    //               </Select>
    //             </div>
    //           </div>

    //           <div>
    //             <Label htmlFor="duration">Durée (en mois/années)</Label>
    //             <Input
    //               id="duration"
    //               name="duration"
    //               type="text"
    //               value={jobData.duration}
    //               onChange={handleInputChange}
    //               required
    //               placeholder="exemple: 18mois ou 2ans"
    //             />
    //           </div>
    //           <div>
    //             <Label htmlFor="description">Description du poste</Label>
    //             <Textarea
    //               id="description"
    //               name="description"
    //               value={jobData.description}
    //               onChange={handleInputChange}
    //               rows={8}
    //               required
    //             />
    //           </div>
    //         </>
    //       )}

    //       {step === 2 && (
    //         <>
    //           <div>
    //             <Label htmlFor="skill">Compétences requises</Label>
    //             <Textarea
    //               id="skill"
    //               name="skill"
    //               value={jobData.skill}
    //               onChange={handleInputChange}
    //               rows={5}
    //               required
    //             />
    //           </div>

    //           <div>
    //             <Label htmlFor="requirement">Exigences</Label>
    //             <Textarea
    //               id="requirement"
    //               name="requirement"
    //               value={jobData.requirement}
    //               onChange={handleInputChange}
    //               rows={5}
    //               required
    //             />
    //           </div>

    //           <div>
    //             <Label htmlFor="expiration_date">
    //               Date d&apos;expiration de l&apos;offre
    //             </Label>
    //             <Input
    //               id="expiration_date"
    //               name="expiration_date"
    //               type="date"
    //               value={jobData.expiration_date ? new Date(jobData.expiration_date).toISOString().split('T')[0] : ""}
    //               onChange={handleInputChange}
    //               required
    //             />
    //           </div>
    //         </>
    //       )}
    //       {step === 3 && (
    //         <>
    //           <div className="space-y-4">
    //             <Label className="text-xl font-semibold">
    //               Choisissez votre offre de publication
    //             </Label>
    //             <RadioGroup
    //               onValueChange={handleOfferChange}
    //               defaultValue={offerTypes[0].id}
    //             >
    //               {offerTypes.map((offer, index) => (
    //                 <div key={index} className="relative">
    //                   <RadioGroupItem
    //                     value={offer.id}
    //                     id={`offer-${index}`}
    //                     className="sr-only"
    //                   />
    //                   <Label
    //                     htmlFor={`offer-${index}`}
    //                     className="flex flex-col cursor-pointer"
    //                   >
    //                     <Card
    //                       className= "border-green-500  hover:bg-secondary/50 p-4 border-2 transition-all"
                         
    //                     >
    //                       <div className="flex justify-between items-center">
    //                         <div>
    //                           <p className="font-semibold text-lg">
    //                             {offer.duration} jours
    //                           </p>
    //                           <p className="text-sm text-muted-foreground">
    //                             {offer.description}
    //                           </p>
    //                         </div>
    //                         <div className="text-right">
    //                           <p className="text-xl font-bold">
    //                             {offer.price}€
    //                           </p>
    //                           <p>
    //                             {(offer.price / offer.duration).toFixed(2)} /
    //                             jours
    //                           </p>
    //                         </div>
    //                       </div>
    //                     </Card>
    //                   </Label>
    //                 </div>
    //               ))}
    //             </RadioGroup>
    //           </div>
    //         </>
    //       )}

    //       {/* Navigation entre les étapes */}
    //       <CardFooter>
    //         <div className="flex justify-between gap-4 md:gap-0 mt-4">
    //           {step > 1 && (
    //             <Button type="button" onClick={() => setStep(step - 1)}>
    //               Précédent
    //             </Button>
    //           )}

    //           {step < 3 ? (
    //             <Button
    //               type="button"
    //               className="ml-5"
    //               onClick={() => setStep(step + 1)}
    //             >
    //               Suivant
    //             </Button>
    //           ) : (
    //             <Button type="submit" className="bg-green-500 ml-5">
    //               Publier l&apos;offre
    //             </Button>
    //           )}
    //         </div>
    //       </CardFooter>
    //     </form>
    //   </div>
    // </ProtectedRoute>
    <ProtectedRoute requiredRole="RECRUITER">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Ajouter une nouvelle offre d&apos;emploi
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)} // Utilise handleSubmit de React Hook Form
          className="shadow-md shadow-black rounded-md p-4 space-y-4 max-w-3xl mx-auto"
        >
          {/* Barre de progression */}
          <Progress value={(step / 3) * 100} className="mb-6" />

          {/* Étape 1 : Informations de base du poste */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Détails du poste</h2>
              <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Titre du poste</Label>
                  <Input
                    id="title"
                    {...register("title")} 
                    placeholder="Développeur Fullstack"
                    disabled={loading}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    {...register("location")}
                    placeholder="Paris, France"
                    disabled={loading}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                </div>
              </div>

              <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary">Salaire (€)</Label>
                  <Input
                    id="salary"
                    {...register("salary")}
                    type="number" 
                    placeholder="50000"
                    disabled={loading}
                  />
                  {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>}
                </div>

                <div>
                  <Label htmlFor="jobType">Type de contrat</Label>
                  <Select
                    value={watch("jobType")} // Utilise watch pour la valeur
                    onValueChange={(value) => setValue("jobType", value, { shouldValidate: true })}
                    disabled={loading}
                  >
                    <SelectTrigger id="jobType" name="jobType">
                      <SelectValue placeholder="Sélectionnez le type de contrat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CDI">CDI</SelectItem>
                      <SelectItem value="CDD">CDD</SelectItem>
                      <SelectItem value="FREELANCE">Freelance</SelectItem>
                      <SelectItem value="STAGE">Stage</SelectItem>
                      <SelectItem value="INTERIM">Interim</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="duration">Durée (ex: 18 mois, 2 ans)</Label>
                <Input
                  id="duration"
                  {...register("duration")}
                  type="text"
                  placeholder="Exemple : 18 mois ou 2 ans"
                  disabled={loading}
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description du poste</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  rows={8}
                  placeholder="Décrivez les missions, responsabilités..."
                  disabled={loading}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>
            </>
          )}

          {/* Étape 2 : Compétences et Exigences */}
          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Compétences et Exigences</h2>
              <div>
                <Label htmlFor="skill">Compétences requises (séparées par des virgules)</Label>
                <Textarea
                  id="skill"
                  {...register("skill")}
                  rows={5}
                  placeholder="Exemple : React, Node.js, TypeScript, SQL"
                  disabled={loading}
                />
                {errors.skill && <p className="text-red-500 text-sm mt-1">{errors.skill.message}</p>}
              </div>

              <div>
                <Label htmlFor="requirement">Exigences du candidat</Label>
                <Textarea
                  id="requirement"
                  {...register("requirement")}
                  rows={5}
                  placeholder="Exemple : Bac+5 en informatique, 3 ans d'expérience..."
                  disabled={loading}
                />
                {errors.requirement && <p className="text-red-500 text-sm mt-1">{errors.requirement.message}</p>}
              </div>

              <div>
                <Label htmlFor="expiration_date">Date d&apos;expiration de l&apos;offre</Label>
                <Input
                  id="expiration_date"
                  {...register("expiration_date")}
                  type="date"
                  disabled={loading}
                />
                {errors.expiration_date && <p className="text-red-500 text-sm mt-1">{errors.expiration_date.message}</p>}
              </div>
            </>
          )}

          {/* Étape 3 : Choix de l'offre de publication */}
          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Choisissez votre offre de publication</h2>
              <div className="space-y-4">
                <RadioGroup
                  value={selectedOffer?.id || ""} 
                  onValueChange={handleOfferChange}
                  disabled={loading}
                >
                  {offerTypes.map((offer) => (
                    <div key={offer.id} className="relative">
                      <RadioGroupItem
                        value={offer.id}
                        id={`offer-${offer.id}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`offer-${offer.id}`}
                        className={`flex flex-col cursor-pointer p-4 border-2 rounded-md transition-all
                          ${selectedOffer?.id === offer.id ? "border-green-500 bg-green-50" : "border-gray-200 hover:bg-secondary/50"}
                        `}
                      >
                        <Card className="border-none shadow-none p-0">
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
                              <p className="text-xl font-bold">
                                {offer.price}€
                              </p>
                              <p className="text-sm">
                                {(offer.price / offer.duration).toFixed(2)} € / jour
                              </p>
                            </div>
                          </div>
                        </Card>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.selectedOffer && <p className="text-red-500 text-sm mt-1">{errors.selectedOffer.message}</p>}
              </div>
            </>
          )}

          {/* Navigation entre les étapes */}
          <CardFooter className="flex justify-between mt-6 p-0"> {/* Ajustement du padding */}
            {step > 1 && (
              <Button type="button" onClick={handlePrevStep} disabled={loading}>
                Précédent
              </Button>
            )}

            {step < 3 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                className="ml-auto" // Aligner à droite si seul bouton
                disabled={loading}
              >
                Suivant
              </Button>
            ) : (
              <Button type="submit" className="bg-green-500 ml-auto" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publication en cours...
                  </>
                ) : (
                  "Publier l'offre et payer" // Texte plus explicite
                )}
              </Button>
            )}
          </CardFooter>
        </form>
      </div>
    </ProtectedRoute>
  );
}
