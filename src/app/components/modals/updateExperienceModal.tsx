import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { PenIcon, PlusIcon } from "lucide-react";

import {
  handleAddExperience,
  handleUpdateExperience,
} from "@/app/services/experienceService";
import { toast } from "react-toastify";
// import { toast } from "sonner";

interface IExperience {
  id?: number;
  title: string;
  entreprise: string;
  location: string;
  contract: string;
  date_debut: string;
  date_fin: string;
  description: string;
  competence: string;
  en_cours: boolean;
}

interface Props {
  experience?: IExperience;
  onSuccess?: () => void;
}

export default function ExperienceModal({ experience, onSuccess }: Props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialData: IExperience = experience
    ? {
        ...experience,
        // Ensure dates are in YYYY-MM-DD format for input type="date"
        date_debut: experience.date_debut
          ? new Date(experience.date_debut).toISOString().split("T")[0]
          : "",
        date_fin: experience.date_fin && !experience.en_cours
          ? new Date(experience.date_fin).toISOString().split("T")[0]
          : "",
      }
    : {
        title: "",
        entreprise: "",
        location: "",
        contract: "",
        date_debut: "",
        date_fin: "",
        description: "",
        competence: "",
        en_cours: false,
      };

  const [formData, setFormData] = useState<IExperience>(initialData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal open/close

  // Effect to update form data when 'experience' prop changes (e.g., when opening for a different experience)
  useEffect(() => {
    setFormData(initialData);
  }, [experience, initialData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  function handleCheckboxChange(checked: boolean | string) {
    setFormData((prev) => ({
      ...prev,
      en_cours: Boolean(checked),
      date_fin: Boolean(checked) ? "" : prev.date_fin,
    }));
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!formData.en_cours && new Date(formData.date_debut) > new Date(formData.date_fin)) {
  //     toast.error("La date de fin doit être postérieure à la date de début.");
  //     return;
  //   }

  //   try {
  //     if (experience) {
  //       await handleUpdateExperience(experience?.id ?? 0, formData);
  //     } else {
  //       await handleAddExperience(formData);
  //     }
  //   } catch (error) {
  //     toast.error("Erreur lors de l'opération");
  //     console.error("Erreur lors de l'opération", error);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    // Client-side validation: Date de fin must be after Date de début if not "en cours"
    if (!formData.en_cours && formData.date_debut && formData.date_fin) {
      const startDate = new Date(formData.date_debut);
      const endDate = new Date(formData.date_fin);
      if (startDate > endDate) {
        toast.error("La date de fin doit être postérieure à la date de début.");
        setIsSubmitting(false); // Stop loading on validation error
        return;
      }
    }

    try {
      if (experience?.id) {
        // Update existing experience
        await handleUpdateExperience(experience.id, formData);
        toast.success("Expérience mise à jour avec succès !");
      } else {
        // Add new experience
        await handleAddExperience(formData);
        toast.success("Nouvelle expérience ajoutée avec succès !");
      }
      setIsModalOpen(false); // Close the modal on success
      if (onSuccess) {
        onSuccess(); // Call success callback
      }
    } catch (error: any) {
      console.error("❌ Erreur lors de l'opération sur l'expérience :", error);
      // The service functions (handleAddExperience, handleUpdateExperience) already handle toast.error
      // You can add a generic fallback toast here if the service doesn't handle all error types.
      toast.error(error.message || "Erreur lors de l'opération sur l'expérience.");
    } finally {
      setIsSubmitting(false); // End loading
    }
  };
  
  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => {
      setIsModalOpen(open);
      // Reset form data when modal is closed (unless it's closing after submission)
      if (!open && !isSubmitting) {
        setFormData(initialData);
      }
    }}>
      <DialogTrigger asChild>
        <Button className="inline-flex md:gap-4 md:align-baseline">
          {experience ? <PenIcon /> : <PlusIcon />}
          <span className="md:block hidden">
            {experience ? "Modifier" : "Ajouter"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[35em]">
        <DialogHeader>
          <DialogTitle>
            {experience ? "Modifier l'expérience" : "Ajouter une expérience"}
          </DialogTitle>
          <DialogDescription>
            {experience
              ? "Modifiez les détails de votre expérience et enregistrez vos changements."
              : "Ajoutez une nouvelle expérience professionnelle."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {[
              { label: "Titre", name: "title" },
              { label: "Entreprise", name: "entreprise" },
              { label: "Localisation", name: "location" },
              { label: "Contrat", name: "contract" },
              { label: "Date de début", name: "date_debut", type: "date" },
              { label: "Date de fin", name: "date_fin", type: "date" },
              { label: "Description", name: "description" },
              {
                label: "Compétence",
                name: "competence",
                placeholder: "Séparez vos compétences par une virgule",
              },
            ].map(({ label, name, type = "text", placeholder }) => (
              <div key={name} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={name} className="text-right">
                  {label}
                </Label>
                <Input
                  id={name}
                  name={name}
                  type={type}
                  value={
                    type === "date"
                      ? formData[name as keyof IExperience]
                        ? new Date(
                            formData[name as keyof IExperience] as string
                          ).toISOString().split("T")[0]
                        : ""
                      : (formData[name as keyof IExperience] as string) || ""
                  }
                  placeholder={placeholder}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            ))}
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex space-x-2">
                <Checkbox
                  id="en_cours"
                  checked={formData.en_cours}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="en_cours">En cours</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="max-w-44 w-full font-semibold uppercase" type="submit">
              {experience ? "Modifier" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}