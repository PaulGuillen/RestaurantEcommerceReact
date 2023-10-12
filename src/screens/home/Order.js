import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { OrderService } from "../../data/services/orderServices";
import * as SecureStore from "expo-secure-store";

const Order = () => {
  const [data, setData] = useState([]);
  const [showImageCentered, setShowImageCentered] = useState(false);

  useFocusEffect(
    useCallback(() => {
      SecureStore.getItemAsync("userUid")
        .then((uid) => {
          if (uid) {
            fetchData(uid);
          } else {
            console.log("El UID no está disponible en SecureStore");
          }
        })
        .catch((error) => {
          console.error("Error al obtener el UID desde SecureStore:", error);
        });
    }, [])
  );

  const fetchData = async (uniqueID) => {
    try {
      const response = await OrderService.allOrders(uniqueID);
      if (response.success) {
        if (response.data.length === 0) {
          setShowImageCentered(true);
        } else {
          setShowImageCentered(false);
          setData(response.data);
        }
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {showImageCentered ? (
        <View style={styles.centeredContainer}>
          <Image
            source={require("../../../assets/images/carro-vacio.png")}
            style={styles.centeredImage}
          />
          <Text style={styles.centeresTitle}>
            Oops, parce que no tienes ordenes registadas.
          </Text>
        </View>
      ) : (
        <ScrollView>
          {data.map((orderData) => (
            <View key={orderData.orderID} style={styles.card}>
              <View>
                <Text style={styles.price}>{orderData.orderID}</Text>
              </View>

              <Text style={styles.price}>{orderData.totalPrice}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    top: 60,
    flex: 1,
    backgroundColor: "#fff",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeresTitle: {
    top: 20,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredImage: {
    width: 200,
    height: 200,
    alignContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
