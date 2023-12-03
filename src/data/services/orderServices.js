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

const handleFetchOrderData = async (response) => {
  if (response.status === 200 || response.status === 304) {
    const data = await response.json();
    const formatOrderData = data.map(formatOrderDataRes);
    return { success: true, data: formatOrderData };
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

const formatOrderDataRes = (order) => {
  const formatOrderData = {
    totalPrice: setDefault(order.totalPrice, 0),
    orderID: setDefault(order.orderID, ""),
    isPayed: setDefault(order.isPayed, false),
    fullName: setDefault(order.fullName, ""),
    orderDate: setDefault(order.orderDate, ""),
    listProducts: order.listProducts.map((product) => ({
      image: setDefault(product.image, ""),
      quantity: setDefault(product.quantity, 0),
      color: setDefault(product.color, ""),
      productID: setDefault(product.productID, ""),
      productPriceUnitDiscount: setDefault(
        product.productPriceUnitDiscount,
        0.0
      ),
      isMainOffer: setDefault(product.isMainOffer, false),
      rating: setDefault(product.rating, ""),
      percentOffer: setDefault(product.percentOffer, ""),
      productInBag: setDefault(product.productInBag, false),
      title: setDefault(product.title, ""),
      type: setDefault(product.type, ""),
      totalProductPriceToPay: setDefault(product.totalProductPriceToPay, 0.0),
      isCommonOffer: setDefault(product.isCommonOffer, false),
      productPriceUnit: setDefault(product.productPriceUnit, 0.0),
      id: setDefault(product.id, ""),
    })),

    addressSelected: {
      ref: setDefault(order.addressSelected.ref, ""),
      district: setDefault(order.addressSelected.district, ""),
      latitude: setDefault(order.addressSelected.latitude, 0.0),
      direction: setDefault(order.addressSelected.direction, ""),
      addressID: setDefault(order.addressSelected.addressID, ""),
      longitude: setDefault(order.addressSelected.longitude, 0.0),
    },
  };
  return formatOrderData;
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

  createOrder: async (orderInfo) => {
    try {
      const response = await fetch(
        `${environment.apiCreateOrder}/productPayed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderInfo),
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

  allOrders: async (uid) => {
    try {
      const response = await fetch(
        `${environment.apiGetAllOrders}/allOrders?uid=${uid}`,
        {
          method: "GET",
        }
      );

      return handleFetchOrderData(response);
    } catch (error) {
      return { success: false, error: "Error en la solicitud" };
    }
  },

  cleanProductInBag: async (userUID) => {
    try {
      const response = await fetch(
        `${environment.apiCleanProductsInBag}/cleanProducts`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userUID }),
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

  getAllOrdersPayued: async () => {
    try {
      const response = await fetch(
        `${environment.apiOrdersRoute}/allOrdersPayed`,
        {
          method: "GET",
        }
      );

      if (response.status === 200) {
        console.log(response)
        const data = await response.json();
        const formattedData = data.map(order => {
          const orderDetails = Object.values(order)[0];
          const listProducts = orderDetails.listProducts.map(product => ({
            image: product.image,
            quantity: product.quantity,
            color: product.color,
            productID: product.productID,
            productPriceUnitDiscount: product.productPriceUnitDiscount,
            isMainOffer: product.isMainOffer,
            rating: product.rating,
            description: product.description,
            percentOffer: product.percentOffer,
            productInBag: product.productInBag,
            title: product.title,
            type: product.type,
            totalProductPriceToPay: product.totalProductPriceToPay,
            isCommonOffer: product.isCommonOffer,
            price: product.price,
            productPriceUnit: product.productPriceUnit,
            id: product.id,
          }));

          const addressSelected = {
            ref: orderDetails.addressSelected.ref,
            district: orderDetails.addressSelected.district,
            latitude: orderDetails.addressSelected.latitude,
            direction: orderDetails.addressSelected.direction,
            addressID: orderDetails.addressSelected.addressID,
            longitude: orderDetails.addressSelected.longitude,
          };

          return {
            orderID: orderDetails.orderID,
            phoneNumber: orderDetails.phoneNumber,
            totalPrice: orderDetails.totalPrice,
            listProducts: listProducts,
            addressSelected: addressSelected,
            fullName: orderDetails.fullName,
            isPayed: orderDetails.isPayed,
            orderDate: orderDetails.orderDate,
          };
        });

        return { success: true, data: formattedData };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error:
            errorData.message || "Error al consultar la colección Orders",
        };
      }
    } catch (error) {
      return { success: false, error: "Error en la solicitud" };
    }
  }

};
