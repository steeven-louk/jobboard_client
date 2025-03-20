import { toast } from "sonner";
import api from "./api";
import { handleUpload } from "./companyService";

export const getUserProfile = async () => {
    try {
      const user = await api.get("/user/profil/");
      if(user.status === 200){
        const {data} =  user
       
        return data?.user;
      }
    } catch (error:any) {
        console.log(error);
        toast("Erreur", {
          description: "Erreur de récupération du profil",
        });
      throw new Error(error.response?.data || "Erreur de récupération du profil");
    }
  };

  export const updateUserProfile = async (userId:string,formData:{fullName?: string;picture?:File;domaine?:string;birthdate?:string;sexe:string;phone:string,email:string}) => {
    try {
      console.log("formaddata", formData)
      console.log("formaddata pic", formData.picture)

      if(!userId)return;

      if (formData.picture && formData.picture instanceof File) {
        const uploadResponse = await handleUpload("profile_image", userId, formData.picture);
        console.log("upload reponse", uploadResponse)
        if (!uploadResponse || !uploadResponse.fileUrl) {
          toast("Erreur", {
            description: "L'upload du picture a échoué. Annulation de la mise à jour.",
          });
          console.error("L'upload du picture a échoué. Annulation de la mise à jour.");
          return null; // Ne pas continuer si l'upload échoue
        }
        formData.picture = uploadResponse.fileUrl; // Met à jour `data.logo` avec l'URL du fichier
      }
      const response = await api.put("/user/profil/update", formData);
      if (response.status === 200) {
        console.log("Mise à jour réussie :", response.data);
        toast("Mise à jour réussie");
        await getUserProfile();
        return response.data;
    }
    } catch (error) {
      toast("Erreur", {
        description: "Erreur de la modification du profil.",
      });
        console.log("Erreur de la modification du profil",error)
      throw error?.response?.data || "Erreur de la modification du profil";
    }
  };