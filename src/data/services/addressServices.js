import { environment } from "../environments/environment";

const handleFetchResponse = async (response) => {
  if (response.status === 200 || response.status === 304) {
    const data = await response.json();
    const formattedData = data.map(formatAddresData);
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

const formatAddresData = (item) => ({
  ref: item.ref || "",
  district: item.district || "",
  direction: item.direction || "",
  addressID: item.addressID || "",
});

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

  getAllAddreses: async (uid) => {
    try {
      const response = await fetch(
        `${environment.apiGetAllAdresses}/allAddresses?uid=${uid}`,
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
