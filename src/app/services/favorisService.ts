import { toast } from "react-toastify";
import api from "./api";

/**
 * @interface IFavoriteJob
 * @description Représente la structure simplifiée d'une offre d'emploi favorite.
 * Adaptez cette interface pour qu'elle corresponde aux données réelles
 * renvoyées par votre API pour un élément favori.
 * Par exemple, cela pourrait être juste un ID, ou un objet complet de l'emploi.
 */
interface IFavoriteJob {
  id: number; // L'ID de l'offre d'emploi
  title: string; // Le titre de l'offre d'emploi
}


/**
 * @function getFavoris
 * @description Récupère la liste des offres d'emploi favorites de l'utilisateur.
 * @returns {Promise<IFavoriteJob[] | null>} Une promesse qui résout en un tableau d'offres d'emploi favorites ou null en cas d'erreur.
 * @throws {Error} Lance une erreur si la récupération échoue.
 */
export const getFavoris = async (): Promise<IFavoriteJob[] | null> => {
  try {
    const response = await api.get("/user/favories");
    if (response.status === 200) {
      // Assurez-vous que la structure de la réponse de l'API correspond à `data.favoris`
      // et que `favoris` est un tableau d'objets `IFavoriteJob`.
      return response.data?.favoris || [];
    }
    // Gérer les statuts non-200 qui ne sont pas des erreurs HTTP directes
    throw new Error(`Réponse inattendue du serveur lors de la récupération des favoris: ${response.status}`);
  } catch (error: any) {
    toast.error("Erreur lors de la récupération des favoris.");
    console.error("❌ Erreur lors de la récupération des favoris :", error);
    // Propager une erreur plus spécifique si disponible
    throw new Error(error.response?.data?.message || "Erreur lors de la récupération des favoris.");
  }
};


/**
 * @function isInFavorite
 * @description Vérifie si une offre d'emploi spécifique est dans les favoris de l'utilisateur.
 * @param {number} jobId L'ID de l'offre d'emploi à vérifier.
 * @returns {Promise<boolean | null>} Une promesse qui résout en `true` si l'emploi est favori, `false` sinon, ou `null` en cas d'erreur.
 * @throws {Error} Lance une erreur si la vérification échoue.
 */
export const isInFavorite = async (jobId: number): Promise<boolean | null> => {
  try {
    const response = await api.get(`/user/favories/check?jobId=${jobId}`);
    if (response.status === 200) {

      return response.data.isFavorite;
    }
    // Gérer les statuts non-200 qui ne sont pas des erreurs HTTP directes
    throw new Error(`Réponse inattendue du serveur lors de la vérification du favori: ${response.status}`);
  } catch (error: any) {
    toast.error("Erreur lors de la vérification du favori.");
    console.error("❌ Erreur lors de la vérification du favori :", error);
    throw new Error(error.response?.data?.message || "Erreur lors de la vérification du favori.");
  }
};


/**
 * @function toggleFavorite
 * @description Ajoute ou supprime une offre d'emploi des favoris de l'utilisateur.
 * @param {number} jobId L'ID de l'offre d'emploi à ajouter/supprimer des favoris.
 * @returns {Promise<boolean>} Une promesse qui résout en `true` si l'emploi est maintenant favori, `false` sinon.
 * @throws {Error} Lance une erreur si l'opération échoue.
 */
export const toggleFavorite = async (jobId: number): Promise<boolean> => {
  try {

    const response = await api.post(`/job/add_favorie/${jobId}`);

    if (response.status === 200 || response.status === 201) {

      await getFavoris();
      return response.data.isFavorite;
    }
    // Gérer les statuts non-200/201 qui ne sont pas des erreurs HTTP directes
    throw new Error(`Réponse inattendue du serveur lors de l'opération de favori: ${response.status}`);
  } catch (error: any) {
    toast.error("Erreur lors de l'opération de favori.");
    console.error("❌ Erreur lors de l'opération de favori :", error);
    throw new Error(error.response?.data?.message || "Erreur lors de l'opération de favori.");
  }
};
