import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Rol = () => {
  const navigation = useNavigation();

  const handleSelectClient = () => {
    navigation.navigate("HomeNavigator", { screen: "HomeScreen" });
  };

  const handleSelectRestaurant = () => {
    navigation.navigate("RestaurantNavigator", { screen: "HomeRestaurant" });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelectClient}>
        <Image
          style={styles.imageSize}
          source={require("../../../assets/images/cliente.png")}
        />
      </TouchableOpacity>
      <Text style={styles.textStyle}>Cliente</Text>
      <TouchableOpacity onPress={handleSelectRestaurant}>
        <Image
          style={styles.imageSize}
          source={require("../../../assets/images/restaurante.png")}
        />
      </TouchableOpacity>
      <Text style={styles.textStyle}>Restaurante</Text>
    </View>
  );
};

export default Rol;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageSize: {
    width: 150,
    height: 150,
    margin: 20,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
