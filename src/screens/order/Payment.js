import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
} from "react-native";
import { PaymentService } from "../../data/services/paymentServices";
import { Card, TextInput } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { PerfilServices } from "../../data/services/perfilServices";
import { loadData } from "../../util/AsyncStorage";
import { OrderService } from "../../data/services/orderServices";
import Spinner from "react-native-loading-spinner-overlay";

function generateAddressRandomID(n) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomID = "";

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomID += characters.charAt(randomIndex);
  }

  return randomID;
}

const Payment = () => {
  const navigation = useNavigation();

  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiration, setExpiration] = useState("");

  const [loading, setLoading] = useState(false);
  const [userMainData, setUserMainData] = useState([]);
  const [dataOrder, setDataOrder] = useState("");
  const [addressOrder, setAddressOrder] = useState("");
  const [orderID, setOrderID] = useState("");
  const [totalToPay, setTotalToPay] = useState("");

  useEffect(() => {
    const handleBackPress = () => {
      backAddress();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const backAddress = () => {
    navigation.navigate("Order", { screen: "Address" });
  };

  useEffect(() => {
    SecureStore.getItemAsync("userUid")
      .then((uid) => {
        if (uid) {
          fetchData(uid);
          getDataInStorage();
        } else {
          console.log("El UID no está disponible en SecureStore");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el UID desde SecureStore:", error);
      });
  }, []);

  const fetchData = async (uniqueID) => {
    try {
      const response = await PerfilServices.mainUser(uniqueID);
      if (response.success) {
        setUserMainData(response.data);
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    }
  };

  const handleSubmit = async () => {
    const orderID = generateAddressRandomID(16);

    const currency = "PEN";
    const roundedAmount = Math.round(totalToPay);
    const finalAmount = (roundedAmount * 100).toFixed(0);
    const address = addressOrder.direction;

    const paymentData = {
      amount: finalAmount,
      currency: currency,
      email: userMainData.email,
      fullName: `${userMainData.name} ${userMainData.lastname}`,
      orderID: orderID,
      phone: userMainData.phone,
      address: address,
      payment_method_types: ["card"],
    };

    setLoading(true);
    try {
      const response = await paymentStripe(paymentData);
      if (response.success) {
        savingOrderGenerated(orderID);
      } else {
        Alert.alert("Error", response.error);
        setLoading(false);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error en la solicitud.");
      setLoading(false);
    }
  };

  const paymentStripe = async (paymentData) => {
    const response = await PaymentService.paymentStripe(paymentData);
    return response;
  };

  const savingOrderGenerated = async (orderIDGenerated) => {
    try {
      if (dataOrder && addressOrder) {
        const listProducts = dataOrder.listProducts;
        const totalPrice = dataOrder.totalPrice;
        const userUID = dataOrder.userUID;

        const orderData = {
          userUID: userUID,
          orders: [
            {
              listProducts: listProducts,
              addressSelected: addressOrder,
              totalPrice: totalPrice,
              orderID: orderIDGenerated,
              isPayed: true,
            },
          ],
        };

        const response = await OrderService.createOrder(orderData);

        if (!response.success) {
          setLoading(false);
          Alert.alert("Error", response.error);
        } else {
          cleanProductInBag(userUID);
        }
      } else {
        setLoading(false);
        console.log("Data not found in storage");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Hubo un problema al realizar la solicitud");
    }
  };

  const cleanProductInBag = async (userUID) => {
    try {
      const response = await OrderService.cleanProductInBag(userUID);
      if (response.success) {
        goToSuccessOrder();
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  const goToSuccessOrder = () => {
    navigation.navigate("SuccessOrder");
  };

  const getDataInStorage = async () => {
    const productUpdated = await loadData("productUpdated");
    const addressSelected = await loadData("AdddressSelected");

    setTotalToPay(productUpdated.totalPrice);
    setDataOrder(productUpdated);
    setAddressOrder(addressSelected);
  };

  const handleExpirationChange = (text) => {
    const cleanedText = text.replace(/\//g, "");

    if (cleanedText.length === 2) {
      setExpiration(cleanedText + "/");
    } else if (cleanedText.length > 2) {
      setExpiration(
        cleanedText.substring(0, 2) + "/" + cleanedText.substring(2)
      );
    } else {
      setExpiration(cleanedText);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowHorizontalHeader}>
        <TouchableOpacity onPress={backAddress}>
          <Image
            source={require("../../../assets/images/back_view.png")}
            style={styles.imageButton}
          />
        </TouchableOpacity>
      </View>

      <Card style={styles.card}>
        <TextInput
          label="Nombre"
          style={styles.textInputCard}
          keyboardType="name-phone-pad"
        />
        <TextInput
          label="Número de tarjeta"
          style={styles.textInputCard}
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text)}
          keyboardType="numeric"
        />
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <TextInput
              label="CVC"
              style={styles.textInputCVC}
              value={cvc}
              onChangeText={(text) => setCvc(text)}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              label="Expiracion"
              value={expiration}
              style={styles.textInputExpiration}
              onChangeText={handleExpirationChange}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
        </View>
      </Card>

      <TouchableOpacity style={styles.payButton} onPress={handleSubmit}>
        <Text style={styles.payButtonText}>Pagar</Text>
      </TouchableOpacity>
      <Spinner
        visible={loading}
        textContent={"Cargando..."}
        textStyle={{ color: "#FFF" }}
      />
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  rowHorizontalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 8,
  },
  imageButton: {
    width: 24,
    height: 24,
  },
  card: {
    marginTop: 20,
    padding: 16,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textInputCard: {
    borderRadius: 8,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },

  inputContainer: {
    flex: 1,
  },
  textInputCVC: {
    borderRadius: 8,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    marginEnd: 14,
  },
  textInputExpiration: {
    borderRadius: 8,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    marginStart: 14,
  },

  payButton: {
    marginTop: 16,
    backgroundColor: "#007aff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
  },
  payButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
