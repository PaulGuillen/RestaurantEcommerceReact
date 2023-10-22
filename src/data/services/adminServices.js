import { environment } from "../environments/environment";

export const AdminServices = {

    mainOffer: async (mainOffer) => {
        try {
            const response = await fetch(`${environment.apiCreateOrUpdateMainOffer}/createMainPromotion`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: mainOffer.image,
                    id: mainOffer.id,
                    color: mainOffer.color,
                    price: mainOffer.price,
                    rating: mainOffer.rating,
                    description: mainOffer.description,
                    title: mainOffer.title,
                    type: mainOffer.type,
                    percentOffer: mainOffer.percentOffer,
                    rangeDay: mainOffer.rangeDay,
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                return { success: true, data: data };
            } else {
                const errorData = await response.json();
                console.log("errorData", errorData);
                return {
                    success: false,
                    error:
                        errorData.message || "Error en la comunicación con el servidor",
                };
            }
        } catch (error) {
            console.error("Error:", error);
            return { success: false, error: "Error en la solicitud" };
        }
    },

    uploadImage: async (dataImage) => {
        try {
            const response = await fetch(`${environment.apiUploadImage}/uploadImage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageInBase64: dataImage.imageInBase64,
                    fileName: dataImage.fileName
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                return { success: true, data: data };
            } else {
                const errorData = await response.json();
                console.log("errorData", errorData);
                return {
                    success: false,
                    error:
                        errorData.message || "Error en la comunicación con el servidor",
                };
            }
        } catch (error) {
            console.error("Error:", error);
            return { success: false, error: "Error en la solicitud" };
        }
    },

    commonOffer: async (commonOffer) => {
        try {
            const response = await fetch(`${environment.apiCreateCommonOffer}/createPromotions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: commonOffer.image,
                    color: commonOffer.color,
                    price: commonOffer.price,
                    description: commonOffer.description,
                    title: commonOffer.title,
                    type: commonOffer.type,
                    percentOffer: commonOffer.percentOffer,
                    rangeDay: commonOffer.rangeDay,
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                return { success: true, data: data };
            } else {
                const errorData = await response.json();
                console.log("errorData", errorData);
                return {
                    success: false,
                    error:
                        errorData.message || "Error en la comunicación con el servidor",
                };
            }
        } catch (error) {
            console.error("Error:", error);
            return { success: false, error: "Error en la solicitud" };
        }
    },


};
