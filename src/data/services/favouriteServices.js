import { environment } from "../environments/environment";

export const FavouriteServices = {
  favouritesProducts: async (productInfo) => {
    try {
      const response = await fetch(
        `${environment.apiPostFavourites}/favouriteProducts`,
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
};
