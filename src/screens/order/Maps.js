import { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Maps = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        backNewAddress();
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        backNewAddress();
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const backNewAddress = () => {
    navigation.navigate("Order", { screen: "CreateAddress" });
  };

  return <View style={styles.container}></View>;
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  text: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    zIndex: 1,
  },
});
