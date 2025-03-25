// import { toast } from "sonner";
import { toast } from "react-toastify";
import api from "./api";

export const getFavoris = async()=>{
    try {
        const favoris = await api.get("/user/favories");
          if(favoris.status === 200){
            const {data} =  favoris;
            return data?.favoris
          }
    } catch (error) {
        toast.error("Erreur lors de la récuperation des favoris");
        console.error("Erreur lors de la récuperation des favoris:",error);
        throw new Error("Erreur lors de la récuperation des favoris")
    }
}

export const isInFavorite = async (jobId:number) => {

  try {
    const res = await api.get(`/user/favories/check?jobId=${jobId}`);
    if(res.status === 200){
        return res.data.isFavorite;
    }
  } catch (error) {
    toast.error("Erreur lors de la verification du favoris");
    console.error("erreur lors de la verification du favoris",error);
  }
};

export const toggleFavorite = async (jobId:number) => {

  try {
      const res = await api.post(`/job/add_favorie/${jobId}`);
      if(res.status === 200 || res.status === 201){
        await getFavoris();

        return res.data.isFavorite;
      }
    } catch (error:any) {
      toast.error("Erreur lors de l'ajout du favoris")
      console.error("erreur lors de l'ajout du favoris",error);
      throw new Error(error || "erreur lors de l'ajout du favoris");
    }
  };
