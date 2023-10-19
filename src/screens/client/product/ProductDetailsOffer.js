import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { OrderService } from "../../../data/services/orderServices";
import { Alert } from "react-native/Libraries/Alert/Alert";

const ProductDetailOffer = ({ route }) => {
  const { productDetail } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(productDetail.price);

  const descriptionParagraphs = productDetail.description.split("\n");
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();

  const visibleDescription = showMore
    ? descriptionParagraphs.join("\n")
    : descriptionParagraphs[0];

  const handleSaveInBagProduct = async (productSelected) => {
    try {
      const uid = await SecureStore.getItemAsync("userUid");
      if (uid) {
        handleRequestOrderInBag(uid, productSelected);
      } else {
        console.log("El UID no está disponible en SecureStore");
      }
    } catch (error) {
      console.error("Error al obtener el UID desde SecureStore:", error);
    }
  };

  const handleRequestOrderInBag = async (uid, productSelected) => {
    try {
      if (!uid || !productSelected || !quantity || !totalPrice) {
        throw new Error("Parámetros no válidos");
      }

      const productDescription = {
        id: productSelected.id,
        title: productSelected.title,
        image: productSelected.image,
        color: productSelected.color,
        productID: productSelected.productID,
        productInBag: true,
        isCommonOffer: true,
        isMainOffer: false,
        rating: productSelected.rating,
        type: productSelected.type,
        description: productSelected.description,
        quantity: quantity,
        percentOffer: productSelected.percentOffer,
        productPriceUnit: parseFloat(productSelected.price),
        productPriceUnitDiscount: parseFloat(
          productSelected.totalPriceDiscount
        ),
        totalProductPriceToPay: totalPrice,
      };

      const productToSaveInBag = {
        userUID: uid,
        listProducts: [productDescription],
      };
      const response = await OrderService.saveProductInBag(productToSaveInBag);

      if (!response.success) {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Hubo un problema al realizar la solicitud");
    }
  };

  const backHomeNavigator = () => {
    navigation.navigate("Home", { screen: "Promociones" });
  };

  const updateTotalPrice = () => {
    const newTotalPrice = (productDetail.totalPriceDiscount * quantity).toFixed(
      1
    );
    setTotalPrice(parseFloat(newTotalPrice));
  };

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
      updateTotalPrice();
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      updateTotalPrice();
    }
  };

  useEffect(() => {
    updateTotalPrice();
    const handleBackPress = () => {
      backHomeNavigator();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [quantity]);

  return (
    <View style={{ backgroundColor: productDetail.color, flex: 1 }}>
      <ScrollView>
        <SafeAreaView style={styles.safeAreaView}>
          <TouchableOpacity style={styles.button} onPress={backHomeNavigator}>
            <Image
              source={require("../../../../assets/images/back_view.png")}
              style={styles.imageButton}
            />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.viewBackgroundBack}>
          <View style={styles.imageViewSize}>
            <Image
              source={{ uri: productDetail.image }}
              style={styles.imageStyle}
            />
          </View>
          <Text style={styles.titleStyle}>{productDetail.title}</Text>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <Text style={styles.descriptionStyle}>{visibleDescription}</Text>
              {descriptionParagraphs.length > 1 && (
                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                  <Text style={styles.textShowMore}>
                    {showMore ? "Mostrar menos" : "Mostrar más"}
                  </Text>
                </TouchableOpacity>
              )}
              <View style={styles.rowSpaceBetween}>
                <View style={styles.rowHorizontal}>
                  <TouchableOpacity
                    style={[
                      styles.roundedButtonIcon,
                      { backgroundColor: productDetail.color },
                    ]}
                    onPress={increaseQuantity}
                  >
                    <Image
                      source={require("../../../../assets/images/mas.png")}
                      style={styles.iconPlus}
                    />
                  </TouchableOpacity>
                  <Text style={styles.textIcon}>{quantity}</Text>
                  <TouchableOpacity
                    style={[
                      styles.roundedButtonIcon,
                      { backgroundColor: productDetail.color },
                    ]}
                    onPress={decreaseQuantity}
                  >
                    <Image
                      source={require("../../../../assets/images/menos.png")}
                      style={styles.iconMinus}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.rowHorizontal}>
                  <View style={styles.alignItemsCenter}>
                    <Text style={styles.textPriceBefore}>
                      Antes: {parseFloat(productDetail.price).toFixed(1)}
                    </Text>

                    <Text style={styles.textPrice}>
                      Ahora : S/.{productDetail.totalPriceDiscount.toFixed(1)}
                    </Text>

                    <Text style={styles.textTotal}>
                      Total a pagar : S/.{totalPrice}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.centered}>
                <TouchableOpacity
                  onPress={() => handleSaveInBagProduct(productDetail)}
                  style={[
                    styles.roundedButton,
                    { backgroundColor: productDetail.color },
                  ]}
                >
                  <Text style={styles.textColorBtn}>AGREGAR PRODUCTO</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 60,
  },
  imageButton: {
    width: 32,
    height: 32,
  },
  pressableView: {
    flex: 1,
  },
  viewBackgroundBack: {
    backgroundColor: "#fff",
    flex: 1,
    marginTop: 120,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  imageViewSize: {
    height: 300,
    width: 300,
    position: "absolute",
    top: -150,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  titleStyle: {
    marginTop: 160,
    fontSize: 28,
    fontWeight: "bold",
  },
  descriptionStyle: {
    padding : 10,
    textAlign: 'justify', 
    fontSize: 20,
    marginVertical: 16,
    width: "100%",
  },
  textTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  textShowMore: {
    textDecorationLine: "underline",
    padding: 10,
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18,
  },
  rowSpaceBetween: {
    marginTop: 30,
    marginStart: 10,
    marginRight: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowHorizontal: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
  iconPlus: {
    width: 32,
    height: 32,
  },
  iconMinus: {
    width: 32,
    height: 32,
  },
  textIcon: {
    fontSize: 24,
    fontWeight: "600",
    marginHorizontal: 20,
  },
  textPriceBefore: {
    fontSize: 14,
    fontWeight: "400",
    textDecorationLine: "line-through",
  },
  textPrice: {
    fontSize: 18,
    fontWeight: "600",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  roundedButton: {
    backgroundColor: "white",
    borderColor: "white",
    paddingVertical: 15,
    borderWidth: 1,
    elevation: 4,
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
    width: "90%",
  },
  alignItemsCenter: {
    alignItems: "start",
  },
  textTotal: {
    top: 4,
    fontSize: 14,
    fontWeight: "400",
  },
  roundedButtonIcon: {
    borderWidth: 2,
    elevation: 4,
    borderRadius: 8,
    padding: 2,
    alignItems: "center",
    borderColor: "transparent",
  },
  textColorBtn: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
  },
});

export default ProductDetailOffer;
