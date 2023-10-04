import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { PromotionService } from "../../data/services/promotionServices";

const Promotions = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  console.log(data);
  const fetchData = async () => {
    try {
      const response = await PromotionService.getAllPromotions();
      if (response.success) {
        setData(response.data);
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const navigateToProductDetail = (productDetail) => {
    navigation.navigate("ProductDetailOffer", { productDetail });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          {data.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.cardPrincipal,
                item.color ? { backgroundColor: item.color } : null,
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => navigateToProductDetail(item)}
            >
              <View style={styles.cardLeftText}>
                <Text style={styles.percetOfferText}>
                  {item.percentOffer}% DESCUENTO
                </Text>
                <Text style={styles.rangeDayText}>{item.rangeDay}</Text>
              </View>

              <View style={styles.cardImageContainer}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 40,
    paddingBottom: 40,
  },
  cardPrincipal: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginVertical: 16,
    marginHorizontal: 10,
    height: 140,
    backgroundColor: "white",
    borderColor: "transparent",
  },
  cardLeftText: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  percetOfferText: {
    fontWeight: "800",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
  },
  rangeDayText: {
    fontWeight: "400",
    marginVertical: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 16,
  },
  titleText: {
    width: "100%",
    fontSize: 20,
    textAlign: "center",
  },
  cardImageContainer: {
    flex: 0.4,
    overflow: "hidden",
    marginHorizontal: 6,
    borderRadius: 14,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default Promotions;
