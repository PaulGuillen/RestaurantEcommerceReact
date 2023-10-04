import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { OrderService } from "../../data/services/orderServices";

const UserBag = () => {
  const navigation = useNavigation();
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
      const response = await OrderService.getProductsInBag(uniqueID);
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

  const backHomeNavigator = () => {
    navigation.navigate("Home", { screen: "HomeScreen" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={backHomeNavigator}>
        <Image
          source={require("../../../assets/images/back_view.png")}
          style={styles.imageButton}
        />
      </TouchableOpacity>
      {showImageCentered ? (
        <View style={styles.centeredContainer}>
          <Image
            onPress={backHomeNavigator}
            source={require("../../../assets/images/eating_2.png")}
            style={styles.centeredImage}
          />
          <Text style={styles.centeresTitle}>
            Aun no tienes productos en bolsa
          </Text>
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
  imageButton: {
    start: 10,
    width: 32,
    height: 32,
  },
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

export default UserBag;
