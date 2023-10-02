import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { FavoriteServices } from "../../data/services/favoriteServices";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const Favorites = () => {
  const [data, setData] = useState([]);
  const [showImageCentered, setShowImageCentered] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
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
      const response = await FavoriteServices.getFavoriteProducts(uniqueID);
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
            source={require("../../../assets/images/eating_2.png")}
            style={styles.centeredImage}
          />
          <Text style={styles.centeresTitle}>Aun no tienes favoritos</Text>
        </View>
      ) : (
        <ScrollView>
          {data.map((favoriteProduct) => (
            <View key={favoriteProduct.productID} style={styles.card}>
              <Image
                source={{ uri: favoriteProduct.image }}
                style={styles.image}
              />
              <Text style={styles.title}>{favoriteProduct.title}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

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
    justifyContent: "center",
    alignItems: "center",
  },
  centeredImage: {
    width: 200,
    height: 200,
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
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Favorites;
