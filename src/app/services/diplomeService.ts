import { toast } from "sonner";
import api from "./api";
import { getUserProfile } from "./profileService";

interface IFormation {
    id?: number;
    title: string;
    level: string;
    school: string;
    location: string;
    date_debut: string;
    date_fin: string;
    description?: string;
    competence?: string;
  }

export const handleAddFormation =async(formData: IFormation): Promise<IFormation | void>=>{
    try{
        const response = await api.post("/user/profil/diplome/", formData)
         if (response?.status === 201) {
             await getUserProfile();
                  toast("Nouvelle formation ajoutée");
                  return response.data;
                }
    } catch(error:any){
        console.error("❌ Erreur lors de l'ajout de la formation :", error);
    throw new Error(error.response?.data || "Erreur lors de l'ajout de la formation.");
    }
}

export const handleDeleteFormation =async(id:number): Promise<void>=>{
    try{
        await api.delete(`/user/profil/diplome/${id}`)
        await getUserProfile();
        
        toast.success("Formation supprimée avec succès !");


    } catch(error:any){
        console.error("❌ Erreur lors de la suppression de la formation :", error);
        toast.error("Erreur lors de la suppression de la formation.");
        throw new Error(error.response?.data || "Erreur lors de la suppression de la formation.");

    }
}

export const handleUpdateFormation =async(id:number, formData:IFormation): Promise<IFormation | void>=>{
    try{
        const response = await api.put(`/user/profil/diplome/${id}`, formData)
        if (response?.status === 200) {
             await getUserProfile();
            toast.success("Formation mise à jour !")
            return response.data;
                }

    } catch(error:any){
        console.error("❌ Erreur lors de la mise à jour de la formation :", error);
    toast.error("Erreur lors de la mise à jour de la formation.");
    throw new Error(error.response?.data || "Erreur lors de la mise à jour de la formation.");
    }
}