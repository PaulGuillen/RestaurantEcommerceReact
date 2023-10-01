import { environment } from "../environments/environment";

export const PromotionService = {
  getAllPromotions: async () => {
    try {
      const response = await fetch(
        `${environment.apiGetAllPromotions}/allPromotions`,
        {
          method: "GET",
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        const formattedData = data.map((item) => ({
          id: item.id || "",
          title: item.title || "",
          type: item.type || "",
          description: item.description || "",
          percentOffer: item.percentOffer || "",
          rangeDay: item.rangeDay || "",
          color: item.color || "",
          image: item.image || "",
          productID: item.productID || "",
          rating: item.rating || "",
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
};
