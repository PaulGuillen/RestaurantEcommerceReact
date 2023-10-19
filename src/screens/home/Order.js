import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { OrderService } from "../../data/services/orderServices";
import * as SecureStore from "expo-secure-store";
import Spinner from "react-native-loading-spinner-overlay";

const Order = () => {
  const [data, setData] = useState([]);
  const [showImageCentered, setShowImageCentered] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await OrderService.allOrders(uniqueID);
      if (response.success) {
        if (response.data.length === 0) {
          setShowImageCentered(true);
          setData([]);
        } else {
          response.data.sort((a, b) => {
            const dateA = new Date(a.orderDate).getTime();
            const dateB = new Date(b.orderDate).getTime();
            return dateB - dateA;
          });
          setData(response.data);
          setShowImageCentered(false);
        }
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  const formatTimeSinceOrder = (orderDate) => {
    const fechaPedido = new Date(orderDate);
    const fechaActual = new Date();
    const diferenciaEnMilisegundos = fechaActual - fechaPedido;
    const minutosTranscurridos = Math.floor(
      diferenciaEnMilisegundos / (1000 * 60)
    );
    const horasTranscurridas = Math.floor(minutosTranscurridos / 60);
    const diasTranscurridos = Math.floor(horasTranscurridas / 24);

    let timeSinceOrder = "";
    if (diasTranscurridos > 0) {
      timeSinceOrder =
        diasTranscurridos === 1 ? "1 día" : `${diasTranscurridos} días`;
    } else if (horasTranscurridas > 0) {
      const minutosRestantes = minutosTranscurridos % 60;
      const horas =
        horasTranscurridas === 1 ? "1 hora" : `${horasTranscurridas} horas`;
      const minutos =
        minutosRestantes > 0 ? ` y ${minutosRestantes} minutos` : "";
      timeSinceOrder = horas + minutos;
    } else if (minutosTranscurridos > 0) {
      timeSinceOrder =
        minutosTranscurridos === 1
          ? "1 minuto"
          : `${minutosTranscurridos} minutos`;
    } else {
      const segundosTranscurridos = Math.floor(diferenciaEnMilisegundos / 1000);
      timeSinceOrder =
        segundosTranscurridos === 1
          ? "1 segundo"
          : `${segundosTranscurridos} segundos`;
    }

    return timeSinceOrder;
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
            Oops, parce que no tienes ordenes registrados.
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.orderID}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.titleOrderContainer}>
                <Text style={styles.title}>Orden # {item.orderID}</Text>
              </View>
              <View style={styles.containerDescription}>
                <View style={styles.containerDate}>
                  <Text style={styles.titleDate}>
                    {"Fecha de pedido: Hace "}
                    {formatTimeSinceOrder(item.orderDate)}
                  </Text>
                </View>
                <View style={styles.containerDistrict}>
                  <Text style={styles.titleDistrict}>
                    Entregar en : {item.addressSelected.district}
                  </Text>
                </View>
                <View style={styles.containerClient}>
                  <Text style={styles.titleClient}>
                    Cliente : {item.fullName}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
      <Spinner
        visible={loading}
        textContent={"Cargando..."}
        textStyle={{ color: "#FFF" }}
      />
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    top: 60,
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 60,
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

  /**Body */
  card: {
    margin: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 6,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  titleOrderContainer: {
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#e0e0e0",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  containerDescription: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  containerDate: {},
  containerDistrict: {
    paddingTop: 10,
  },
  containerClient: {
    paddingTop: 10,
    paddingBottom: 10,
  },

  titleDate: {
    fontSize: 16,
    fontWeight: "400",
  },
  titleDistrict: {
    fontSize: 16,
    fontWeight: "400",
  },
  titleClient: {
    fontSize: 16,
    fontWeight: "400",
  },
});
