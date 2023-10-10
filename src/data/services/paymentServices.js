import { environment } from "../environments/environment";

export const PaymentService = {
  paymentStripe: async (paymentData) => {
    try {
      const response = await fetch(`${environment.apiPostPayment}/paying`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          currency: paymentData.currency,
          payment_method_types: paymentData.payment_method_types,
          orderID: paymentData.orderID,
          fullName: paymentData.fullName,
          phone: paymentData.phone,
          email: paymentData.email,
          address: paymentData.address,
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
