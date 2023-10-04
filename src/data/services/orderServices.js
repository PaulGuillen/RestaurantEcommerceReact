import { environment } from "../environments/environment";

export const OrderService = {
  saveProductInBag: async (productInfo) => {
    try {
      const formattedData = {
        userUID: productInfo.userUID,
        listProducts: productInfo.listProducts,
      };

      const response = await fetch(
        `${environment.apiPostProductInBag}/orderInBag`,
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
};
