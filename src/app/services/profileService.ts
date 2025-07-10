import { toast } from "react-toastify";
import api from "./api"; 
import { handleUpload } from "./companyService"; 

/**
 * @interface IUserProfile
 * @description Représente la structure des données du profil utilisateur.
 * renvoyées par votre API pour le profil utilisateur.
 */
interface IUserProfile {
  id: string; 
  fullName: string;
  email: string;
  phone: string;
  picture: string; 
  domaine?: string; 
  birthdate?: string; // Date de naissance (format string, ex: "YYYY-MM-DD")
  sexe?: string; // Sexe

  formations?: any[];
  experiences?: any[];
}

/**
 * @interface IUpdateUserProfileData
 * @description Représente la structure des données pour la mise à jour du profil utilisateur.
 */
interface IUpdateUserProfileData {
  fullName?: string;
  picture?: string | File; 
  domaine?: string;
  birthdate?: Date | string;
  sexe?: string; 
  phone?: string;
  email?: string;
}


/**
 * @function getUserProfile
 * @description Récupère le profil complet de l'utilisateur actuel.
 * @returns {Promise<IUserProfile | null>} Une promesse qui résout en l'objet profil utilisateur ou null en cas d'erreur.
 * @throws {Error} Lance une erreur si la récupération échoue.
 */
export const getUserProfile = async (): Promise<IUserProfile | null> => {
  try {
    const response = await api.get("/user/profil/");
    if (response.status === 200) {

      return response.data?.user || null;
    }
    // Gérer les statuts non-200 qui ne sont pas des erreurs HTTP directes
    throw new Error(`Réponse inattendue du serveur lors de la récupération du profil: ${response.status}`);
  } catch (error: any) {
    toast.error("Erreur lors de la récupération du profil.");
    console.error("❌ Erreur lors de la récupération du profil :", error);
    // Propager une erreur plus spécifique si disponible
    throw new Error(error.response?.data?.message || "Erreur lors de la récupération du profil.");
  }
};


/**
 * @function updateUserProfile
 * @description Met à jour les informations du profil utilisateur, y compris l'upload de l'image de profil si nécessaire.
 * @param {string} userId L'ID de l'utilisateur dont le profil doit être mis à jour.
 * @param {IUpdateUserProfileData} formData Les données du profil à mettre à jour.
 * @returns {Promise<IUserProfile | null>} Une promesse qui résout en l'objet profil mis à jour ou null en cas d'erreur.
 * @throws {Error} Lance une erreur si l'ID est manquant, l'upload échoue ou la mise à jour échoue.
 */
export const updateUserProfile = async (
  userId: string,
  formData: IUpdateUserProfileData
): Promise<IUserProfile | null> => {
  try {
    if (!userId) {
      toast.error("ID utilisateur manquant pour la mise à jour du profil.");
      throw new Error("ID utilisateur manquant.");
    }

    const updatePayload = { ...formData }; // Créer une copie pour modifier l'image si c'est un fichier

    // Gérer l'upload de l'image de profil si un fichier est fourni
    if (updatePayload.picture && updatePayload.picture instanceof File) {
      try {
        const uploadResponse = await handleUpload("profile_image", userId, updatePayload.picture);
        if (!uploadResponse || !uploadResponse.fileUrl) {
          toast.warning("L'upload de l'image de profil a échoué. Annulation de la mise à jour.");
          console.error("❌ L'upload de l'image de profil a échoué. Annulation de la mise à jour.");
          throw new Error("L'upload de l'image de profil a échoué."); // Stopper la suite
        }
        updatePayload.picture = uploadResponse.fileUrl; // Met à jour avec l'URL du fichier uploadé
        toast.success("Image de profil téléchargée avec succès !");
      } catch (uploadError) {
        console.error("❌ Erreur lors de l'upload de l'image de profil:", uploadError);
        toast.error("❌ Erreur lors de l'upload de l'image de profil.");
        throw new Error("Erreur lors de l'upload de l'image de profil.");
      }
    }

    const response = await api.put("/user/profil/update", updatePayload);
    if (response.status === 200) {
      toast.success("Profil mis à jour avec succès !");
      // Recharger le profil utilisateur pour s'assurer que les données sont à jour
      await getUserProfile();
      // Assurez-vous que l'API renvoie l'objet profil mis à jour dans `response.data`
      return response.data;
    }
    throw new Error(`Échec de la mise à jour du profil avec le code : ${response.status}`);
  } catch (error: any) {
    toast.error("Erreur lors de la mise à jour du profil.");
    console.error("❌ Erreur lors de la mise à jour du profil :", error);
    throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour du profil.");
  }
};
