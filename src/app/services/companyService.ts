import { toast } from "react-toastify";
import api from "./api";

/**
 * @interface ICompany
 * @description Représente la structure des données d'une entreprise.
 */
interface ICompany {
  id: string;
  name: string;
  description: string;
  domaine: string;
  location: string;
  logo: string; // URL du logo
  employeeCount: string
}

/**
 * @interface IUpdateCompanyData
 * @description Représente la structure des données pour la mise à jour d'une entreprise.
 */
interface IUpdateCompanyData {
  name?: string;
  description?: string;
  domaine?: string;
  location?: string;
  logo?: File | string; // Peut être un fichier pour l'upload ou une URL existante
}

/**
 * @interface IJob
 * @description Représente la structure simplifiée d'une offre d'emploi.
 * (À compléter avec toutes les propriétés pertinentes de l'offre d'emploi)
 */
interface IJob {
  id: number;
  title: string;
  description: string;
  // ... autres propriétés d'une offre d'emploi
}

/**
 * @interface IApplicationSummary
 * @description Représente la structure simplifiée d'une candidature pour les entreprises.
 * (À compléter avec toutes les propriétés pertinentes d'une candidature vue par l'entreprise)
 */
interface IApplicationSummary {
  id: string;
  jobId: number;
  status: string;
  title:string;
  user: {
    fullName: string;
    email: string;
  };
  // ... autres propriétés pertinentes
}

/**
 * @function getCompanies
 * @description Récupère toutes les entreprises.
 * @returns {Promise<ICompany[] | null>} Une promesse qui résout en un tableau d'entreprises ou null en cas d'erreur.
 * @throws {Error} Lance une erreur si la récupération échoue.
 */
export const getCompanies = async ():Promise<ICompany[] | null> => {
    try {
        const response = await api.get("/company/all-companies");
        if (response.status === 200) {
          return response.data?.companies || [];
        }

       throw new Error(`Réponse inattendue du serveur: ${response.status}`);
    } catch (error: any) {
        toast.error("Erreur lors de la récupération des entreprises.");
        console.error("❌ Erreur lors de la récupération des entreprises :", error);
        // Propager une erreur plus spécifique si disponible
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération des entreprises.");
    }
};


/**
 * @function getCompanyDetail
 * @description Récupère les détails d'une entreprise spécifique par son ID.
 * @param {string} id L'ID de l'entreprise à récupérer.
 * @returns {Promise<ICompany | null>} Une promesse qui résout en l'objet entreprise ou null en cas d'erreur/non trouvé.
 * @throws {Error} Lance une erreur si l'ID est invalide ou si la récupération échoue.
 */
export const getCompanyDetail = async (id: string):Promise<ICompany | null> => {
    try {
        const companyId = parseInt(id);
        if (isNaN(companyId)) throw new Error("ID d'entreprise invalide.");

        const response = await api.get(`/company/company-detail/${companyId}`);
        if (response.status === 200) {
            return response.data?.company || null;
        }

        throw new Error(`Réponse inattendue du serveur: ${response.status}`);
    } catch (error: any) {
        toast.error("Erreur lors de la récupération des détails de l'entreprise.");
        console.error("❌ Erreur lors de la récupération des détails de l'entreprise :", error);
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération des détails de l'entreprise.");
    }
};


/**
 * @function updateCompany
 * @description Met à jour les informations d'une entreprise, y compris l'upload du logo si nécessaire.
 * @param {string} id L'ID de l'entreprise à mettre à jour.
 * @param {string} userId L'ID de l'utilisateur effectuant la mise à jour (nécessaire pour l'upload).
 * @param {IUpdateCompanyData} data Les données de l'entreprise à mettre à jour.
 * @returns {Promise<ICompany | null>} Une promesse qui résout en l'objet entreprise mis à jour ou null en cas d'erreur.
 * @throws {Error} Lance une erreur si l'ID est invalide ou si la mise à jour échoue.
 */
export const updateCompany = async (id: string,userId:string, data: IUpdateCompanyData
): Promise<ICompany | null>  => {

    try {
        const companyId = parseInt(id);
        if (isNaN(companyId)) throw new Error("ID d'entreprise invalide");

        const updatePayload = { ...data }; // Créer une copie pour modifier le logo si c'est un fichier

           // Gérer l'upload du logo si un fichier est fourni
        if (updatePayload.logo && updatePayload.logo instanceof File) {
        try {
            const uploadResponse = await handleUpload("company_logo", userId, updatePayload.logo);
            if (!uploadResponse || !uploadResponse.fileUrl) {
            toast.warning("L'upload du logo a échoué. Annulation de la mise à jour.");
            console.error("❌ L'upload du logo a échoué. Annulation de la mise à jour.");
            throw new Error("L'upload du logo a échoué."); // Stopper la suite
            }
            updatePayload.logo = uploadResponse.fileUrl; // Met à jour avec l'URL du fichier uploadé
            toast.success("Logo téléchargé avec succès !");
        } catch (uploadError) {
            console.error("❌ Erreur lors de l'upload du logo:", uploadError);
            toast.error("❌ Erreur lors de l'upload du logo.");
            throw new Error("Erreur lors de l'upload du logo.");
        }
        }

        const response = await api.put(`/company/update-company/${companyId}`, updatePayload);
        if (response.status === 200) {
            toast.success("Mise à jour de l'entreprise réussie !");
            return response.data?.company || null;
        }
        throw new Error(`Échec de la mise à jour de l'entreprise avec le code : ${response.status}`);
  } catch (error: any) {
    toast.error("Erreur lors de la mise à jour de l'entreprise.");
    console.error("❌ Erreur lors de la mise à jour de l'entreprise :", error);
    throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour de l'entreprise.");
  }
};


/**
 * @function handleUpload
 * @description Gère l'upload d'un fichier vers le serveur.
 * @param {string} type Le type de fichier à uploader (ex: "CV", "company_logo").
 * @param {string} userId L'ID de l'utilisateur associé à l'upload.
 * @param {File | null} file Le fichier à uploader.
 * @returns {Promise<{ fileUrl: string } | null>} Une promesse qui résout avec l'URL du fichier uploadé ou null en cas d'erreur.
 * @throws {Error} Lance une erreur si l'upload échoue.
 */
export const handleUpload = async (type: string, userId: string, file: File | null): Promise<{ fileUrl: string } | null> => {
    if (!file) {
        toast.info("Aucun fichier fourni pour l'upload.")
        console.warn("⚠️ Aucun fichier fourni pour l'upload.");
        return null; 
    };

    if (!(file instanceof File)) {
        toast.warning("Le fichier fourni n'est pas valide.");
        console.error("❌ Le fichier fourni n'est pas valide :", file);
        throw new Error("Le fichier fourni n'est pas valide.");
    }

try {
        const formData = new FormData();
        formData.append("file", file);
        
        const response = await api.post(`/upload/${type}/${userId}`, formData,
             {
            headers: { "Content-Type": "multipart/form-data" },
        });

       if (response.status === 200 || response.status === 201) {
      // Assurez-vous que l'API renvoie l'URL du fichier dans `response.data.fileUrl`
      if (response.data && response.data.fileUrl) {
        // return { fileUrl: response.data.fileUrl };
        return response.data;
      }
      throw new Error("L'API n'a pas renvoyé l'URL du fichier uploadé.");
    }
    throw new Error(`Échec de l'upload avec le code : ${response.status}`);
  } catch (error: any) {
    toast.error("Erreur lors de l'upload du fichier.");
    console.error("❌ Erreur lors de l'upload du fichier :", error);
    throw new Error(error.response?.data?.message || "Erreur lors de l'upload du fichier.");
  }
};


/**
 * @function getCompanyJobs
 * @description Récupère toutes les offres d'emploi publiées par l'entreprise actuelle.
 * @returns {Promise<IJob[] | null>} Une promesse qui résout en un tableau d'offres d'emploi ou null en cas d'erreur.
 * @throws {Error} Lance une erreur si la récupération échoue.
 */
export const getCompanyJobs = async ():Promise<IJob[] | null>  => {
    try {
        const response = await api.get("/company/company-job");

        if (response.status === 200) {
            return response.data?.jobs || [];
        }
        throw new Error(`Réponse inattendue du serveur: ${response.status}`);
  } catch (error: any) {
    toast.error("Erreur lors de la récupération des offres d'emploi.");
    console.error("❌ Erreur lors de la récupération des offres d'emploi :", error);
    throw new Error(error.response?.data?.message || "Erreur lors de la récupération des offres d'emploi.");
  }
};

/**
 * @function getCompanyApplyJobs
 * @description Récupère toutes les candidatures reçues par l'entreprise actuelle.
 * @returns {Promise<IApplicationSummary[] | null>} Une promesse qui résout en un tableau de candidatures ou null en cas d'erreur.
 * @throws {Error} Lance une erreur si la récupération échoue.
 */
export const getCompanyApplyJobs = async (): Promise<IApplicationSummary[] | null> => {
    try {
        const response = await api.get("/company/company-applyJob");
        if (response.status === 200) {
            return response.data?.applyJobs || [];
        }
       throw new Error(`Réponse inattendue du serveur: ${response.status}`);
  } catch (error: any) {
    toast.error("Erreur lors de la récupération des candidatures de l'entreprise.");
    console.error("❌ Erreur lors de la récupération des candidatures de l'entreprise :", error);
    throw new Error(error.response?.data?.message || "Erreur lors de la récupération des candidatures de l'entreprise.");
  }
};