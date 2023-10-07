import { environment } from "../environments/environment";

export const AddressServices = {
  saveAddress: async (addressData) => {
    try {
      const formattedData = {
        userUID: addressData.userUID,
        listAddress: addressData.listAddress,
      };

      const response = await fetch(
        `${environment.apiPostCreateAddress}/createAddress`,
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
