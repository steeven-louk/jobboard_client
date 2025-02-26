import api from "./api";

export const getUserProfile = async () => {
    try {
      const user = await api.get("/user/profil/");
      if(user.status === 200){
        const {data} =  user
        // setUserDetail(data?.user);
        //   console.log(data.user);
        return data?.user;
      }
    } catch (error) {
        console.log(error)
      throw error.response?.data || "Erreur de récupération du profil";
    }
  };

  export const updateUserProfile = async (formData) => {
    try {
      const response = await api.put("/user/profil/update", formData);
      await getUserProfile();
      return response.data;
    } catch (error) {
        console.log(error)
      throw error.response?.data || "Erreur de la modification du profil";
    }
  };



