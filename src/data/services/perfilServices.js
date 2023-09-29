import { environment } from "../environments/environment";

export const PerfilServices = {
  mainUser: async (uid) => {
    try {
      const response = await fetch(
        `${environment.apiGetMainUser}/mainUser?uid=${uid}`,
        {
          method: "GET",
        }
      );

      if (response.status === 200 || response.status === 304) {
        const data = await response.json();
        return { success: true, data };
      } else {
        console.error(
          "Error en la solicitud. Código de estado:",
          response.status
        );
        return {
          success: false,
          error: `Error en la solicitud. Código de estado: ${response.status}`,
        };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Error en la solicitud" };
    }
  },
};
