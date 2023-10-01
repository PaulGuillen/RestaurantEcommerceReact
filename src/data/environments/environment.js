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
};
