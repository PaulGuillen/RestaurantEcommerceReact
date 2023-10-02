import { environment } from "../environments/environment";

const handleFetchResponse = async (response) => {
  if (response.status === 200 || response.status === 304) {
    const data = await response.json();
    const formattedData = data.map(formatProductData);
    return { success: true, data: formattedData };
  } else if (response.status === 404) {
    return { success: true, data: [] };
  } else {
    console.error("Error en la solicitud. Código de estado:", response.status);
    return {
      success: false,
      error: `Error en la solicitud. Código de estado: ${response.status}`,
    };
  }
};

const formatProductData = (item) => ({
  id: item.id || "",
  title: item.title || "",
  type: item.type || "",
  description: item.description || "",
  rating: item.rating || "",
  price: item.price || "",
  color: item.color || "",
  image: item.image || "",
  userUID: item.userUID || "",
  productID: item.productID || "",
  isFavorite: item.isFavorite || false,
});

export const FavoriteServices = {
  saveFavoriteProduct: async (productInfo) => {
    try {
      const formattedData = {
        userUID: productInfo.userUID,
        listFavorites: productInfo.listFavorites,
      };

      const response = await fetch(
        `${environment.apiPostFavorites}/favoriteProducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        return { success: false, error: "Error en la solicitud" };
      }
    } catch (error) {
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

      return handleFetchResponse(response);
    } catch (error) {
      return { success: false, error: "Error en la solicitud" };
    }
  },
};
