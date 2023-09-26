import { useState, useEffect } from "react";
import { View, Alert, StyleSheet, Text, Image } from "react-native";
import { HomeServices } from "../data/services/homeServices";
import { useFocusEffect } from "@react-navigation/native";

const CardViewPromotion = () => {
  const [data, setData] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const fetchData = async () => {
    try {
      const response = await HomeServices.mainPromotion();
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

  return (
    <View>
      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.cardPrincipal,
            item.color ? { backgroundColor: item.color } : null,
          ]}
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
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardPrincipal: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginVertical: 18,
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

export default CardViewPromotion;
