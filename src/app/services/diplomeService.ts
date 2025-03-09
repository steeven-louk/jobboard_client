import { toast } from "sonner";
import api from "./api";
import { getUserProfile } from "./profileService";


export const handleAddFormation =async(formData)=>{
    try{
        const response = await api.post("/user/profil/diplome/", formData)
        await getUserProfile();
        return response;
    } catch(error){
        console.log(error);
    }
}

export const handleDeleteFormation =async(id:number)=>{
    try{
        const response = await api.delete(`/user/profil/diplome/${id}`)
        await getUserProfile();
        console.log(response)
        return response;


    } catch(error){
        console.log(error);
        toast("Erreur", {
            description: "erreur lors de la suppression de l'experience",
          })
        console.log("erreur lors de la suppression de l'experience" ,error)

    }
}

export const handleUpdateFormation =async(id:number, formData)=>{
    try{
        const response = await api.put(`/user/profil/diplome/${id}`, formData)
        await getUserProfile();
        return response;

    } catch(error){
        console.log(error);
    }
}