import { toast } from "react-toastify";
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


/**
 * @function handleAddExperience
 * @description Ajoute une nouvelle expérience professionnelle au profil de l'utilisateur.
 * @param {IExperience} formData Les données de l'expérience à ajouter.
 * @returns {Promise<IExperience>} Une promesse qui résout avec l'objet expérience créé.
 * @throws {Error} Lance une erreur si l'ajout échoue.
 */
export const handleAddExperience = async (formData: IExperience): Promise<IExperience> => {
  try {
    const response = await api.post("/user/profil/experience/", formData);

    if (response.status === 201) {
      // Recharger le profil utilisateur pour s'assurer que les données sont à jour
      // Cela dépend de la manière dont getUserProfile est implémenté et si ses données sont utilisées globalement.
      await getUserProfile();
      toast.success("Nouvelle expérience ajoutée avec succès !");
      // Assurez-vous que l'API renvoie l'objet expérience créé dans `response.data`
      return response.data;
    }
    // Gérer les statuts non-201 qui ne sont pas des erreurs HTTP directes
    throw new Error(`Réponse inattendue du serveur lors de l'ajout: ${response.status}`);
  } catch (error: any) {
    toast.error("❌ Erreur lors de l'ajout de l'expérience.");
    console.error("❌ Erreur lors de l'ajout de l'expérience :", error);
    // Propager une erreur plus spécifique si disponible
    throw new Error(error.response?.data?.message || "Erreur lors de l'ajout de l'expérience.");
  }
};


/**
 * @function handleDeleteExperience
 * @description Supprime une expérience professionnelle du profil de l'utilisateur par son ID.
 * @param {number} id L'ID de l'expérience à supprimer.
 * @returns {Promise<void>} Une promesse qui résout une fois l'expérience supprimée.
 * @throws {Error} Lance une erreur si la suppression échoue.
 */
export const handleDeleteExperience = async (id: number): Promise<void> => {
  try {
    const response = await api.delete(`/user/profil/experience/${id}`);

    if (response.status === 200 || response.status === 204) { // 204 No Content est courant pour les suppressions réussies
      // Recharger le profil utilisateur après la suppression
      await getUserProfile();
      toast.success("Expérience supprimée avec succès !");
    } else {
      // Gérer les statuts non-200/204 qui ne sont pas des erreurs HTTP directes
      throw new Error(`Réponse inattendue du serveur lors de la suppression: ${response.status}`);
    }
  } catch (error: any) {
    toast.error("❌ Erreur lors de la suppression de l'expérience.");
    console.error("❌ Erreur lors de la suppression de l'expérience :", error);
    throw new Error(error.response?.data?.message || "Erreur lors de la suppression de l'expérience.");
  }
};


/**
 * @function handleUpdateExperience
 * @description Met à jour une expérience professionnelle existante du profil de l'utilisateur.
 * @param {number} id L'ID de l'expérience à mettre à jour.
 * @param {IExperience} formData Les nouvelles données de l'expérience.
 * @returns {Promise<IExperience>} Une promesse qui résout avec l'objet expérience mis à jour.
 * @throws {Error} Lance une erreur si la mise à jour échoue.
 */
export const handleUpdateExperience = async (id: number, formData: IExperience): Promise<IExperience> => {
  try {
    const response = await api.put(`/user/profil/experience/${id}`, formData);

    if (response.status === 200) {
      // Recharger le profil utilisateur après la mise à jour
      await getUserProfile();
      toast.success("Expérience mise à jour avec succès !");
      // Assurez-vous que l'API renvoie l'objet expérience mis à jour dans `response.data`
      return response.data;
    }
    // Gérer les statuts non-200 qui ne sont pas des erreurs HTTP directes
    throw new Error(`Réponse inattendue du serveur lors de la mise à jour: ${response.status}`);
  } catch (error: any) {
    toast.error("❌ Erreur lors de la mise à jour de l'expérience.");
    console.error("❌ Erreur lors de la mise à jour de l'expérience :", error);
    throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour de l'expérience.");
  }
};
