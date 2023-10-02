import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const UserBag = () => {
  const navigation = useNavigation();

  const backHomeNavigator = () => {
    navigation.navigate("Home", { screen: "HomeScreen" });
  };

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={backHomeNavigator}>
        <Text>Volver</Text>
      </TouchableOpacity>
      <Text>productBag</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserBag;
