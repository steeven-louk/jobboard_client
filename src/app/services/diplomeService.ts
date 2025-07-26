import { toast } from "react-toastify";
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


/**
 * @function handleAddFormation
 * @description Ajoute une nouvelle formation au profil de l'utilisateur.
 * @param {IFormation} formData Les données de la formation à ajouter.
 * @returns {Promise<IFormation>} Une promesse qui résout avec l'objet formation créé.
 * @throws {Error} Lance une erreur si l'ajout échoue.
 */
export const handleAddFormation = async (formData: IFormation): Promise<IFormation> => {
  try {
    const response = await api.post("/user/profil/diplome/", formData);

    if (response.status === 201) {
      // Recharger le profil utilisateur pour s'assurer que les données sont à jour
      await getUserProfile();
      toast.success("Nouvelle formation ajoutée avec succès !");
      return response.data;
    }
    // Gérer les statuts non-201 qui ne sont pas des erreurs HTTP directes
    throw new Error(`Réponse inattendue du serveur lors de l'ajout: ${response.status}`);
  } catch (error: any) {
    toast.error("❌ Erreur lors de l'ajout de la formation.");
    console.error("❌ Erreur lors de l'ajout de la formation :", error);

    throw new Error(error.response?.data?.message || "Erreur lors de l'ajout de la formation.");
  }
};



/**
 * @function handleDeleteFormation
 * @description Supprime une formation du profil de l'utilisateur par son ID.
 * @param {number} id L'ID de la formation à supprimer.
 * @returns {Promise<void>} Une promesse qui résout une fois la formation supprimée.
 * @throws {Error} Lance une erreur si la suppression échoue.
 */
export const handleDeleteFormation = async (id: number): Promise<void> => {
  try {
    const response = await api.delete(`/user/profil/diplome/${id}`);

    if (response.status === 200 || response.status === 204) {
      await getUserProfile();
      toast.success("Formation supprimée avec succès !");
    } else {
      throw new Error(`Réponse inattendue du serveur lors de la suppression: ${response.status}`);
    }
  } catch (error: any) {
    console.error("❌ Erreur lors de la suppression de la formation :", error);
    toast.error("❌ Erreur lors de la suppression de la formation.");
    throw new Error(error.response?.data?.message || "Erreur lors de la suppression de la formation.");
  }
};



/**
 * @function handleUpdateFormation
 * @description Met à jour une formation existante du profil de l'utilisateur.
 * @param {number} id L'ID de la formation à mettre à jour.
 * @param {IFormation} formData Les nouvelles données de la formation.
 * @returns {Promise<IFormation>} Une promesse qui résout avec l'objet formation mis à jour.
 * @throws {Error} Lance une erreur si la mise à jour échoue.
 */
export const handleUpdateFormation = async (id: number, formData: IFormation): Promise<IFormation> => {
  try {
    const response = await api.put(`/user/profil/diplome/${id}`, formData);

    if (response.status === 200) {

      await getUserProfile();
      toast.success("Formation mise à jour avec succès !");
      return response.data;
    }
    // Gérer les statuts non-200 qui ne sont pas des erreurs HTTP directes
    throw new Error(`Réponse inattendue du serveur lors de la mise à jour: ${response.status}`);
  } catch (error: any) {
    console.error("❌ Erreur lors de la mise à jour de la formation :", error);
    toast.error("❌ Erreur lors de la mise à jour de la formation.");
    throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour de la formation.");
  }
};
