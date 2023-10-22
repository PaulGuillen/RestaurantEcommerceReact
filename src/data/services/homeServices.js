import { environment } from "../environments/environment";

export const HomeServices = {
  mainPromotion: async () => {
    try {
      const response = await fetch(
        `${environment.apiGetMainPromotion}/mainPromotion`,
        {
          method: "GET",
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        const formattedData = data.map((item) => ({
          price: item.price || 0,
          title: item.title || "",
          image: item.image || "",
          color: item.color || "",
          description: item.description || "",
          rating: item.rating || "",
          productID: item.productID || "",
          type: item.type || "",
          percentOffer: item.percentOffer || "",
          rangeDay: item.rangeDay || "",
          totalPriceDiscount: item.totalPriceDiscount || 0,
        }));

        return { success: true, data: formattedData };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error:
            errorData.message ||
            "Error al consultar la colección MainPromotion",
        };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Error en la solicitud" };
    }
  },

  getCategories: async () => {
    try {
      const response = await fetch(
        `${environment.apiGetCategoriesHome}/categories`,
        {
          method: "GET",
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        const formattedData = data.map((item) => ({
          categoryID : item.categoryID || "",
          category: item.category || "",
          type: item.type || "",
        }));

        return { success: true, data: formattedData };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error:
            errorData.message || "Error al consultar la colección Categories",
        };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Error en la solicitud" };
    }
  },

  getProducts: async () => {
    try {
      const response = await fetch(`${environment.apiGetProducts}/products`, {
        method: "GET",
      });
      if (response.status === 200) {
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
          productID: item.productID || "",
        }));

        return { success: true, data: formattedData };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error:
            errorData.message || "Error al consultar la colección Products",
        };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Error en la solicitud" };
    }
  },

  mainOffer: async (mainOffer) => {
    try {
      const response = await fetch(`${environment.apiCreateOrUpdateMainOffer}/createMainPromotion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: mainOffer.image,
          id: mainOffer.id,
          color: mainOffer.color,
          price: mainOffer.price,
          rating: mainOffer.rating,
          description: mainOffer.description,
          title: mainOffer.title,
          type: mainOffer.type,
          percentOffer: mainOffer.percentOffer,
          rangeDay: mainOffer.rangeDay,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        return { success: true, data: data };
      } else {
        const errorData = await response.json();
        console.log("errorData", errorData);
        return {
          success: false,
          error:
            errorData.message || "Error en la comunicación con el servidor",
        };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Error en la solicitud" };
    }
  },

};
