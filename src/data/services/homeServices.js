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
        console.log("Exitoso:", data);

        const formattedData = data.map((item) => ({
          price: item.price || 0,
          title: item.title || "",
          image: item.image || "",
          color: item.color || "",
          percentOffer: item.percentOffer || "",
          rangeDay: item.rangeDay || "",
        }));

        return { success: true, data: formattedData };
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData);
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
        console.log("Exitoso:", data);

        const formattedData = data.map((item) => ({
          id: item.id || "",
          category: item.category || "",
          type: item.type || "",
        }));

        return { success: true, data: formattedData };
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData);
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
        console.log("Exitoso:", data);

        const formattedData = data.map((item) => ({
          id: item.id || "",
          title: item.title || "",
          type: item.type || "",
          description: item.description || "",
          rating: item.rating || "",
          price: item.price || "",
          color: item.color || "",
          image: item.image || "",
        }));

        return { success: true, data: formattedData };
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData);
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
};
