import { environment } from "../environments/environment";

export const LoginServices = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${environment.apiUserLogin}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        return { success: true, data: data };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error:
            errorData.message || "Credenciales de inicio de sesión incorrectas",
        };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Error en la solicitud" };
    }
  },

  register: async (name, lastname, email, password) => {
    try {
      const response = await fetch(`${environment.apiCreateUser}/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          lastname: lastname,
          email: email,
          password: password,
        }),
      });

      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        console.log("Exitoso:", data.message);
        return { success: true, data: data };
      } else {
        const errorData = await response.json();
        console.log("Exitoso:", errorData.message);
        return {
          success: false,
          error: errorData.message || "No se pudo registrar el usuario",
        };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Error en la solicitud" };
    }
  },
};
