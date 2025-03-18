import { toast } from "sonner";
import api from "./api";

export const getFavoris = async()=>{
    try {
        const favoris = await api.get("/user/favories");
          if(favoris.status === 200){
            const {data} =  favoris;
            return data?.favoris
          }
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const isInFavorite = async (jobId:number) => {
  // if (!session) return alert("Vous devez être connecté pour ajouter aux favoris");
  try {
    const res = await api.get(`/user/favories/check?jobId=${jobId}`);
    if(res.status === 200){
        return res.data.isFavorite;
    }
  } catch (error) {
    toast("Erreur", {
      description: "erreur lors de la verification du favoris",
    });
    console.error("erreur lors de la verification du favoris",error);
  }
};

export const toggleFavorite = async (jobId:number) => {
    // if (!session) return alert("Vous devez être connecté pour ajouter aux favoris");
    try {
      const res = await api.post(`/job/add_favorie/${jobId}`);
      if(res.status === 200 || res.status === 201){
        await getFavoris();
        // await isInFavorite(jobId)
        return res.data.isFavorite;
      }
    } catch (error) {
      toast("Erreur", {
        description: "erreur lors de l'ajout du favoris",
      })
      console.error("erreur lors de l'ajout du favoris",error);
    }
  };

  // export const isInFavorite = async (jobId:number) => {
  //   // if (!session) return alert("Vous devez être connecté pour ajouter aux favoris");
  //   try {
  //     const res = await api.get(`/user/favories/check?jobId=${jobId}`);
  //     if(res.status === 200){
  //         return res.data.isFavorite;
  //     }
  //   } catch (error) {
  //     toast("Erreur", {
  //       description: "erreur lors de la verification du favoris",
  //     });
  //     console.error("erreur lors de la verification du favoris",error);
  //   }
  // };