import { toast } from "sonner";
import api from "./api";
import { getUserProfile } from "./profileService";

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

export const handleAddExperience =async(formData:IExperience):Promise<IExperience | void >=>{
    try{
        const response = await api.post("/user/profil/experience/", formData);
        if (response?.status === 201) {
            await getUserProfile();
                  toast("Nouvelle expérience ajoutée");
                  return response.data;
                }
    } catch(error){
        console.error("❌ Erreur lors de l'ajout de l'expérience :", error);
    throw new Error(error.response?.data || "Erreur lors de l'ajout de l'expérience.");
    }
}

export const handleDeleteExperience =async(id:number):Promise<void>=>{
    try{
        await api.delete(`/user/profil/experience/${id}`)
        await getUserProfile();

    } catch(error:any){
        console.error("❌ Erreur lors de la suppression de l'expérience :", error);
    throw new Error(error.response?.data || "Erreur lors de la suppression de l'expérience.");

    }
}

export const handleUpdateExperience =async(id:number, formData:IExperience):Promise<IExperience | void>=>{
    try{
        const response = await api.put(`/user/profil/experience/${id}`, formData)
        if (response?.status === 200) {  
            await getUserProfile();
            toast.success("Expérience mise à jour");
            return response.data;
          }

    } catch(error:any){
        console.error("❌ Erreur lors de la mise à jour de l'expérience :", error);
        throw new Error(error.response?.data || "Erreur lors de la mise à jour de l'expérience.");
    }
}