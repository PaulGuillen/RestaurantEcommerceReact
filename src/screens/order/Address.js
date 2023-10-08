import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { AddressServices } from "../../data/services/addressServices";
import { loadData } from "../../util/AsyncStorage";

const Address = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [showImageCentered, setShowImageCentered] = useState(false);
  const [selectedAddressID, setSelectedAddressID] = useState(null);

  useEffect(() => {
    const handleBackPress = () => {
      backUserBag();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      SecureStore.getItemAsync("userUid")
        .then((uid) => {
          if (uid) {
            fetchData(uid);
            getProductInBag();
          } else {
            console.log("El UID no está disponible en SecureStore");
          }
        })
        .catch((error) => {
          console.error("Error al obtener el UID desde SecureStore:", error);
        });
    }, [])
  );

  const handleCardPress = (addressID) => {
    setSelectedAddressID(addressID);
  };

  const backUserBag = () => {
    navigation.navigate("Order", { screen: "UserBag" });
  };

  const goTocreateAddress = () => {
    navigation.navigate("Order", { screen: "CreateAddress" });
  };

  const goToPayView = () => {
    if (selectedAddressID) {
      navigation.navigate("Order", { screen: "Payment" });
    } else {
      Alert.alert(
        "Selecciona una dirección",
        "Por favor selecciona una dirección antes de continuar."
      );
    }
  };

  const fetchData = async (uniqueID) => {
    try {
      const response = await AddressServices.getAllAddreses(uniqueID);
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

  const getProductInBag = async () => {
    const data = await loadData('productUpdated');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowHorizontalHeader}>
        <TouchableOpacity onPress={backUserBag}>
          <Image
            source={require("../../../assets/images/back_view.png")}
            style={styles.imageButton}
          />
        </TouchableOpacity>
        <Text style={styles.titleOrder}>Tus direcciones</Text>
      </View>

      <View style={styles.bodyContainer}>
        {showImageCentered ? (
          <View style={styles.centeredContainer}>
            <Image
              source={require("../../../assets/images/mapa.png")}
              style={styles.centeredImage}
            />
            <Text style={styles.centeresTitle}>
              Aun no tienes direcciones guardadas
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.limitScrollView}>
            {data.map((addressData) => (
              <TouchableOpacity
                key={addressData.addressID}
                style={styles.card}
                onPress={() => handleCardPress(addressData.addressID)}
              >
                <View style={styles.containerText}>
                  <Text style={styles.title}>{addressData.direction}</Text>
                </View>

                <View style={styles.containerIcon}>
                  {selectedAddressID === addressData.addressID && (
                    <Image
                      source={require("../../../assets/images/check.png")}
                      style={styles.checkIcon}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        <View style={styles.positionRight}>
          <TouchableOpacity
            onPress={goTocreateAddress}
            style={styles.roundedButtonIcon}
          >
            <Image
              source={require("../../../assets/images/add_address.png")}
              style={styles.iconPlus}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={goToPayView}
            style={styles.roundedButtonBottom}
          >
            <Text style={styles.textColorBtn}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    top: 60,
    flex: 1,
    backgroundColor: "#fff",
  },
  rowHorizontalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 8,
  },
  imageButton: {
    width: 24,
    height: 24,
  },
  titleOrder: {
    fontSize: 20,
    fontWeight: "bold",
  },

  /**Caso de que no tiene data */
  centeredContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  centeresTitle: {
    top: 20,
    fontWeight: "600",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredImage: {
    width: 200,
    height: 200,
  },

  /*Body principal**/
  bodyContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  limitScrollView: {
    maxHeight: "100%",
  },
  positionRight: {
    bottom: 0,
    end: 0,
    position: "absolute",
    alignItems: "flex-end",
  },
  roundedButtonIcon: {
    width: 46,
    height: 46,
    borderRadius: 10,
    borderWidth: 2,
    elevation: 4,
    margin: 16,
    backgroundColor: "white",
    borderColor: "black",
    padding: 2,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  iconPlus: {
    width: 32,
    height: 32,
  },
  containerText: {
    width: "86%",
    textAlign: "left",
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
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
    height: 100,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "justify",
  },
  containerIcon: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: {
    width: 32,
    height: 32,
  },

  /** Bottom Container */
  footer: {
    height: 140,
    marginHorizontal: 12,
  },
  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: 60,
  },
  roundedButtonBottom: {
    backgroundColor: "white",
    borderWidth: 2,
    elevation: 4,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderColor: "black",
    width: "80%",
  },
  textColorBtn: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
  },
});
