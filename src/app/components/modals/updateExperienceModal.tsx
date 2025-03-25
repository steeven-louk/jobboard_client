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
  experience?: IExperience; // Rend la prop optionnelle pour l'ajout
}

export default function ExperienceModal({ experience }: Props) {
  const [formData, setFormData] = useState<IExperience>(
    experience || {
      title: "",
      entreprise: "",
      location: "",
      contract: "",
      date_debut: "",
      date_fin: "",
      description: "",
      competence: "",
      en_cours: false,
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  function handleCheckboxChange(checked: boolean | string) {
    setFormData((prev) => ({ ...prev, en_cours: Boolean(checked) }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.en_cours && new Date(formData.date_debut) > new Date(formData.date_fin)) {
      toast.error("La date de fin doit être postérieure à la date de début.");
      return;
    }

    try {
      if (experience) {
        await handleUpdateExperience(experience?.id ?? 0, formData);
      } else {
        await handleAddExperience(formData);
      }
    } catch (error) {
      toast.error("Erreur lors de l'opération");
      console.error("Erreur lors de l'opération", error);
    }
  };

  return (
    <Dialog>
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






// import React, { useState } from "react";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";

// import { PenIcon, PlusIcon } from "lucide-react";

// import {
//   handleAddExperience,
//   handleUpdateExperience,
// } from "@/app/services/experienceService";
// import { toast } from "sonner";

// interface IExperience {
//   id?: number;
//   title: string;
//   entreprise: string;
//   location: string;
//   contract: string;
//   date_debut: string;
//   date_fin: string;
//   description: string;
//   competence: string;
//   en_cours: boolean;
// }
// interface Props {
//   experience?: IExperience; // Rend la prop optionnelle pour l'ajout
// }

// export default function ExperienceModal({ experience }: Props) {
//   // Définir les valeurs par défaut si aucune expérience n'est fournie (mode ajout)
//   const [formData, setFormData] = useState<IExperience>(
//     experience || {
//       title: "",
//       entreprise: "",
//       location: "",
//       contract: "",
//       date_debut: "",
//       date_fin: "",
//       description: "",
//       competence: "",
//       en_cours: false,
//     }
//   );

//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   function handleCheckboxChange(checked: boolean | string) {
//     setFormData((prev: IExperience) => ({ ...prev, en_cours: Boolean(checked) }));
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.en_cours && new Date(formData.date_debut) > new Date(formData.date_fin)) {
//       toast.error("La date de fin doit être postérieure à la date de début.");
//       return;
//     }

//     try {
//       if (experience) {
//         // Mise à jour
//          await handleUpdateExperience(experience?.id ?? 0, formData);
       
//       } else {
//         // Ajout
//         await handleAddExperience(formData);
        
//       }
//     } catch (error) {
//       toast("Erreur", {
//         description: "Erreur lors de l'opération",
//       });
//       console.error("Erreur lors de l'opération", error);
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="inline-flex md:gap-4 md:align-baseline">
//           {experience ? <PenIcon /> : <PlusIcon />}
//           <span className="md:block hidden">
//             {experience ? "Modifier" : "Ajouter"}
//           </span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-[425px] md:max-w-[35em]">
//         <DialogHeader>
//           <DialogTitle>
//             {experience ? "Modifier l'expérience" : "Ajouter une expérience"}
//           </DialogTitle>
//           <DialogDescription>
//             {experience
//               ? "Modifiez les détails de votre expérience et enregistrez vos changements."
//               : "Ajoutez une nouvelle expérience professionnelle."}
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             {[
//               { label: "Titre", name: "title" },
//               { label: "Entreprise", name: "entreprise" },
//               { label: "Localisation", name: "location" },
//               { label: "Contrat", name: "contract" },
//               { label: "Date de debut", name: "date_debut", type: "date" },
//               { label: "Date de fin", name: "date_fin", type: "date" },
//               { label: "Description", name: "description" },
//               {
//                 label: "Compétence",
//                 name: "competence",
//                 placeholder: "separé vos competences d'une virgule",
//               },
//             ].map(({ label, name, type = "text" }) => (
//               <div key={name} className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor={name} className="text-right">
//                   {label}
//                 </Label>
//                 <Input
//                   id={name}
//                   name={name}
//                   type={type}
//                   // value={formData[name as keyof IExperience]}
//                   value={
//                     name === "date_debut" || name === "date_fin"
//                       ? new Date(formData[name as keyof IExperience]).toISOString().split("T")[0]
//                       : (formData[name as keyof IExperience] as string) || ""
//                   }
//                   onChange={handleChange}
//                   className="col-span-3"
//                 />
//               </div>
//             ))}
//             <div className="grid grid-cols-4 items-center gap-4">
//               <div className="flex space-x-2">
//                 <Checkbox
//                   id="en_cours"
//                   checked={formData.en_cours}
//                   onCheckedChange={handleCheckboxChange}
//                 />
//                 <Label htmlFor="en_cours">En cours</Label>
//               </div>
//             </div>
//           </div>
//           <DialogFooter className="">
//             <Button
//               className="max-w-44 w-full font-semibold uppercase"
//               type="submit"
//             >
//               {experience ? "Modifier" : "Ajouter"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
