import React, { useState } from "react";

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

import { Loader2, PenIcon, PlusIcon } from "lucide-react";

import {
  handleAddFormation,
  handleUpdateFormation,
} from "@/app/services/diplomeService";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";

interface Diplome {
  id?: number;
  title: string;
  level: string;
  location: string;
  school: string;
  date_debut: string;
  date_fin: string;
  description?: string;
  competence?: string;
}

interface Props {
  diplome?: Diplome;
  onSuccess?:()=> void;
}

export default function DiplomeModal({ diplome, onSuccess }: Props) {
  // Définir les valeurs par défaut si aucune expérience n'est fournie (mode ajout)
  const [formData, setFormData] = useState<Diplome>(
    diplome || {
      title: "",
      level: "",
      school: "",
      location: "",
      date_debut: "",
      date_fin: "",
      description: "",
      competence: "",
    }
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // État pour contrôler l'ouverture/fermeture du dialogue.
  const [open, setOpen] = useState(false);

  /**
   * @function handleChange
   * @description Gère les changements dans les champs de saisie du formulaire.
   * Met à jour l'état `formData` avec les nouvelles valeurs.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e L'événement de changement.
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  /**
   * @function handleSubmit
   * @description Gère la soumission du formulaire (ajout ou modification de formation).
   * Appelle les services `handleAddFormation` ou `handleUpdateFormation`.
   * Gère les états de chargement et les messages toast.
   * @param {React.FormEvent} e L'événement de soumission du formulaire.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut
    setIsLoading(true); // Active l'état de chargement

    try {
      if (diplome?.id) {
        // Mode modification : l'ID doit exister pour la mise à jour
        await handleUpdateFormation(diplome.id, formData);
        toast.success("Formation mise à jour avec succès !");
      } else {
        // Mode ajout : pas d'ID initial
        await handleAddFormation(formData);
        toast.success("Formation ajoutée avec succès !");
      }
      setOpen(false); // Ferme le dialogue après une soumission réussie

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("❌ Erreur lors de l'opération sur la formation :", error);

      toast.error(error.message || "Erreur lors de l'opération sur la formation.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex md:gap-4 md:align-baseline">
          {diplome ? <PenIcon /> : <PlusIcon />}
          <span className="md:block hidden">
            {diplome ? "Modifier" : "Ajouter"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[35em]">
        <DialogHeader>
          <DialogTitle>
            {diplome ? "Modifier la formation" : "Ajouter une formation"}
          </DialogTitle>
          <DialogDescription>
            {diplome
              ? "Modifiez les détails de votre formation et enregistrez vos changements."
              : "Ajoutez une nouvelle formation."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {[
              { label: "Titre", name: "title", type: "text", required: true },
              { label: "Niveau", name: "level", type: "text", required: true },
              { label: "Etablissement", name: "school", type: "text", required: true },
              { label: "Localisation", name: "location", type: "text", required: true },
              { label: "Date de début", name: "date_debut", type: "date", required: true },
              { label: "Date de fin", name: "date_fin", type: "date", required: true },
              { label: "Description", name: "description", component: "textarea" },
              {
                label: "Compétence",
                name: "competence",
                type: "text",
                placeholder: "séparer vos compétences d'une virgule",
              },
            ].map(({ label, name, type = "text", component = "input", placeholder, required = false }) => (
              <div key={name} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={name} className="text-right">
                  {label}
                  {required && <span className="text-red-500">*</span>}
                </Label>
               {component === "textarea" ? (
                  <Textarea
                    id={name}
                    name={name}
                    value={formData[name as keyof Diplome] || ""}
                    onChange={handleChange}
                    className="col-span-3"
                    disabled={isLoading}
                    placeholder={placeholder}
                    required={required}
                  />
                ) : (
                  <Input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name as keyof Diplome] || ""}
                    onChange={handleChange}
                    className="col-span-3"
                    disabled={isLoading}
                    placeholder={placeholder}
                    required={required}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              className="max-w-44 w-full font-semibold uppercase"
              type="submit"
              disabled={isLoading} // Désactive le bouton pendant le chargement
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {diplome ? "Modification..." : "Ajout en cours..."}
                </>
              ) : (
                diplome ? "Modifier" : "Ajouter"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
