import api from "./api";
import { getUserProfile } from "./profileService";


export const handleAddExperience =async(formData)=>{
    try{
        const response = await api.post("/user/profil/experience/", formData)
        await getUserProfile();
        return response;
    } catch(error){
        console.log(error);
    }
}

export const handleDeleteExperience =async(id:number)=>{
    try{
        const experience = await api.delete(`/user/profil/experience/${id}`)
        await getUserProfile();
        return experience;


    } catch(error){
        console.log(error);
    }
}

export const handleUpdateExperience =async(id:number, formData)=>{
    try{
        const response = await api.put(`/user/profil/experience/${id}`, formData)
        await getUserProfile();
        return response;


    } catch(error){
        console.log(error);
    }
}