const API_BASE_URL = "http://192.168.100.128:3000";

export const environment = {
  apiUserLogin: API_BASE_URL + "/users",
  apiCreateUser: API_BASE_URL + "/users",
  apiGetMainPromotion: API_BASE_URL + "/home",
  apiGetCategoriesHome: API_BASE_URL + "/home",
  apiGetProducts: API_BASE_URL + "/home",
  apiPostFavorites: API_BASE_URL + "/favorite",
  apiGetFavorites: API_BASE_URL + "/favorite",
  apiGetMainUser: API_BASE_URL + "/perfil",
  apiGetAllPromotions: API_BASE_URL + "/promotion",
  apiPostProductInBag: API_BASE_URL + "/order",
  apiGetProductsInBag: API_BASE_URL + "/order",
  apiDeleterProductInBag: API_BASE_URL + "/order",
  apiPutProductInBag: API_BASE_URL + "/order",
  apiPostCreateAddress: API_BASE_URL + "/address",
  apiGetAllAdresses: API_BASE_URL + "/address",
  apiPostPayment: API_BASE_URL + "/payment",
  apiCreateOrder: API_BASE_URL + "/payed",
  apiCleanProductsInBag: API_BASE_URL + "/order",
  apiGetAllOrders: API_BASE_URL + "/order",
};
