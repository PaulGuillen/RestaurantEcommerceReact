import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { HomeServices } from "../data/services/homeServices";
import { FontAwesome } from "@expo/vector-icons";

const ProductCard = () => {
  const [data, setData] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const fetchData = async () => {
    try {
      const response = await HomeServices.getProducts();
      if (response.success) {
        setData(response.data);
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      console.error("Error:", error);
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

  const handleFavoritePress = (product) => {
    // Aquí puedes implementar la lógica para agregar o quitar de favoritos
    console.log("Producto agregado a favoritos:", product.title);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {data.map((productDetail) => (
        <TouchableWithoutFeedback key={productDetail.id}>
          <View style={[styles.card, { backgroundColor: productDetail.color }]}>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{productDetail.title}</Text>
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: productDetail.image }}
                style={styles.image}
              />
            </View>

            <View style={styles.content}>
              <Text style={styles.priceText}>
                Precio S/.{productDetail.price}
              </Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <FontAwesome
                name="heart"
                size={24}
                color="red"
                onPress={() => handleFavoritePress(productDetail)}
              />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    flexDirection: "row",
    borderRadius: 12,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    position: "absolute",
    marginTop: 156,
    left: -20,
    transform: [{ rotate: "-90deg" }],
  },
  imageContainer: {
    top: 86,
    left: 60,
    width: 150,
    height: 150,
    borderRadius: 50,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "undefined",
    height: undefined,
    resizeMode: "cover",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  priceText: {
    right: 20,
    top: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  favoriteButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
});

export default ProductCard;
