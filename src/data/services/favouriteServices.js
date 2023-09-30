import { environment } from "../environments/environment";

export const FavouriteServices = {
  saveFavoriteProduct: async (productInfo) => {
    try {
      const response = await fetch(
        `${environment.apiPostFavorites}/favoriteProducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productInfo),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        return { success: false, error: "Error en la solicitud" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Error en la solicitud" };
    }
  },

  getFavoriteProducts: async (uid) => {
    try {
      const response = await fetch(
        `${environment.apiGetFavorites}/getFavoriteProducts?uid=${uid}`,
        {
          method: "GET",
        }
      );

      if (response.status === 200 || response.status === 304) {
        const data = await response.json();

        const formattedData = data.map((item) => ({
          id: item.id || "",
          title: item.title || "",
          type: item.type || "",
          description: item.description || "",
          rating: item.rating || "",
          price: item.price || "",
          color: item.color || "",
          image: item.image || "",
          isFavorite: item.isFavorite || false,
        }));

        return { success: true, data: formattedData };
      } else if (response.status === 404) {
        return { success: true, data: [] };
      } else {
        console.error(
          "Error en la solicitud. Código de estado:",
          response.status
        );
        return {
          success: false,
          error: `Error en la solicitud. Código de estado: ${response.status}`,
        };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Error en la solicitud" };
    }
  },
};
