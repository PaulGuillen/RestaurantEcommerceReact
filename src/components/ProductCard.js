import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { HomeServices } from "../data/services/homeServices";
import { FontAwesome } from "@expo/vector-icons";
import { FavouriteServices } from "../data/services/favouriteServices";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

const ProductCard = ({ filterText, category }) => {
  const [userUID, setUID] = useState([]);
  const [data, setData] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  SecureStore.getItemAsync("userUid")
    .then((uid) => {
      if (uid) {
        setUID(uid);
      } else {
        console.log("El UID no esta disponible en SecureStore");
      }
    })
    .catch((error) => {
      console.error("Error al obtener el UID desde SecureStore:", error);
    });

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

  useEffect(() => {
    if (!hasFetchedData) {
      fetchData();
      setHasFetchedData(true);
    }
  }, [hasFetchedData]);

  useFocusEffect(() => {
    setHasFetchedData(false);
  });

  const handleFavoritePress = async (product) => {
    const productIndex = data.findIndex((item) => item.id === product.id);
    const updatedData = [...data];

    try {
      const updatedProduct = {
        ...updatedData[productIndex],
        isFavorite: !updatedData[productIndex].isFavorite,
        userUID: userUID,
      };

      const response = await FavouriteServices.saveFavoriteProduct(
        updatedProduct
      );

      if (response.success) {
        updatedData[productIndex] = updatedProduct;
        setData(updatedData);

        if (updatedData[productIndex].isFavorite) {
          console.log("Producto agregado a favoritos:", product.title);
        } else {
          console.log("Producto deseleccionado de favoritos:", product.title);
        }
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Hubo un problema al realizar la solicitud");
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filteredData.map((productDetail) => (
        <View key={productDetail.id} style={styles.containerBody}>
          <View style={[styles.card, { backgroundColor: productDetail.color }]}>
            <Text style={styles.priceText}>
              Precio S/.{productDetail.price}
            </Text>

            <Text style={styles.titleText}>{productDetail.title}</Text>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: productDetail.image }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => handleFavoritePress(productDetail)}
            >
              <FontAwesome
                name="heart"
                size={24}
                color={productDetail.isFavorite ? "red" : "white"}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerBody: {
    marginHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    width: 240,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 20,
  },
  priceText: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
  },
  titleText: {
    top: 30,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 20,
    left: 20,
  },
});

export default ProductCard;
