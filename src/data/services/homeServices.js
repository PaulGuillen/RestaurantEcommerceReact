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
};
