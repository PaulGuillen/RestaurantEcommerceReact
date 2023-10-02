import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { HomeServices } from "../data/services/homeServices";
import { FontAwesome } from "@expo/vector-icons";
import { FavoriteServices } from "../data/services/favouriteServices";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const ProductCard = ({ filterText, category }) => {
  const [userUID, setUID] = useState([]);
  const [data, setData] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isFavoriteUpdated, setIsFavoriteUpdated] = useState(false);

  const filteredData = data.filter((productDetail) => {
    if (category) {
      return (
        productDetail.title.toLowerCase().includes(filterText.toLowerCase()) &&
        productDetail.type === category
      );
    } else {
      return productDetail.title
        .toLowerCase()
        .includes(filterText.toLowerCase());
    }
  });

  const fetchData = async () => {
    try {
      const response = await HomeServices.getProducts();
      if (response.success) {
        setData(response.data);
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    }
  };

  const fetchDataFavoriteProduct = async (uniqueUID) => {
    try {
      const response = await FavoriteServices.getFavoriteProducts(uniqueUID);
      if (response.success) {
        setFavoriteProducts(response.data);
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    }
  };

  const handleFavoritePress = async (product) => {
    try {
      const productIndex = favoriteProducts.findIndex(
        (favoriteProduct) => favoriteProduct.id === product.id
      );

      let updatedFavoriteProducts = [...favoriteProducts];

      if (productIndex !== -1) {
        updatedFavoriteProducts[productIndex].isFavorite = false;
        updatedFavoriteProducts[productIndex].userUID = userUID;
        console.log("Producto deseleccionado de favoritos:", product.title);
      } else {
        product.userUID = userUID;
        product.isFavorite = true;
        updatedFavoriteProducts.push(product);
        console.log("Producto agregado a favoritos:", product.title);
      }

      setIsFavoriteUpdated(!isFavoriteUpdated);
      setFavoriteProducts(updatedFavoriteProducts);

      const productsToSave = {
        userUID: userUID,
        listFavorites: updatedFavoriteProducts,
      };

      const response = await FavoriteServices.saveFavoriteProduct(
        productsToSave
      );

      if (!response.success) {
        Alert.alert("Error", response.error);
      }
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Hubo un problema al realizar la solicitud");
    }
  };

  const fetchDataAndUID = async () => {
    try {
      const uid = await SecureStore.getItemAsync("userUid");
      if (uid) {
        setUID(uid);
        fetchDataFavoriteProduct(uid);
      } else {
        console.log("El UID no está disponible en SecureStore");
      }
    } catch (error) {
      console.error("Error al obtener el UID desde SecureStore:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchDataAndUID();
      fetchData();
    }, [])
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filteredData.map((productDetail) => {
        const isFavorite = favoriteProducts.some(
          (favoriteProduct) => favoriteProduct.id === productDetail.id
        );

        return (
          <View
            key={`${productDetail.id}-${isFavorite}`}
            style={styles.containerBody}
          >
            <View style={[styles.card]}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: productDetail.image }}
                  style={styles.image}
                />
              </View>

              <View style={styles.overlay}>
                <Text style={styles.priceText}>
                  Precio S/.{productDetail.price}
                </Text>

                <Text style={styles.titleText}>{productDetail.title}</Text>
              </View>

              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={async () => {
                  await handleFavoritePress(productDetail);
                  fetchDataFavoriteProduct(userUID);
                }}
              >
                <FontAwesome
                  key={`${productDetail.id}-${isFavorite}`}
                  name="heart"
                  size={24}
                  color={isFavorite ? "red" : "white"}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    borderRadius: 10,
    width: 260,
    marginRight: 20,
    marginVertical: 6,
  },
  imageContainer: {
    flex: 1,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  priceText: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  titleText: {
    marginVertical: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  favoriteButton: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 20,
    left: 20,
  },
});

export default ProductCard;
