import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { OrderService } from "../../data/services/orderServices";
import { PerfilServices } from "../../data/services/perfilServices";
import { saveData } from "../../util/AsyncStorage";

const UserBag = () => {
  const navigation = useNavigation();
  const [userUID, setUID] = useState([]);
  const [data, setData] = useState([]);
  const [mainUser, setMainUser] = useState([]);
  const [showImageCentered, setShowImageCentered] = useState(false);
  const [quantityMap, setQuantityMap] = useState({});
  const [totalPriceMap, setTotalPriceMap] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const initializeData = () => {
      const initialQuantityMap = {};
      const initialTotalPriceMap = {};

      data.forEach((favoriteProduct) => {
        initialQuantityMap[favoriteProduct.productID] =
          favoriteProduct.quantity || 0;
        initialTotalPriceMap[favoriteProduct.productID] =
          favoriteProduct.totalProductPriceToPay || 0;
      });

      setQuantityMap(initialQuantityMap);
      setTotalPriceMap(initialTotalPriceMap);

      const newTotalPrice = Object.values(initialTotalPriceMap)
        .reduce((acc, price) => acc + parseFloat(price), 0)
        .toFixed(1);
      setTotalPrice(newTotalPrice);
    };

    initializeData();

    const handleBackPress = () => {
      backHomeNavigator();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [data]);

  useEffect(() => {
    const newTotalPrice = Object.values(totalPriceMap)
      .reduce((acc, price) => acc + parseFloat(price), 0)
      .toFixed(1);
    setTotalPrice(newTotalPrice);
  }, [totalPriceMap]);

  useFocusEffect(
    useCallback(() => {
      SecureStore.getItemAsync("userUid")
        .then((uid) => {
          if (uid) {
            fetchData(uid);
            setUID(uid);
          } else {
            console.log("El UID no está disponible en SecureStore");
          }
        })
        .catch((error) => {
          console.error("Error al obtener el UID desde SecureStore:", error);
        });
    }, [])
  );

  const increaseQuantity = (productID) => {
    if (quantityMap[productID] < 10) {
      const newQuantityMap = {
        ...quantityMap,
        [productID]: (quantityMap[productID] || 0) + 1,
      };
      setQuantityMap(newQuantityMap);

      updateTotalPrice(productID, newQuantityMap);
    }
  };

  const decreaseQuantity = (productID) => {
    if (quantityMap[productID] > 1) {
      const newQuantityMap = {
        ...quantityMap,
        [productID]: (quantityMap[productID] || 0) - 1,
      };
      setQuantityMap(newQuantityMap);

      updateTotalPrice(productID, newQuantityMap);
    }
  };

  const updateTotalPrice = (productID, newQuantityMap) => {
    const product = data.find((item) => item.productID === productID);
    if (product) {
      const productQuantity = newQuantityMap[productID] || 0;

      let productTotalPrice = 0;

      // Primer caso, cuando es un producto sin oferta
      if (!product.isCommonOffer && !product.isMainOffer) {
        const productPriceUnit = product.productPriceUnit || 0;
        productTotalPrice = productPriceUnit * productQuantity;
      } else {
        // Otros casos cuando es un producto con oferta
        const productPriceUnit =
          parseFloat(product.productPriceUnitDiscount) || 0;
        productTotalPrice = productPriceUnit * productQuantity;
      }

      setTotalPriceMap((prevTotalPriceMap) => ({
        ...prevTotalPriceMap,
        [productID]: productTotalPrice.toFixed(1),
      }));
    }
  };

  const fetchData = async (uniqueID) => {
    try {
      const response = await OrderService.getProductsInBag(uniqueID);
      if (response.success) {
        if (response.data.length === 0) {
          setShowImageCentered(true);
        } else {
          fetchDataMainuser(uniqueID);
          const initialQuantityMap = {};
          const initialTotalPriceMap = {};

          response.data.forEach((favoriteProduct) => {
            initialQuantityMap[favoriteProduct.productID] =
              favoriteProduct.quantity || 0;
            initialTotalPriceMap[favoriteProduct.productID] =
              favoriteProduct.totalProductPriceToPay || 0;
          });

          setQuantityMap(initialQuantityMap);
          setTotalPriceMap(initialTotalPriceMap);

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

  const fetchDataMainuser = async (uniqueID) => {
    try {
      const response = await PerfilServices.mainUser(uniqueID);
      if (response.success) {
        const dataMain = response.data;
        setMainUser(dataMain);
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    }
  };

  const deleteDataInBag = async (userUID, productID) => {
    try {
      const response = await OrderService.deleteProductInBag(
        userUID,
        productID
      );
      if (response.success) {
        fetchData(userUID);
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    }
  };

  const updateProductList = async (productsToUpdate) => {
    try {
      const response = await OrderService.updateProductsInBag(productsToUpdate);
      if (response.success) {
        console.log("Se actualizó la lista de productos");
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    }
  };

  const backHomeNavigator = () => {
    navigation.navigate("Home", { screen: "HomeScreen" });
  };

  const goToAddressValidation = async () => {
    const updatedSelectedProducts = data.map((product) => {
      const productID = product.productID;
      const newQuantity = quantityMap[productID] || 0;
      let productPriceUnit = 0;

      if (!product.isCommonOffer && !product.isMainOffer) {
        productPriceUnit = parseFloat(product.productPriceUnit) || 0;
      } else {
        productPriceUnit = parseFloat(product.productPriceUnitDiscount) || 0;
      }

      const newTotalProductPriceToPay = (
        newQuantity * productPriceUnit
      ).toFixed(1);

      return {
        ...product,
        quantity: newQuantity,
        totalProductPriceToPay: parseFloat(newTotalProductPriceToPay),
      };
    });
    const productsToUpdate = {
      userUID: userUID,
      totalPrice: parseFloat(totalPrice),
      listProducts: updatedSelectedProducts,
    };

    updateProductList(productsToUpdate);

    navigation.navigate("Order", {
      screen: "Address",
    });

    saveData("productUpdated", productsToUpdate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowHorizontalHeader}>
        <TouchableOpacity onPress={backHomeNavigator}>
          <Image
            source={require("../../../assets/images/back_view.png")}
            style={styles.imageButton}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.titleOrder}>Tu orden</Text>
        </TouchableOpacity>
      </View>
      {showImageCentered ? (
        <View style={styles.centeredContainer}>
          <Image
            source={require("../../../assets/images/eating_2.png")}
            style={styles.centeredImage}
          />
          <Text style={styles.centeresTitle}>
            Aun no tienes productos en bolsa
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.limitScrollView}>
          {data.map((favoriteProduct) => (
            <View key={favoriteProduct.productID} style={styles.limitHeight}>
              <View style={styles.card}>
                <View
                  style={[
                    styles.overlay,
                    { backgroundColor: favoriteProduct.color },
                  ]}
                >
                  <Image
                    source={{ uri: favoriteProduct.image }}
                    style={styles.image}
                  />
                </View>

                <View style={styles.spaceBetweenRow}>
                  <View style={styles.verticalRight}>
                    <Text style={styles.title}>
                      {favoriteProduct.title.length > 8
                        ? favoriteProduct.title.substring(0, 8) + "..."
                        : favoriteProduct.title}
                    </Text>
                    <View style={styles.rowSpaceBetween}>
                      <TouchableOpacity
                        style={[
                          styles.roundedButtonIcon,
                          { backgroundColor: favoriteProduct.color },
                        ]}
                        onPress={() =>
                          increaseQuantity(favoriteProduct.productID)
                        }
                      >
                        <Image
                          source={require("../../../assets/images/mas.png")}
                          style={styles.iconPlus}
                        />
                      </TouchableOpacity>
                      <Text style={styles.textBetweenButtons}>
                        {quantityMap[favoriteProduct.productID] || 0}
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.roundedButtonIcon,
                          { backgroundColor: favoriteProduct.color },
                        ]}
                        onPress={() =>
                          decreaseQuantity(favoriteProduct.productID)
                        }
                      >
                        <Image
                          source={require("../../../assets/images/menos.png")}
                          style={styles.iconMinus}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.verticalLeft}>
                    <Text style={styles.title}>
                      S/. {totalPriceMap[favoriteProduct.productID] || 0}
                    </Text>
                    <View style={styles.bottomLeft}>
                      <TouchableOpacity
                        onPress={() =>
                          deleteDataInBag(userUID, favoriteProduct.productID)
                        }
                        style={[
                          styles.roundedButtonIcon,
                          { backgroundColor: favoriteProduct.color },
                        ]}
                      >
                        <Image
                          source={require("../../../assets/images/eliminar.png")}
                          style={styles.iconDelete}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <View>
        {!showImageCentered ? (
          <View style={styles.footerContainer}>
            <View style={styles.viewColor} />
            <View style={styles.textBox}>
              <View style={styles.textHorizontal}>
                <View style={styles.bothText}>
                  <Text style={styles.leftText}>Cliente: </Text>
                </View>
                <Text style={styles.rightText}>
                  {mainUser.name} {mainUser.lastname}
                </Text>
              </View>

              <View style={styles.textHorizontal}>
                <View style={styles.bothText}>
                  <Text style={styles.leftText}>Total a pagar : </Text>
                </View>
                <Text style={styles.rightText}>S/. {totalPrice} Soles</Text>
              </View>
            </View>

            <View style={styles.bottomButton}>
              <TouchableOpacity
                onPress={goToAddressValidation}
                style={styles.roundedButtonBottom}
              >
                <Text style={styles.textColorBtn}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

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
  centeredContainer: {
    flex: 1,
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

  /*Card principal**/
  limitScrollView: {
    maxHeight: "65%",
  },
  limitHeight: {
    height: 150,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    marginHorizontal: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginHorizontal: 10,
    resizeMode: "contain",
  },
  verticalRight: {
    marginHorizontal: 10,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  verticalLeft: {
    marginHorizontal: 10,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rowSpaceBetween: {
    top: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomLeft: {
    top: 10,
  },
  spaceBetweenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  roundedButtonIcon: {
    borderWidth: 2,
    elevation: 4,
    borderRadius: 8,
    padding: 2,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
  },
  textBetweenButtons: {
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 8,
  },
  iconPlus: {
    width: 24,
    height: 24,
  },
  iconMinus: {
    width: 24,
    height: 24,
  },
  iconDelete: {
    width: 24,
    height: 24,
  },

  /*Footer cotainer**/
  footerContainer: {
    height: 220,
    backgroundColor: "#fff",
    margin: 10,
  },
  viewColor: {
    width: "100%",
    height: 2,
    marginTop: 4,
    backgroundColor: "#e0e0e0",
  },
  textBox: {
    margin: 2,
  },
  textHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bothText: {
    flexDirection: "row",
    justifyContent: "start",
  },
  bottomButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: 40,
  },
  leftText: {
    textAlign: "left",
    marginVertical: 4,
    top: 10,
    fontSize: 16,
    fontWeight: "400",
  },
  rightText: {
    textAlign: "right",
    fontSize: 16,
    top: 10,
    marginVertical: 4,
    fontWeight: "bold",
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

export default UserBag;
