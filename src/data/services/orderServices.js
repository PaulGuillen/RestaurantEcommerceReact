import { environment } from "../environments/environment";

const setDefault = (value, defaultValue) =>
  value !== undefined ? value : defaultValue;

const handleFetchResponse = async (response) => {
  if (response.status === 200 || response.status === 304) {
    const data = await response.json();
    const formattedProducts = data?.productsInBag?.map(formatProductData) || [];
    return { success: true, data: formattedProducts };
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

const formatProductData = (item) => {
  const formattedData = {
    id: setDefault(item.id, ""),
    title: setDefault(item.title, ""),
    type: setDefault(item.type, ""),
    description: setDefault(item.description, ""),
    rating: setDefault(item.rating, ""),
    price: setDefault(item.price, ""),
    color: setDefault(item.color, ""),
    image: setDefault(item.image, ""),
    productID: setDefault(item.productID, ""),
    quantity: setDefault(item.quantity, 0),
    productPriceUnitDiscount: setDefault(item.productPriceUnitDiscount, 0.0),
    isMainOffer: setDefault(item.isMainOffer, false),
    percentOffer: setDefault(item.percentOffer, ""),
    productInBag: setDefault(item.productInBag, false),
    totalProductPriceToPay: setDefault(item.totalProductPriceToPay, 0.0),
    isCommonOffer: setDefault(item.isCommonOffer, false),
    productPriceUnit: setDefault(item.productPriceUnit, 0.0),
  };

  return formattedData;
};

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

  getProductsInBag: async (uid) => {
    try {
      const response = await fetch(
        `${environment.apiGetProductsInBag}/allOrdersInBag?uid=${uid}`,
        {
          method: "GET",
        }
      );
      return handleFetchResponse(response);
    } catch (error) {
      return { success: false, error: "Error en la solicitud" };
    }
  },

  deleteProductInBag: async (userUID, productID) => {
    try {
      const response = await fetch(
        `${environment.apiDeleterProductInBag}/deleteProductInBag`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userUID, productID }),
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

  updateProductsInBag: async (productInfo) => {
    try {
      const formattedData = {
        userUID: productInfo.userUID,
        totalPrice: productInfo.totalPrice,
        listProducts: productInfo.listProducts,
      };

      const response = await fetch(
        `${environment.apiPutProductInBag}/updateProductInBag`,
        {
          method: "PUT",
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
